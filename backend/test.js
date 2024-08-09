
Promise.allSettled()

// function outer() {
//     let x = 10;

//     function inner() {
//         console.log(x);
//     }

//     return inner;
// }
// const closureFn = outer();
// closureFn();



// async function main() {
// {
//     var shipments = [{
//         "shipmentNumber": "FRT0011"
//     }]
//     console.log(`shipments: ${shipments?.length}`)
// }

// console.log(`shipments: ${shipments?.length}`)
// }
// main()

// async function main() {
//     function task1() {
//         globalThis.shipments = [{
//             "shipmentNumber": "FRT0011"
//         }]
//         console.log(`shipments: ${globalThis.shipments?.length}`)
//     }

//     function task2() {
//         console.log(`shipments: ${globalThis.shipments?.length}`)
//     }

//     task1()
//     console.log(`shipments: ${globalThis.shipments?.length}`)
//     task2()
// }
// main()

