#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod commerce {
    use ink::prelude::string::String;
    use ink::storage::collections::HashMap as StorageHashMap;

    #[ink(storage)]
    pub struct Commerce {
        title: String,
        description: String,
        photo: String,
        price: u128,
        quantity: u128,
        location: String,
        service_type: String,
        delivery_addresses: StorageHashMap<AccountId, String>,
    }

    impl Commerce {
        #[ink(constructor)]
        pub fn new(
            title: String,
            description: String,
            photo: String,
            price: u128,
            quantity: u128,
            location: String,
            service_type: String,
        ) -> Self {
            Self {
                title,
                description,
                photo,
                price,
                quantity,
                location,
                service_type,
                delivery_addresses: StorageHashMap::new(),
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
        pub fn get_delivery_address(&self, account: AccountId) -> Option<String> {
            self.delivery_addresses.get(&account).cloned()
        }

        #[ink(message, payable)]
        pub fn purchase(&mut self, quantity: u128, delivery_address: String) -> Result<(), String> {
            let caller = self.env().caller();
            let payment = self.env().transferred_balance();

            let total_price = self.price * quantity;
            if payment < total_price {
                return Err(String::from("Insufficient payment"));
            }
            if self.quantity < quantity {
                return Err(String::from("Insufficient stock"));
            }

            self.quantity -= quantity;
            self.delivery_addresses.insert(caller, delivery_address);

            Ok(())
        }

        /// Sets `title` to the given value.
        #[ink(message)]
        pub fn set_title(&mut self, new_value: String) {
            self.title = new_value;
        }
    }

    /// Start of unit tests
    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn new_works() {
            let commerce = Commerce::new(
                String::from("Cool Black T-Shirt"),
                String::from("Commerce cool tshirt!"),
                String::from("https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
                100000,
                10,
                String::from("Houston, Texas"),
                String::from("Clothing"),
            );
            assert_eq!(commerce.greet(), String::from("Cool Black T-Shirt"));
        }

        #[ink::test]
        fn purchase_works() {
            let mut commerce = Commerce::new(
                String::from("Cool Black T-Shirt"),
                String::from("Commerce cool tshirt!"),
                String::from("https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
                100000,
                10,
                String::from("Houston, Texas"),
                String::from("Clothing"),
            );

            let accounts = ink_env::test::default_accounts::<ink_env::DefaultEnvironment>();
            let caller = accounts.alice;

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(caller);
            ink_env::test::set_balance::<ink_env::DefaultEnvironment>(caller, 1_000_000);

            assert_eq!(
                commerce.purchase(1, String::from("123 Blockchain Street")),
                Ok(())
            );
        }
    }
}
