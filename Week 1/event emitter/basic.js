const EventEmitter = require("events");

class OrderEmitter extends EventEmitter {}

const orderEmitter = new OrderEmitter();

// Listen for order event
orderEmitter.on("order", (req) => {
    const orderId = req.orderId;
    const orderItem = req.orderItem;
    console.log(`Order received: ${orderId}, Item: ${orderItem}`);
    prepareOrder(orderId, orderItem);
})

const prepareOrder = (orderId, orderItem) => {
    console.log(`Preparing Order: ${orderId}, Item: ${orderItem}`);
    setTimeout( () => {
        console.log(`Order Id ${orderId} is ready for pick up`);
    }, 6000)
}

orderEmitter.emit('order', {orderId: 1, orderItem: "Hamburger"});
orderEmitter.emit('order', {orderId: 2, orderItem: "Salmemit"});
orderEmitter.emit('order', {orderId: 3, orderItem: "Lobster"});