"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var postUrl = 'https://jsonplaceholder.typicode.com/posts/';
var form = document.querySelector('.form');

var postData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, data) {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json; charset=utf-8'
              },
              body: data
            });

          case 2:
            res = _context.sent;
            return _context.abrupt("return", res.json());

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var postConstruction = function postConstruction(formSelector) {
  var formData = new FormData(formSelector);
  var json = JSON.stringify(Object.fromEntries(formData.entries()));
  console.log(json);
  postData(postUrl, json).then(function (data) {
    form.reset();
    console.log('Спасибо за обращение, мы с вами свяжемся!!!');
  }).catch(function (e) {
    console.log('Ошибка отправки данных');
  }).finally(function () {
    form.reset();
  });
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var name = form.name,
      company = form.company,
      email = form.email,
      message = form.message,
      checkbox = form.checkbox;

  if (checkbox.checked) {
    if (name.value !== '' & company.value !== '' & email.value !== '' & message.value !== '') {
      postConstruction(form);
    } else {
      console.log('Пожалуйста, заполните обязательные поля!!!');
    }
  } else {
    console.log('А ну-ка, прими пользовательское соглашение!!!');
  }
});