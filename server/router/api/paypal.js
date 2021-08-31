const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

const payment_json1 = {
  intent: 'sale',
  payer: {
    payment_method: 'paypal',
  },
  redirect_urls: {
    return_url: process.env.HOST + '/success',
    cancel_url: process.env.HOST + '/cancel',
  },
  transactions: [
    {
      item_list: {
        items: [
          {
            name: 'Virtal Business Card',
            description: '5 Qrcode for Virtal business card',
            quantity: 1,
            price: '5.00',
            tax: '0.45',
            currency: 'EUR',
            sku: '001',
          },
          {
            name: 'Qrcode for URL ',
            description: '10 Qrcode for URL dynamical',
            quantity: 1,
            price: '5.00',
            tax: '0.45',
            currency: 'EUR',
            sku: '002',
          },
        ],
      },
      amount: {
        currency: 'EUR',
        total: '10.90',
        details: {
          shipping: '0', //transport
          subtotal: '10', // sous total
          shipping_discount: '0.00', //reduction transport
          insurance: '0.00', // assurance
          handling_fee: '0.00', // frais de gestion
          tax: '0.90', // tax
        },
      },
      description: 'Hat for the best team ever',
      payment_options: {
        allowed_payment_method: 'IMMEDIATE_PAY',
      },
    },
  ],
};

const payment_json2 = {
  intent: 'sale',
  payer: {
    payment_method: 'paypal',
  },
  redirect_urls: {
    return_url: process.env.HOST + '/success',
    cancel_url: process.env.HOST + '/cancel',
  },
  transactions: [
    {
      item_list: {
        items: [
          {
            name: 'Virtal Business Card',
            description: '10 Qrcode for Virtal business card',
            quantity: 1,
            price: '40.00',
            tax: '0.45',
            currency: 'EUR',
            sku: '001',
          },
          {
            name: 'Qrcode for URL ',
            description: '10 Qrcode for URL dynamical',
            quantity: 1,
            price: '40.00',
            tax: '0.45',
            currency: 'EUR',
            sku: '002',
          },
        ],
      },
      amount: {
        currency: 'EUR',
        total: '80.90',
        details: {
          shipping: '0', //transport
          subtotal: '80', // sous total
          shipping_discount: '0.00', //reduction transport
          insurance: '0.00', // assurance
          handling_fee: '0.00', // frais de gestion
          tax: '0.90', // tax
        },
      },
      description: 'Hat for the best team ever',
      payment_options: {
        allowed_payment_method: 'IMMEDIATE_PAY',
      },
    },
  ],
};

const payment_json3 = {
  intent: 'sale',
  payer: {
    payment_method: 'paypal',
  },
  redirect_urls: {
    return_url: process.env.HOST + '/success',
    cancel_url: process.env.HOST + '/cancel',
  },
  transactions: [
    {
      item_list: {
        items: [
          {
            name: 'Virtal Business Card',
            description: '300 Qrcode for Virtal business card',
            quantity: 1,
            price: '250.00',
            tax: '0.45',
            currency: 'EUR',
            sku: '001',
          },
          {
            name: 'Qrcode for URL ',
            description: '500 Qrcode for URL dynamical',
            quantity: 1,
            price: '50.00',
            tax: '0.45',
            currency: 'EUR',
            sku: '002',
          },
        ],
      },
      amount: {
        currency: 'EUR',
        total: '300.90',
        details: {
          shipping: '0', //transport
          subtotal: '10', // sous total
          shipping_discount: '0.00', //reduction transport
          insurance: '0.00', // assurance
          handling_fee: '0.00', // frais de gestion
          tax: '0.90', // tax
        },
      },
      description: 'Hat for the best team ever',
      payment_options: {
        allowed_payment_method: 'IMMEDIATE_PAY',
      },
    },
  ],
};
router.post('/payment', async (req, res) => {
  const { value } = req.body;
  let create_payment_json = {};
  if (value == 1) {
    create_payment_json = payment_json1;
  } else if (value == 2) {
    create_payment_json = payment_json2;
  } else if (value == 3) {
    create_payment_json = payment_json3;
  }

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          // res.redirect(payment.links[i].href);
          res.status(201).json({
            status: 'success',
            link: payment.links[i].href,
          });
        }
      }
    }
  });
});

router.get('/success', (req, res) => {
  console.log(req.query);
  var paymentId = req.query.paymentId;
  var payerId = { payer_id: req.query.PayerID };

  paypal.payment.execute(paymentId, payerId, function (error, payment) {
    if (error) {
      console.error(JSON.stringify(error));
    } else {
      if (payment.state == 'approved') {
        //console.log(JSON.stringify(payment, null, '\t'));
        console.log('payment completed successfully');
        res.status(201).json({
          status: 'success',
          payment: payment,
        });
        // res.send('Success');
      } else {
        res.status(400).json({
          status: 'payment not successful',
          payment: {},
        });
      }
    }
  });
});

router.get('/cancel', (req, res) =>
  res.status(201).json({
    status: 'fail',
    msg: 'payment cancel',
  })
);

module.exports = router;
