(function() {
  var Chess, Piece, Player, Point, requestAnimFrame,
    __hasProp = {}.hasOwnProperty,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  window.Game = {};

  Game.columns = 9;

  Game.rows = 10;

  Game.margin_top = 50;

  Game.margin_left = 50;

  Game.piece_padding = 60;

  Game.radius = 26;

  Game.is_debug = true;

  Game.log = function(message) {
    if ($("#debug").val() === '') {
      if (Game.is_debug) {
        return $("#debug").val(message);
      }
    } else {
      if (Game.is_debug) {
        return $("#debug").val($("#debug").val() + "\n" + message);
      }
    }
  };

  Piece = (function() {
    Piece.reverse_point = function(p) {
      return {
        x: 8 - p.x,
        y: 9 - p.y
      };
    };

    function Piece(name_symbol, color) {
      this.name_symbol = name_symbol;
      this.name = this.name_symbol.indexOf('_') > -1 ? this.name_symbol.split('_')[0] : this.name_symbol;
      this.is_alive = true;
      this.is_selected = false;
      this.is_hover = false;
      this.attackable = true;
      this.color = color;
      this.point = new Point(this.start_point().x, this.start_point().y);
      this.target_point = null;
      this.radius = Game.radius;
      this.selected_color = '#BDBDBD';
    }

    Piece.prototype.move_to_point = function(target_point) {
      this.target_point = target_point;
    };

    Piece.prototype.update = function(dt) {
      if (this.target_point) {
        if (this.target_point.x !== this.point.x) {
          if (this.target_point.x < this.point.x) {
            this.point.x -= 1;
          }
          if (this.target_point.x > this.point.x) {
            this.point.x += 1;
          }
        }
        if (this.target_point.y !== this.point.y) {
          if (this.target_point.y < this.point.y) {
            this.point.y -= 1;
          }
          if (this.target_point.y > this.point.y) {
            this.point.y += 1;
          }
        }
        if (this.target_point.x === this.point.x && this.target_point.y === this.point.y) {
          this.target_point.is_selected = false;
          this.is_selected = false;
        }
      }
    };

    Piece.prototype.renderTo = function(chess) {
      this.chess = chess;
      this.chess.ctx.beginPath();
      this.chess.ctx.arc(this.point.x_in_world(), this.point.y_in_world(), this.radius, 0, 2 * Math.PI, false);
      if (this.attackable === true) {
        this.chess.ctx.fillStyle = '#E9BEBE';
      } else if (this.is_selected || this.is_hover) {
        this.chess.ctx.fillStyle = this.selected_color;
      } else {
        this.chess.ctx.fillStyle = '#EEEDDD';
      }
      this.chess.ctx.fill();
      this.chess.ctx.lineWidth = 5;
      this.chess.ctx.strokeStyle = this.color;
      this.chess.ctx.stroke();
      this.chess.ctx.font = '20pt Calibri';
      this.chess.ctx.fillStyle = this.color;
      this.chess.ctx.textAlign = 'center';
      this.chess.ctx.fillText(this.label(), this.point.x_in_world(), this.point.y_in_world() + 10);
    };

    Piece.prototype.label = function() {
      var l;
      l = null;
      if (this.name === 'carriage') {
        l = this.color === 'red' ? '车' : '車';
      }
      if (this.name === 'horse') {
        l = this.color === 'red' ? '马' : '馬';
      }
      if (this.name === 'elephant') {
        l = this.color === 'red' ? '象' : '相';
      }
      if (this.name === 'knight') {
        l = this.color === 'red' ? '士' : '士';
      }
      if (this.name === 'chief') {
        l = this.color === 'red' ? '将' : '帅';
      }
      if (this.name === 'gun') {
        l = this.color === 'red' ? '炮' : '炮';
      }
      if (this.name === 'soldier') {
        l = this.color === 'red' ? '兵' : '卒';
      }
      return l;
    };

    Piece.prototype.start_point = function() {
      switch (this.name_symbol) {
        case 'carriage_l':
          if (this.color === 'red') {
            return {
              x: 0,
              y: 0
            };
          } else {
            return Piece.reverse_point({
              x: 0,
              y: 0
            });
          }
          break;
        case 'carriage_r':
          if (this.color === 'red') {
            return {
              x: 8,
              y: 0
            };
          } else {
            return Piece.reverse_point({
              x: 8,
              y: 0
            });
          }
          break;
        case 'horse_l':
          if (this.color === 'red') {
            return {
              x: 1,
              y: 0
            };
          } else {
            return Piece.reverse_point({
              x: 1,
              y: 0
            });
          }
          break;
        case 'horse_r':
          if (this.color === 'red') {
            return {
              x: 7,
              y: 0
            };
          } else {
            return Piece.reverse_point({
              x: 7,
              y: 0
            });
          }
          break;
        case 'elephant_l':
          if (this.color === 'red') {
            return {
              x: 2,
              y: 0
            };
          } else {
            return Piece.reverse_point({
              x: 2,
              y: 0
            });
          }
          break;
        case 'elephant_r':
          if (this.color === 'red') {
            return {
              x: 6,
              y: 0
            };
          } else {
            return Piece.reverse_point({
              x: 6,
              y: 0
            });
          }
          break;
        case 'knight_l':
          if (this.color === 'red') {
            return {
              x: 3,
              y: 0
            };
          } else {
            return Piece.reverse_point({
              x: 3,
              y: 0
            });
          }
          break;
        case 'knight_r':
          if (this.color === 'red') {
            return {
              x: 5,
              y: 0
            };
          } else {
            return Piece.reverse_point({
              x: 5,
              y: 0
            });
          }
          break;
        case 'chief':
          if (this.color === 'red') {
            return {
              x: 4,
              y: 0
            };
          } else {
            return Piece.reverse_point({
              x: 4,
              y: 0
            });
          }
          break;
        case 'gun_l':
          if (this.color === 'red') {
            return {
              x: 1,
              y: 2
            };
          } else {
            return Piece.reverse_point({
              x: 1,
              y: 2
            });
          }
          break;
        case 'gun_r':
          if (this.color === 'red') {
            return {
              x: 7,
              y: 2
            };
          } else {
            return Piece.reverse_point({
              x: 7,
              y: 2
            });
          }
          break;
        case 'soldier_1':
          if (this.color === 'red') {
            return {
              x: 0,
              y: 3
            };
          } else {
            return Piece.reverse_point({
              x: 0,
              y: 3
            });
          }
          break;
        case 'soldier_2':
          if (this.color === 'red') {
            return {
              x: 2,
              y: 3
            };
          } else {
            return Piece.reverse_point({
              x: 2,
              y: 3
            });
          }
          break;
        case 'soldier_3':
          if (this.color === 'red') {
            return {
              x: 4,
              y: 3
            };
          } else {
            return Piece.reverse_point({
              x: 4,
              y: 3
            });
          }
          break;
        case 'soldier_4':
          if (this.color === 'red') {
            return {
              x: 6,
              y: 3
            };
          } else {
            return Piece.reverse_point({
              x: 6,
              y: 3
            });
          }
          break;
        case 'soldier_5':
          if (this.color === 'red') {
            return {
              x: 8,
              y: 3
            };
          } else {
            return Piece.reverse_point({
              x: 8,
              y: 3
            });
          }
      }
    };

    Piece.prototype.moveable_points = function() {
      var point, target_points, x, y, _i, _j, _k, _l, _m, _n, _o, _p, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      target_points = [];
      switch (this.name) {
        case 'carriage':
          if (this.point.x > 0) {
            for (x = _i = _ref = this.point.x - 1; _ref <= 0 ? _i <= 0 : _i >= 0; x = _ref <= 0 ? ++_i : --_i) {
              point = new Point(x, this.point.y);
              if (this.chess.is_enemy_point(point)) {
                target_points.push(point);
                break;
              } else if (this.chess.is_blank_point(point)) {
                target_points.push(point);
              } else {
                break;
              }
            }
          }
          if (this.point.x < 8) {
            for (x = _j = _ref1 = this.point.x + 1; _ref1 <= 8 ? _j <= 8 : _j >= 8; x = _ref1 <= 8 ? ++_j : --_j) {
              point = new Point(x, this.point.y);
              if (this.chess.is_enemy_point(point)) {
                target_points.push(point);
                break;
              } else if (this.chess.is_blank_point(point)) {
                target_points.push(point);
              } else {
                break;
              }
            }
          }
          if (this.point.y > 0) {
            for (y = _k = _ref2 = this.point.y - 1; _ref2 <= 0 ? _k <= 0 : _k >= 0; y = _ref2 <= 0 ? ++_k : --_k) {
              point = new Point(this.point.x, y);
              if (this.chess.is_enemy_point(point)) {
                target_points.push(point);
                break;
              }
              if (this.chess.is_blank_point(point)) {
                target_points.push(point);
              } else {
                break;
              }
            }
          }
          if (this.point.y < 9) {
            for (y = _l = _ref3 = this.point.y + 1; _ref3 <= 9 ? _l <= 9 : _l >= 9; y = _ref3 <= 9 ? ++_l : --_l) {
              point = new Point(this.point.x, y);
              console.log('point x,y', this.point.x, y);
              if (this.chess.is_enemy_point(point)) {
                target_points.push(point);
                break;
              }
              if (this.chess.is_blank_point(point)) {
                target_points.push(point);
              } else {
                break;
              }
            }
          }
          break;
        case 'gun':
          if (this.point.x > 0) {
            for (x = _m = _ref4 = this.point.x - 1; _ref4 <= 0 ? _m <= 0 : _m >= 0; x = _ref4 <= 0 ? ++_m : --_m) {
              point = new Point(x, this.point.y);
              if (this.chess.is_blank_point(point)) {
                target_points.push(point);
              } else {
                break;
              }
            }
          }
          if (this.point.x < 8) {
            for (x = _n = _ref5 = this.point.x + 1; _ref5 <= 8 ? _n <= 8 : _n >= 8; x = _ref5 <= 8 ? ++_n : --_n) {
              point = new Point(x, this.point.y);
              if (this.chess.is_blank_point(point)) {
                target_points.push(point);
              } else {
                break;
              }
            }
          }
          if (this.point.y > 0) {
            for (y = _o = _ref6 = this.point.y - 1; _ref6 <= 0 ? _o <= 0 : _o >= 0; y = _ref6 <= 0 ? ++_o : --_o) {
              point = new Point(this.point.x, y);
              if (this.chess.is_blank_point(point)) {
                target_points.push(point);
              } else {
                break;
              }
            }
          }
          if (this.point.y < 9) {
            for (y = _p = _ref7 = this.point.y + 1; _ref7 <= 9 ? _p <= 9 : _p >= 9; y = _ref7 <= 9 ? ++_p : --_p) {
              point = new Point(this.point.x, y);
              if (this.chess.is_blank_point(point)) {
                target_points.push(point);
              } else {
                break;
              }
            }
          }
      }
      return target_points;
    };

    Piece.prototype.moveable_points_with_alone = function() {
      var target_points, x, y, _i, _j;
      target_points = [];
      switch (this.name) {
        case 'carriage':
          for (x = _i = 0; _i <= 8; x = ++_i) {
            if (x !== this.point.x) {
              target_points.push(new Point(x, this.point.y));
            }
          }
          for (y = _j = 0; _j <= 9; y = ++_j) {
            if (y !== this.point.y) {
              target_points.push(new Point(this.point.x, y));
            }
          }
          break;
        case 'horse':
          if (this.point.x + 1 <= 8 && this.point.y + 2 <= 9) {
            target_points.push(new Point(this.point.x + 1, this.point.y + 2));
          }
          if (this.point.x + 2 <= 8 && this.point.y + 1 <= 9) {
            target_points.push(new Point(this.point.x + 2, this.point.y + 1));
          }
          if (this.point.x + 2 <= 8 && this.point.y - 1 >= 0) {
            target_points.push(new Point(this.point.x + 2, this.point.y - 1));
          }
          if (this.point.x + 1 <= 8 && this.point.y - 2 >= 0) {
            target_points.push(new Point(this.point.x + 1, this.point.y - 2));
          }
          if (this.point.x - 1 >= 0 && this.point.y - 2 >= 0) {
            target_points.push(new Point(this.point.x - 1, this.point.y - 2));
          }
          if (this.point.x - 2 >= 0 && this.point.y - 1 >= 0) {
            target_points.push(new Point(this.point.x - 2, this.point.y - 1));
          }
          if (this.point.x - 2 >= 0 && this.point.y + 1 <= 9) {
            target_points.push(new Point(this.point.x - 2, this.point.y + 1));
          }
          if (this.point.x - 1 >= 0 && this.point.y + 2 <= 9) {
            target_points.push(new Point(this.point.x - 1, this.point.y + 2));
          }
          break;
        case 'elephant':
          if (this.point.x - 2 >= 0 && this.point.y - 2 >= 0) {
            target_points.push(new Point(this.point.x - 2, this.point.y - 2));
          }
          if (this.point.x - 2 >= 0 && this.point.y + 2 <= 4) {
            target_points.push(new Point(this.point.x - 2, this.point.y + 2));
          }
          if (this.point.x + 2 <= 8 && this.point.y + 2 <= 4) {
            target_points.push(new Point(this.point.x + 2, this.point.y + 2));
          }
          if (this.point.x + 2 <= 8 && this.point.y - 2 >= 0) {
            target_points.push(new Point(this.point.x + 2, this.point.y - 2));
          }
          break;
        case 'knight':
          if (this.point.is_at(3, 0)) {
            target_points.push(new Point(4, 1));
          } else if (this.point.is_at(3, 2)) {
            target_points.push(new Point(4, 1));
          } else if (this.point.is_at(5, 2)) {
            target_points.push(new Point(4, 1));
          } else if (this.point.is_at(5, 0)) {
            target_points.push(new Point(4, 1));
          } else if (this.point.is_at(4, 1)) {
            target_points.push(new Point(3, 0));
            target_points.push(new Point(3, 2));
            target_points.push(new Point(5, 2));
            target_points.push(new Point(5, 0));
          }
          break;
        case 'chief':
          if (this.point.y - 1 >= 0) {
            target_points.push(new Point(this.point.x, this.point.y - 1));
          }
          if (this.point.y + 1 <= 2) {
            target_points.push(new Point(this.point.x, this.point.y + 1));
          }
          if (this.point.x + 1 <= 5) {
            target_points.push(new Point(this.point.x + 1, this.point.y));
          }
          if (this.point.x - 1 >= 3) {
            target_points.push(new Point(this.point.x - 1, this.point.y));
          }
          break;
        case 'gun':
          [];
          break;
        case 'soldier':
          if (this.point.y <= 4) {
            target_points.push(new Point(this.point.x, this.point.y + 1));
          } else {
            if (this.point.x - 1 >= 0) {
              target_points.push(new Point(this.point.x - 1, this.point.y));
            }
            if (this.point.x + 1 <= 8) {
              target_points.push(new Point(this.point.x + 1, this.point.y));
            }
            if (this.point.y + 1 <= 9) {
              target_points.push(new Point(this.point.x, this.point.y + 1));
            }
          }
      }
      return target_points;
    };

    Piece.prototype.active = function() {
      return this.is_selected = true;
    };

    Piece.prototype.deactive = function() {
      return this.is_selected = false;
    };

    Piece.prototype.hover = function() {
      return this.is_hover = true;
    };

    Piece.prototype.hout = function() {
      return this.is_hover = false;
    };

    return Piece;

  })();

  Point = (function() {
    Point.clone = function(point) {
      return new Point(point.x, point.y);
    };

    function Point(x, y) {
      this.x = x;
      this.y = y;
      this.is_hover = false;
      this.moveable = false;
      this.is_selected = false;
      this.state = null;
      this.marker_size1 = 12;
      this.marker_size2 = 8;
      this.marker_size3 = 6;
    }

    Point.prototype.x_in_world = function() {
      return this.x * Game.piece_padding + Game.margin_left;
    };

    Point.prototype.y_in_world = function() {
      return ((Game.rows - 1) - this.y) * Game.piece_padding + Game.margin_top;
    };

    Point.prototype.is_at = function(x, y) {
      return this.x === x && this.y === y;
    };

    Point.prototype.is_same = function(other) {
      return this.x === other.x && this.y === other.y;
    };

    Point.prototype.hover = function() {
      return this.is_hover = true;
    };

    Point.prototype.hout = function() {
      return this.is_hover = false;
    };

    Point.prototype.mark_moveable = function() {
      return this.moveable = true;
    };

    Point.prototype.reset_moveable = function() {
      return this.moveable = false;
    };

    Point.prototype.renderTo = function(ctx) {
      if (this.is_hover) {
        ctx.beginPath();
        ctx.rect(this.x_in_world() - this.marker_size3 / 2, this.y_in_world() - this.marker_size3 / 2, this.marker_size3, this.marker_size3);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#FF9900';
        ctx.stroke();
      }
      if (this.moveable) {
        ctx.beginPath();
        ctx.rect(this.x_in_world() - this.marker_size2 / 2, this.y_in_world() - this.marker_size2 / 2, this.marker_size2, this.marker_size2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'green';
        ctx.stroke();
      }
      if (this.is_selected) {
        ctx.beginPath();
        ctx.rect(this.x_in_world() - this.marker_size1 / 2, this.y_in_world() - this.marker_size1 / 2, this.marker_size1, this.marker_size1);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'blue';
        return ctx.stroke();
      }
    };

    Point.prototype.is_in = function(points) {
      var is_include, point, _i, _len;
      is_include = false;
      for (_i = 0, _len = points.length; _i < _len; _i++) {
        point = points[_i];
        if (this.is_same(point)) {
          is_include = true;
          return is_include;
        }
      }
      return is_include;
    };

    Point.prototype.is_at_top_edge = function() {
      return this.y === 9;
    };

    Point.prototype.is_at_bottom = function() {
      return this.y === 0;
    };

    Point.prototype.is_at_left_edge = function() {
      return this.x === 0;
    };

    Point.prototype.is_at_right_edge = function() {
      return this.x === (Game.columns - 1);
    };

    Point.prototype.is_at_self_river = function() {
      return this.y === 4;
    };

    Point.prototype.is_at_enmy_river = function() {
      return this.y === 5;
    };

    Point.prototype.toPosition = function() {
      return {
        x: this.x * Game.piece_padding,
        y: ((Game.rows - 1) - this.y) * Game.piece_padding
      };
    };

    Point.prototype.toPositionInWorld = function() {
      return {
        x: this.x * Game.piece_padding + Game.margin_left,
        y: ((Game.rows - 1) - this.y) * Game.piece_padding + Game.margin_top
      };
    };

    return Point;

  })();

  Player = (function() {
    function Player(color, name) {
      if (name == null) {
        name = '';
      }
      this.color = color;
      if (this.color === 'red') {
        this.name = "红方" + name;
      } else if (this.color === 'black') {
        this.name = "黑方" + name;
      }
      this.pieces = {
        carriage_l: null,
        carriage_r: null,
        horse_l: null,
        horse_r: null,
        elephant_l: null,
        elephant_r: null,
        knight_l: null,
        knight_r: null,
        chief: null,
        gun_l: null,
        gun_r: null,
        soldier_1: null,
        soldier_2: null,
        soldier_3: null,
        soldier_4: null,
        soldier_5: null
      };
    }

    Player.prototype.alive_pieces = function() {
      return this.pieces_array(false);
    };

    Player.prototype.pieces_array = function(ignore_alive) {
      var attr, piece, _ref, _ref1;
      if (ignore_alive == null) {
        ignore_alive = true;
      }
      if (ignore_alive) {
        if (this.piece_array_ignore_alive) {
          return this.piece_array_ignore_alive;
        }
        this.piece_array_ignore_alive = [];
        _ref = this.pieces;
        for (attr in _ref) {
          if (!__hasProp.call(_ref, attr)) continue;
          piece = _ref[attr];
          this.piece_array_ignore_alive.push(piece);
        }
        return this.piece_array_ignore_alive;
      } else {
        this.piece_array_alive = [];
        _ref1 = this.pieces;
        for (attr in _ref1) {
          if (!__hasProp.call(_ref1, attr)) continue;
          piece = _ref1[attr];
          if (piece.is_alive) {
            this.piece_array_alive.push(piece);
          }
        }
        return this.piece_array_alive;
      }
    };

    Player.prototype.spawn_pieces = function() {
      this.pieces.carriage_l = new Piece('carriage_l', this.color);
      this.pieces.carriage_r = new Piece('carriage_r', this.color);
      this.pieces.horse_l = new Piece('horse_l', this.color);
      this.pieces.horse_r = new Piece('horse_r', this.color);
      this.pieces.elephant_l = new Piece('elephant_l', this.color);
      this.pieces.elephant_r = new Piece('elephant_r', this.color);
      this.pieces.knight_l = new Piece('knight_l', this.color);
      this.pieces.knight_r = new Piece('knight_r', this.color);
      this.pieces.chief = new Piece('chief', this.color);
      this.pieces.gun_l = new Piece('gun_l', this.color);
      this.pieces.gun_r = new Piece('gun_r', this.color);
      this.pieces.soldier_1 = new Piece('soldier_1', this.color);
      this.pieces.soldier_2 = new Piece('soldier_2', this.color);
      this.pieces.soldier_3 = new Piece('soldier_3', this.color);
      this.pieces.soldier_4 = new Piece('soldier_4', this.color);
      this.pieces.soldier_5 = new Piece('soldier_5', this.color);
      return this.pieces_array();
    };

    return Player;

  })();

  window.Player = Player;

  Chess = (function() {
    Chess.defer = function(callback) {
      setTimeout(function() {
        return callback();
      }, 100);
    };

    Chess.prototype.debug = function() {
      var piece, point, points_in_columns, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      _ref = this.pieces;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        piece = _ref[_i];
        if (piece.is_selected) {
          console.log("[for] Selected piece is " + piece.name_symbol + " (" + piece.point.x + "," + piece.point.y + ")");
        }
      }
      _ref1 = this.points;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        points_in_columns = _ref1[_j];
        for (_k = 0, _len2 = points_in_columns.length; _k < _len2; _k++) {
          point = points_in_columns[_k];
          if (point.is_selected) {
            console.log("[for] Selected point is (" + point.x + "," + point.y + ")");
          }
        }
      }
      if (this.selected_piece) {
        console.log("      Selected piece is " + this.selected_piece.name_symbol + " (" + this.selected_piece.point.x + "," + this.selected_piece.point.y + ")");
      }
      if (this.selected_point) {
        console.log("      Selected point is (" + this.selected_point.x + "," + this.selected_point.y + ")");
      }
    };

    Chess.prototype.main = function() {
      var dt, now;
      now = Date.now();
      dt = (now - this.lastTime) / 1000.0;
      this.update(dt);
      this.render();
      this.lastTime = now;
      requestAnimFrame(this.main);
    };

    Chess.prototype.update = function(dt) {
      if (this.selected_piece && this.selected_point) {
        this.selected_piece.move_to_point(this.selected_point);
        this.selected_piece.update(dt);
        Chess.defer((function(_this) {
          return function() {
            _this.selected_piece = null;
            return _this.selected_point = null;
          };
        })(this));
      }
    };

    Chess.prototype.render = function() {
      var piece, point, points_in_columns, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      this.ctx.fillStyle = '#FFF';
      this.ctx.fillRect(0, 0, this.ctx_width, this.ctx_height);
      this.canvas_element.width = 1;
      this.canvas_element.width = this.ctx_width;
      this.drawMap();
      _ref = this.points;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        points_in_columns = _ref[_i];
        for (_j = 0, _len1 = points_in_columns.length; _j < _len1; _j++) {
          point = points_in_columns[_j];
          point.renderTo(this.ctx);
        }
      }
      _ref1 = this.pieces;
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        piece = _ref1[_k];
        if (piece.is_alive) {
          piece.renderTo(this);
        }
      }
    };

    function Chess(canvas_id) {
      if (canvas_id == null) {
        canvas_id = 'chess_game';
      }
      this.main = __bind(this.main, this);
      this.lastTime = Date.now();
      this.canvas_element = document.getElementById(canvas_id);
      this.canvasElemLeft = this.canvas_element.offsetLeft;
      this.canvasElemTop = this.canvas_element.offsetTop;
      this.ctx = this.canvas_element.getContext('2d');
      this.ctx_width = this.canvas_element.width;
      this.ctx_height = this.canvas_element.height;
      this.margin_top = Game.margin_top;
      this.margin_left = Game.margin_left;
      this.piece_margin = Game.piece_padding;
      this.columns = Game.columns;
      this.rows = Game.rows;
      this.panel_width = (this.columns - 1) * this.piece_margin;
      this.panel_height = (this.rows - 1) * this.piece_margin;
      this.points = [];
      this.pieces = [];
      this.player_red = null;
      this.player_black = null;
      this.current_player = null;
      this.selected_piece = null;
      this.selected_point = null;
      Game.log("panel width: " + this.panel_width + ", height: " + this.panel_height);
    }

    Chess.prototype.is_blank_point = function(point) {
      var blank, piece, _i, _len, _ref;
      blank = true;
      _ref = this.pieces;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        piece = _ref[_i];
        if (piece.point.is_same(point) && piece.is_alive) {
          blank = false;
          return blank;
        }
      }
      return blank;
    };

    Chess.prototype.is_enemy_point = function(point) {
      var enemy, piece, _i, _len, _ref;
      enemy = false;
      _ref = this.enemy_pieces();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        piece = _ref[_i];
        if (piece.point.is_same(point)) {
          enemy = true;
          return enemy;
        }
      }
      return enemy;
    };

    Chess.prototype.point = function(x, y) {
      return this.points[x][y];
    };

    Chess.prototype.position = function(x, y) {
      var piece, point, _i, _len, _ref;
      point = this.point(x, y);
      if (this.is_blank_point(point)) {
        return point;
      }
      _ref = this.pieces;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        piece = _ref[_i];
        if (piece.point.is_same(point)) {
          return piece;
        }
      }
    };

    Chess.prototype.fill_points = function() {
      var column_array, row_array, x, y, _base, _i, _j, _k, _l, _len, _len1, _ref, _ref1, _results, _results1;
      column_array = (function() {
        _results = [];
        for (var _i = 0, _ref = this.columns - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
      row_array = (function() {
        _results1 = [];
        for (var _j = 0, _ref1 = this.rows - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; 0 <= _ref1 ? _j++ : _j--){ _results1.push(_j); }
        return _results1;
      }).apply(this);
      for (_k = 0, _len = row_array.length; _k < _len; _k++) {
        y = row_array[_k];
        for (_l = 0, _len1 = column_array.length; _l < _len1; _l++) {
          x = column_array[_l];
          (_base = this.points)[x] || (_base[x] = []);
          this.points[x].push(new Point(x, y));
        }
      }
    };

    Chess.prototype.init = function() {
      this.fill_points();
      this.setupPlayers();
      this.setupPieces();
      this.setupEventListener();
      this.main();
      if (!Game.is_debug) {
        $("#debug_panel").hide();
      }
    };

    Chess.prototype.drawMap = function() {
      var b2_point, b_point, lb_point, left_edge_point, lt_point, rb_point, right_edge_point, rt_point, s11_point, s1_point, s22_point, s2_point, s33_point, s3_point, s44_point, s4_point, t2_point, t_point, x, x2, y, _i, _j, _k;
      lb_point = this.point(0, 0);
      rb_point = this.point(8, 0);
      lt_point = this.point(0, 9);
      rt_point = this.point(8, 9);
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#000000';
      this.ctx.lineWidth = 4;
      this.ctx.moveTo(lb_point.x_in_world(), lb_point.y_in_world());
      this.ctx.lineTo(lt_point.x_in_world(), lt_point.y_in_world());
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(lt_point.x_in_world(), lt_point.y_in_world());
      this.ctx.lineTo(rt_point.x_in_world(), rt_point.y_in_world());
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(rt_point.x_in_world(), rt_point.y_in_world());
      this.ctx.lineTo(rb_point.x_in_world(), rb_point.y_in_world());
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(rb_point.x_in_world(), rb_point.y_in_world());
      this.ctx.lineTo(lb_point.x_in_world(), lb_point.y_in_world());
      this.ctx.stroke();
      this.ctx.strokeStyle = '#BDBDBD';
      this.ctx.lineWidth = 1;
      for (y = _i = 1; _i <= 8; y = ++_i) {
        left_edge_point = this.point(0, y);
        right_edge_point = this.point(8, y);
        this.ctx.beginPath();
        this.ctx.moveTo(left_edge_point.x_in_world(), left_edge_point.y_in_world());
        this.ctx.lineTo(right_edge_point.x_in_world(), right_edge_point.y_in_world());
        this.ctx.stroke();
      }
      for (x = _j = 1; _j <= 7; x = ++_j) {
        b_point = this.point(x, 0);
        t_point = this.point(x, 4);
        this.ctx.beginPath();
        this.ctx.moveTo(b_point.x_in_world(), b_point.y_in_world());
        this.ctx.lineTo(t_point.x_in_world(), t_point.y_in_world());
        this.ctx.stroke();
      }
      for (x2 = _k = 1; _k <= 7; x2 = ++_k) {
        b2_point = this.point(x2, 5);
        t2_point = this.point(x2, 9);
        this.ctx.beginPath();
        this.ctx.moveTo(b2_point.x_in_world(), b2_point.y_in_world());
        this.ctx.lineTo(t2_point.x_in_world(), t2_point.y_in_world());
        this.ctx.stroke();
      }
      s1_point = this.point(3, 0);
      s11_point = this.point(5, 2);
      this.ctx.beginPath();
      this.ctx.moveTo(s1_point.x_in_world(), s1_point.y_in_world());
      this.ctx.lineTo(s11_point.x_in_world(), s11_point.y_in_world());
      this.ctx.stroke();
      s2_point = this.point(5, 0);
      s22_point = this.point(3, 2);
      this.ctx.beginPath();
      this.ctx.moveTo(s2_point.x_in_world(), s2_point.y_in_world());
      this.ctx.lineTo(s22_point.x_in_world(), s22_point.y_in_world());
      this.ctx.stroke();
      s3_point = this.point(3, 7);
      s33_point = this.point(5, 9);
      this.ctx.beginPath();
      this.ctx.moveTo(s3_point.x_in_world(), s3_point.y_in_world());
      this.ctx.lineTo(s33_point.x_in_world(), s33_point.y_in_world());
      this.ctx.stroke();
      s4_point = this.point(5, 7);
      s44_point = this.point(3, 9);
      this.ctx.beginPath();
      this.ctx.moveTo(s4_point.x_in_world(), s4_point.y_in_world());
      this.ctx.lineTo(s44_point.x_in_world(), s44_point.y_in_world());
      this.ctx.stroke();
    };

    Chess.prototype.setupPlayers = function() {
      this.player_red = new Player('red');
      this.player_black = new Player('black');
      this.current_player = this.player_red;
      this.enemy_player = this.player_black;
    };

    Chess.prototype.setupPieces = function() {
      this.pieces.push.apply(this.pieces, this.player_red.spawn_pieces());
      this.pieces.push.apply(this.pieces, this.player_black.spawn_pieces());
      Game.log("Piece count: " + this.pieces.length);
    };

    Chess.prototype.enemy_pieces = function() {
      return this.enemy_player.alive_pieces();
    };

    Chess.prototype.setupEventListener = function() {
      this.canvas_element.addEventListener('mousemove', (function(_this) {
        return function(event) {
          var piece, point, points_in_columns, x, y, _i, _j, _len, _len1, _ref, _ref1, _results;
          x = event.pageX - _this.canvasElemLeft;
          y = event.pageY - _this.canvasElemTop;
          _ref = _this.pieces;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            piece = _ref[_i];
            if (x >= piece.point.x_in_world() - Game.radius && x <= piece.point.x_in_world() + Game.radius && y >= piece.point.y_in_world() - Game.radius && y <= piece.point.y_in_world() + Game.radius) {
              piece.hover();
            } else {
              piece.hout();
            }
          }
          _ref1 = _this.points;
          _results = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            points_in_columns = _ref1[_j];
            _results.push((function() {
              var _k, _len2, _results1;
              _results1 = [];
              for (_k = 0, _len2 = points_in_columns.length; _k < _len2; _k++) {
                point = points_in_columns[_k];
                if (x >= point.x_in_world() - Game.radius && x <= point.x_in_world() + Game.radius && y >= point.y_in_world() - Game.radius && y <= point.y_in_world() + Game.radius) {
                  if (this.is_blank_point(point)) {
                    _results1.push(point.hover());
                  } else {
                    _results1.push(void 0);
                  }
                } else {
                  _results1.push(point.hout());
                }
              }
              return _results1;
            }).call(_this));
          }
          return _results;
        };
      })(this));
      this.canvas_element.addEventListener('click', (function(_this) {
        return function(event) {
          var piece, point, points_in_columns, x, y, _i, _j, _len, _len1, _ref, _ref1, _results;
          x = event.pageX - _this.canvasElemLeft;
          y = event.pageY - _this.canvasElemTop;
          _ref = _this.pieces;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            piece = _ref[_i];
            if (x >= piece.point.x_in_world() - Game.radius && x <= piece.point.x_in_world() + Game.radius && y >= piece.point.y_in_world() - Game.radius && y <= piece.point.y_in_world() + Game.radius) {
              if (piece.color === _this.current_player.color) {
                _this.select_piece(piece);
              } else {
                _this.try_attack_piece(piece);
              }
              Game.log("selected piece:" + piece.name + ", x,y:" + piece.point.x + "," + piece.point.y);
              Game.log("Moveable points " + (piece.moveable_points().length));
              break;
            }
          }
          _ref1 = _this.points;
          _results = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            points_in_columns = _ref1[_j];
            _results.push((function() {
              var _k, _len2, _results1;
              _results1 = [];
              for (_k = 0, _len2 = points_in_columns.length; _k < _len2; _k++) {
                point = points_in_columns[_k];
                if (x >= point.x_in_world() - Game.radius && x <= point.x_in_world() + Game.radius && y >= point.y_in_world() - Game.radius && y <= point.y_in_world() + Game.radius) {
                  this.select_point(point);
                  break;
                } else {
                  _results1.push(void 0);
                }
              }
              return _results1;
            }).call(_this));
          }
          return _results;
        };
      })(this));
    };

    Chess.prototype.reset_moveable_points = function() {
      var point, points_in_columns, _i, _j, _len, _len1, _ref;
      _ref = this.points;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        points_in_columns = _ref[_i];
        for (_j = 0, _len1 = points_in_columns.length; _j < _len1; _j++) {
          point = points_in_columns[_j];
          point.reset_moveable();
        }
      }
    };

    Chess.prototype.try_attack_piece = function(piece) {
      var moveable_points;
      if (this.selected_piece === null) {
        return;
      }
      moveable_points = this.selected_piece.moveable_points();
      if (piece.point.is_in(moveable_points)) {
        console.log('attack it!!!');
        piece.is_alive = false;
        return this.select_point(piece.point);
      }
    };

    Chess.prototype.select_piece = function(piece) {
      var moveable_points, piece2, point, points_in_columns, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      this.selected_point = null;
      piece.is_selected = true;
      this.selected_piece = piece;
      moveable_points = piece.moveable_points();
      Game.log("moveable points:" + moveable_points.length);
      _ref = this.current_player.alive_pieces();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        piece2 = _ref[_i];
        if (piece2 !== piece) {
          piece2.is_selected = false;
        }
      }
      _ref1 = this.points;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        points_in_columns = _ref1[_j];
        for (_k = 0, _len2 = points_in_columns.length; _k < _len2; _k++) {
          point = points_in_columns[_k];
          point.is_selected = false;
          if (point.is_in(moveable_points)) {
            point.mark_moveable();
          } else {
            point.reset_moveable();
          }
        }
      }
    };

    Chess.prototype.cancel_select_piece = function() {
      var piece, _i, _len, _ref, _results;
      if (this.selected_piece) {
        this.selected_piece = null;
        _ref = this.current_player.alive_pieces();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          piece = _ref[_i];
          _results.push(piece.is_selected = false);
        }
        return _results;
      }
    };

    Chess.prototype.select_point = function(point) {
      var moveable_points, point2, points_in_columns, _i, _j, _len, _len1, _ref;
      if (this.is_blank_point(point)) {
        if (this.selected_piece) {
          moveable_points = this.selected_piece.moveable_points();
          if (!point.is_in(moveable_points)) {
            this.cancel_select_piece();
          }
        }
        point.is_selected = true;
        this.selected_point = point;
        _ref = this.points;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          points_in_columns = _ref[_i];
          for (_j = 0, _len1 = points_in_columns.length; _j < _len1; _j++) {
            point2 = points_in_columns[_j];
            if (point2 !== point) {
              point2.is_selected = false;
            }
          }
        }
        this.reset_moveable_points();
      }
    };

    return Chess;

  })();

  $(function() {
    var chess_game;
    chess_game = new Chess();
    window.game = chess_game;
    return chess_game.init();
  });

  $(function() {
    socket.emit('player_login', current_user);
    return socket.on('refresh', function(data) {
      console.log('receive refresh event: ', data);
      return $("#online_count").text(data.online_count);
    });
  });

}).call(this);
