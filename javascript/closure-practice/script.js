function makeCart () {
    let items = [];
    let total = 0;

    
    return {
        addItem(name, price) {
            items.push({ name, price });
            total += price;  
        },

        removeItem(name) {
            const item = items.find(item => item.name === name);
            if (item) {
                total -= item.price;
                items = items.filter(item => item.name !== name);
            }
            
        },

        getSummary() {
            console.log("Items:", items.map(item => item.name).join(","));
            console.log("Total:", total);
        }
    }
}


const cart1 = makeCart();
const cart2 = makeCart();

cart1.addItem("Book", 299);
cart1.addItem("Pen", 49);
cart2.addItem("Laptop", 75000);

cart1.getSummary();
cart2.getSummary();