'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Sorting not yet working :(
var styleT = {
  marginTop: 100,
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '80%',
  backgroundColor: '#eee',
  fontWeight: 'bold',
  cursor: 'default'
};

var styleTH = {
  fontSize: 20,
  color: 'white',
  background: 'url("https://i.ytimg.com/vi/wJhcPwVYA1g/maxresdefault.jpg")'
};

var styleSort = {
  backgroundColor: '#eee',
  color: '#666666',
  fontWeight: 'bold',
  cursor: 'default'

};

var TableShow = function (_React$Component) {
  _inherits(TableShow, _React$Component);

  function TableShow() {
    _classCallCheck(this, TableShow);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  TableShow.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'table-responsive' },
      React.createElement(
        'table',
        { className: 'table sortable', style: (styleT, styleSort), id: 'tab' },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              { colSpan: '4', style: styleTH },
              'Leaderboards'
            )
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              '#'
            ),
            React.createElement(
              'th',
              null,
              'Name'
            ),
            React.createElement(
              'th',
              null,
              'Recent points'
            ),
            React.createElement(
              'th',
              null,
              'All time points'
            )
          )
        ),
        React.createElement(TableData, null)
      )
    );
  };

  return TableShow;
}(React.Component);

var TableData = function (_React$Component2) {
  _inherits(TableData, _React$Component2);

  function TableData() {
    _classCallCheck(this, TableData);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this));

    _this2.state = { arrRes: [] };
    return _this2;
  }

  TableData.prototype.getInitialState = function getInitialState() {
    return {
      arrRes: [],
      sort: true
    };
  };

  TableData.prototype.componentWillMount = function componentWillMount() {
    var url = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    $.ajax({
      url: url,
      dataType: 'json',
      success: function (res) {
        var users = res;
        this.setState({ arrRes: users });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  };

  TableData.prototype.render = function render() {
    var count = 0;
    var users = this.state.arrRes.map(function (user) {
      ++count;
      var link = 'https://www.freecodecamp.com/' + user.username;
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          count
        ),
        React.createElement(
          'td',
          { id: 'user' },
          React.createElement('img', { src: user.img }),
          React.createElement(
            'a',
            { href: link, target: '_blank' },
            user.username
          )
        ),
        React.createElement(
          'td',
          null,
          user.recent
        ),
        React.createElement(
          'td',
          null,
          user.alltime
        )
      );
    });
    return React.createElement(
      'tbody',
      null,
      users
    );
  };

  return TableData;
}(React.Component);

ReactDOM.render(React.createElement(TableShow, null), document.getElementById('app'));

var tab = document.getElementById('tab');
sorttable.makeSortable(tab);