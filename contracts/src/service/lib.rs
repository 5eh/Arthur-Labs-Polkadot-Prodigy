#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod service {
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct Service {
        title: String,
        description: String,
        photo: String,
        price: u128,
        quantity: u128,
        location: String,
        service_type: String,
        delivery_addresses: Mapping<AccountId, String>,
        my_block_data: Vec<u8>,
        terms_and_conditions: String,
        requirements: String,
        completion_date: String,
        seller_agreement: bool,
        buyer_agreement: Mapping<AccountId, bool>,
    }

    impl Service {
        #[ink(constructor)]
        pub fn new(
            title: String,
            description: String,
            photo: String,
            price: u128,
            quantity: u128,
            location: String,
            service_type: String,
            terms_and_conditions: String,
            requirements: String,
            completion_date: String,
        ) -> Self {
            Self {
                title,
                description,
                photo,
                price,
                quantity,
                location,
                service_type,
                delivery_addresses: Mapping::default(),
                my_block_data: Vec::new(),
                terms_and_conditions,
                requirements,
                completion_date,
                seller_agreement: false,
                buyer_agreement: Mapping::default(),
            }
        }

        #[ink(message)]
        pub fn greet(&self) -> String {
            self.title.clone()
        }

        #[ink(message)]
        pub fn get_title(&self) -> String {
            self.title.clone()
        }

        #[ink(message)]
        pub fn get_description(&self) -> String {
            self.description.clone()
        }

        #[ink(message)]
        pub fn get_photo(&self) -> String {
            self.photo.clone()
        }

        #[ink(message)]
        pub fn get_price(&self) -> u128 {
            self.price
        }

        #[ink(message)]
        pub fn get_quantity(&self) -> u128 {
            self.quantity
        }

        #[ink(message)]
        pub fn get_location(&self) -> String {
            self.location.clone()
        }

        #[ink(message)]
        pub fn get_service_type(&self) -> String {
            self.service_type.clone()
        }

        #[ink(message)]
        pub fn get_terms_and_conditions(&self) -> String {
            self.terms_and_conditions.clone()
        }

        #[ink(message)]
        pub fn get_requirements(&self) -> String {
            self.requirements.clone()
        }

        #[ink(message)]
        pub fn get_completion_date(&self) -> String {
            self.completion_date.clone()
        }

        #[ink(message)]
        pub fn get_delivery_address(&self, account: AccountId) -> Option<String> {
            self.delivery_addresses.get(&account)
        }

        #[ink(message, payable)]
        pub fn purchase(&mut self, quantity: u128, delivery_address: String) -> Result<(), String> {
            let caller = self.env().caller();
            let payment = self.env().transferred_value();

            let total_price = self
                .price
                .checked_mul(quantity)
                .ok_or("Overflow in total price calculation")?;
            if payment < total_price {
                return Err(String::from("Insufficient payment"));
            }
            if self.quantity < quantity {
                return Err(String::from("Insufficient stock"));
            }

            self.quantity = self
                .quantity
                .checked_sub(quantity)
                .ok_or("Underflow in quantity calculation")?;
            self.delivery_addresses.insert(caller, &delivery_address);
            self.buyer_agreement.insert(caller, &false);

            Ok(())
        }

        #[ink(message)]
        pub fn set_title(&mut self, new_value: String) {
            self.title = new_value;
        }

        #[ink(message)]
        pub fn agree_to_terms(&mut self) -> Result<(), String> {
            let caller = self.env().caller();
            self.buyer_agreement.insert(caller, &true);
            Ok(())
        }

        #[ink(message)]
        pub fn seller_agree_to_terms(&mut self) -> Result<(), String> {
            self.seller_agreement = true;
            Ok(())
        }

        #[ink(message)]
        pub fn are_terms_agreed(&self, account: AccountId) -> bool {
            self.seller_agreement && self.buyer_agreement.get(&account).unwrap_or(false)
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn new_works() {
            let service = Service::new(
                String::from("Task Service"),
                String::from("Description of the task service"),
                String::from("https://example.com/photo.jpg"),
                100000,
                10,
                String::from("New York, USA"),
                String::from("Service Type"),
                String::from("Terms and conditions text"),
                String::from("Requirements text"),
                String::from("2024-12-31"),
            );
            assert_eq!(service.greet(), String::from("Task Service"));
        }

        #[ink::test]
        fn purchase_works() {
            let mut service = Service::new(
                String::from("Task Service"),
                String::from("Description of the task service"),
                String::from("https://example.com/photo.jpg"),
                100000,
                10,
                String::from("New York, USA"),
                String::from("Service Type"),
                String::from("Terms and conditions text"),
                String::from("Requirements text"),
                String::from("2024-12-31"),
            );

            let accounts = ink_env::test::default_accounts::<ink_env::DefaultEnvironment>();
            let caller = accounts.alice;

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(caller);
            ink_env::test::set_balance::<ink_env::DefaultEnvironment>(caller, 1_000_000);

            assert_eq!(
                service.purchase(1, String::from("123 Blockchain Street")),
                Ok(())
            );
        }

        #[ink::test]
        fn agree_to_terms_works() {
            let mut service = Service::new(
                String::from("Task Service"),
                String::from("Description of the task service"),
                String::from("https://example.com/photo.jpg"),
                100000,
                10,
                String::from("New York, USA"),
                String::from("Service Type"),
                String::from("Terms and conditions text"),
                String::from("Requirements text"),
                String::from("2024-12-31"),
            );

            let accounts = ink_env::test::default_accounts::<ink_env::DefaultEnvironment>();
            let caller = accounts.alice;

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(caller);

            assert_eq!(service.agree_to_terms(), Ok(()));
            assert!(service.are_terms_agreed(caller));
        }

        #[ink::test]
        fn seller_agree_to_terms_works() {
            let mut service = Service::new(
                String::from("Task Service"),
                String::from("Description of the task service"),
                String::from("https://example.com/photo.jpg"),
                100000,
                10,
                String::from("New York, USA"),
                String::from("Service Type"),
                String::from("Terms and conditions text"),
                String::from("Requirements text"),
                String::from("2024-12-31"),
            );

            assert_eq!(service.seller_agree_to_terms(), Ok(()));
            assert!(service.seller_agreement);
        }
    }
}
