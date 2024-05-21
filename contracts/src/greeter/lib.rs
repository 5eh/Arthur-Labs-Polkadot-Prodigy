#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod greeter {
    use ink::prelude::string::String;

    #[ink(storage)]
    pub struct Greeter {
        title: String,
        description: String,
        photo: String,
        price: u128,
        quantity: u16,
        location: String,
        service_type: String,
    }

    impl Greeter {
        /// Creates a new greeter contract initialized with the given value.
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                title: String::from("Cool black t-shirt"),
                description: String::from("Please come buy my cool black t-shirt, only 1000 DOT, I will even sign it and give you a high five upon pickup"),
                photo: String::from("https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
                price: 100000,
                quantity: 10,
                location: String::from("Austin, Texas"),
                service_type: String::from("Clothing"),
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

        /// Sets `message` to the given value.
        #[ink(message)]
        pub fn set_message(&mut self, new_value: String) {
            self.title = new_value.clone();
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn new_works() {
            let message = String::from("Cool black t-shirt");
            let greeter = Greeter::new();
            assert_eq!(greeter.greet(), message);
        }

        #[ink::test]
        fn set_message_works() {
            let message_1 = String::from("Cool black t-shirt");
            let mut greeter = Greeter::new();
            assert_eq!(greeter.greet(), message_1);
            let message_2 = String::from("gn");
            greeter.set_message(message_2.clone());
            assert_eq!(greeter.greet(), message_2);
        }
    }
}
