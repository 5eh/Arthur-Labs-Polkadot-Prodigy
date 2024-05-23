#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod commerce {
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

    pub struct FormInput {
        title: String,
        description: String,
        photo: String,
        price: u128,
        quantity: u128,
        location: String,
        service_type: String,
    }

    pub struct Something {
        price: u8,
    }

    #[ink(storage)]
    pub struct Commerce {
        title: String,
        description: String,
        photo: String,
        price: u128,
        quantity: u128,
        location: String,
        service_type: String,
        my_array: Vec<Something>,
    }

    impl Commerce {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                title: String::from("Cool Commerce"),
                description: String::from("Commerce cool tshirt!"),
                photo: String::from("https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
                price: 100000,
                quantity: 10,
                location: String::from("Austin, Texas"),
                service_type: String::from("Clothing"),
                my_array: Vec::new(),
            }
        }

        /// Returns the current value of `message`.
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
            self.price.clone()
        }

        #[ink(message)]
        pub fn get_quantity(&self) -> u128 {
            self.quantity.clone()
        }

        #[ink(message)]
        pub fn get_service_type(&self) -> String {
            self.service_type.clone()
        }

        #[ink(message)]
        pub fn get_location(&self) -> String {
            self.location.clone()
        }

        /// Sets `message` to the given value.
        #[ink(message)]
        pub fn set_message(&mut self, new_value: String) {
            self.title = new_value.clone();
        }
    }

    /// Start of unit tests
    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn new_works() {
            let message = String::from("Cool black t-shirt");
            let commerce = Commerce::new();
            assert_eq!(commerce.greet(), message);
        }

        #[ink::test]
        fn set_message_works() {
            let message_1 = String::from("Cool black t-shirt");
            let mut commerce = Commerce::new();
            assert_eq!(commerce.greet(), message_1);
            let message_2 = String::from("gn");
            commerce.set_message(message_2.clone());
            assert_eq!(commerce.greet(), message_2);
        }
    }
}
