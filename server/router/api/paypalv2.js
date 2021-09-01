const express = require('express');
const router = express.Router();
const paypal = require('@paypal/checkout-server-sdk');

// Creating an environment
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);

let client = new paypal.core.PayPalHttpClient(environment);
// A unique invoice_number value must be supplied with each transaction. Using the same invoice_number as a previous transaction will produce a Duplicate invoice Id detected error
function buildRequestBody() {
  return {
    intent: 'CAPTURE',
    application_context: {
      return_url: process.env.HOST + '/success',
      cancel_url: process.env.HOST + '/cancel',
      brand_name: 'EXAMPLE INC',
      locale: 'en-US',
      landing_page: 'BILLING',
      shipping_preference: 'SET_PROVIDED_ADDRESS',
      user_action: 'CONTINUE',
    },
    purchase_units: [
      {
        reference_id: 'PUHF',
        description: 'Sporting Goods',

        custom_id: 'CUST-HighFashions',
        soft_descriptor: 'HighFashions',
        amount: {
          currency_code: 'USD',
          value: '220.00',
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: '180.00',
            },
            shipping: {
              currency_code: 'USD',
              value: '20.00',
            },
            handling: {
              currency_code: 'USD',
              value: '10.00',
            },
            tax_total: {
              currency_code: 'USD',
              value: '20.00',
            },
            shipping_discount: {
              currency_code: 'USD',
              value: '10',
            },
          },
        },
        items: [
          {
            name: 'T-Shirt',
            description: 'Green XL',
            sku: 'sku01',
            unit_amount: {
              currency_code: 'USD',
              value: '90.00',
            },
            tax: {
              currency_code: 'USD',
              value: '10.00',
            },
            quantity: '1',
            category: 'PHYSICAL_GOODS',
          },
          {
            name: 'Shoes',
            description: 'Running, Size 10.5',
            sku: 'sku02',
            unit_amount: {
              currency_code: 'USD',
              value: '45.00',
            },
            tax: {
              currency_code: 'USD',
              value: '5.00',
            },
            quantity: '2',
            category: 'PHYSICAL_GOODS',
          },
        ],
        shipping: {
          method: 'United States Postal Service',
          name: {
            full_name: 'John Doe',
          },
          address: {
            address_line_1: '123 Townsend St',
            address_line_2: 'Floor 6',
            admin_area_2: 'San Francisco',
            admin_area_1: 'CA',
            postal_code: '94107',
            country_code: 'US',
          },
        },
      },
    ],
  };
}
router.post('/payment', async (req, res) => {
  let request = new paypal.orders.OrdersCreateRequest();
  request.headers['prefer'] = 'return=representation';
  let test = buildRequestBody();
  request.requestBody(test);
  try {
    let response = await client.execute(request);
    console.log(`Order: ${JSON.stringify(response.result, null, '\t')}`);
    for (let i = 0; i < response.result.links.length; i++) {
      if (response.result.links[i].rel === 'approve') {
        res.json({
          status: 'success',
          link: response.result.links[i].href,
        });
      }
    }
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      link: 'UNDEFINE',
    });
  }
});
//?token=7GG200691G494104D&PayerID=D2UGSMXGFYD6G
router.get('/success', (req, res) => {
  //console.log(req.query);
  var paymentId = req.query.token;
  console.log(paymentId);
  // // var payerId = { payer_id: req.query.PayerID };
  try {
    let captureOrder = async function (orderId) {
      request = new paypal.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});
      // Call API with your client and get a response for your call
      let response = await client.execute(request);
      // If call returns body in response, you can get the deserialized version from the result attribute of the response.
      //console.log(`Capture: ${JSON.stringify(response.result)}`);
      res.status(201).json({
        status: 'success',
        payment: response.result,
      });
    };
    captureOrder(paymentId);
  } catch (err) {
    console.error(JSON.stringify(error));
    res.status(400).json({
      status: 'payment not successful',
      payment: {},
    });
  }
});

router.get('/getorder', (req, res) => {
  try {
    var orderId = req.query.token;
    let getRequest = new paypal.orders.OrdersGetRequest(orderId);
    client.execute(getRequest).then((getResponse) => {
      // console.log(JSON.stringify(getResponse.result));
      res.status(201).json({
        status: 'data payment ',
        payment: getResponse.result,
      });
    });
  } catch (err) {
    console.error(JSON.stringify(error));
    res.status(400).json({
      status: 'payment not successful',
      payment: {},
    });
  }
});

router.get('/cancel', (req, res) =>
  res.status(201).json({
    status: 'fail',
    msg: 'payment cancel',
  })
);

module.exports = router;
