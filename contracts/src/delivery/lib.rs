#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod package_delivery {
    use ink::prelude::string::String;
    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct PackageDelivery {
        pickup_location: String,
        dropoff_location: String,
        compensation: u128,
        product_description: String,
        sender: AccountId,
        recipient: Option<AccountId>,
        terms_agreed: Mapping<AccountId, bool>,
        task_completed: bool,
    }

    impl PackageDelivery {
        #[ink(constructor)]
        pub fn new(
            pickup_location: String,
            dropoff_location: String,
            compensation: u128,
            product_description: String,
        ) -> Self {
            Self {
                pickup_location,
                dropoff_location,
                compensation,
                product_description,
                sender: Self::env().caller(),
                recipient: None,
                terms_agreed: Mapping::default(),
                task_completed: false,
            }
        }

        #[ink(message)]
        pub fn get_pickup_location(&self) -> String {
            self.pickup_location.clone()
        }

        #[ink(message)]
        pub fn get_dropoff_location(&self) -> String {
            self.dropoff_location.clone()
        }

        #[ink(message)]
        pub fn get_compensation(&self) -> u128 {
            self.compensation
        }

        #[ink(message)]
        pub fn get_product_description(&self) -> String {
            self.product_description.clone()
        }

        #[ink(message)]
        pub fn get_sender(&self) -> AccountId {
            self.sender
        }

        #[ink(message)]
        pub fn get_recipient(&self) -> Option<AccountId> {
            self.recipient
        }

        #[ink(message)]
        pub fn agree_to_terms(&mut self) -> Result<(), String> {
            let caller = self.env().caller();
            if self.recipient.is_some() {
                return Err(String::from("Recipient already assigned"));
            }
            self.recipient = Some(caller);
            self.terms_agreed.insert(caller, &true);
            Ok(())
        }

        #[ink(message)]
        pub fn complete_task(&mut self) -> Result<(), String> {
            let caller = self.env().caller();
            if Some(caller) != self.recipient {
                return Err(String::from("Only the recipient can complete the task"));
            }
            if !self.terms_agreed.get(&caller).unwrap_or(false) {
                return Err(String::from("Terms not agreed by recipient"));
            }
            if self.task_completed {
                return Err(String::from("Task already completed"));
            }
            self.task_completed = true;
            self.env()
                .transfer(self.sender, self.compensation)
                .map_err(|_| String::from("Transfer failed"))?;
            Ok(())
        }

        #[ink(message)]
        pub fn are_terms_agreed(&self, account: AccountId) -> bool {
            self.terms_agreed.get(&account).unwrap_or(false)
        }

        #[ink(message)]
        pub fn is_task_completed(&self) -> bool {
            self.task_completed
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn new_works() {
            let delivery = PackageDelivery::new(
                String::from("Location A"),
                String::from("Location B"),
                1000,
                String::from("Product Description"),
            );
            assert_eq!(delivery.get_pickup_location(), String::from("Location A"));
            assert_eq!(delivery.get_dropoff_location(), String::from("Location B"));
            assert_eq!(delivery.get_compensation(), 1000);
            assert_eq!(
                delivery.get_product_description(),
                String::from("Product Description")
            );
        }

        #[ink::test]
        fn agree_to_terms_works() {
            let mut delivery = PackageDelivery::new(
                String::from("Location A"),
                String::from("Location B"),
                1000,
                String::from("Product Description"),
            );

            let accounts = ink_env::test::default_accounts::<ink_env::DefaultEnvironment>();
            let caller = accounts.bob;

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(caller);

            assert_eq!(delivery.agree_to_terms(), Ok(()));
            assert_eq!(delivery.get_recipient(), Some(caller));
            assert!(delivery.are_terms_agreed(caller));
        }

        #[ink::test]
        fn complete_task_works() {
            let mut delivery = PackageDelivery::new(
                String::from("Location A"),
                String::from("Location B"),
                1000,
                String::from("Product Description"),
            );

            let accounts = ink_env::test::default_accounts::<ink_env::DefaultEnvironment>();
            let sender = accounts.alice;
            let recipient = accounts.bob;

            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(recipient);
            ink_env::test::set_balance::<ink_env::DefaultEnvironment>(sender, 2000);
            ink_env::test::set_balance::<ink_env::DefaultEnvironment>(recipient, 0);

            delivery.agree_to_terms().unwrap();
            ink_env::test::set_caller::<ink_env::DefaultEnvironment>(recipient);

            assert_eq!(delivery.complete_task(), Ok(()));
            assert!(delivery.is_task_completed());
            assert_eq!(
                ink_env::test::get_balance::<ink_env::DefaultEnvironment>(sender),
                1000
            );
        }
    }
}
