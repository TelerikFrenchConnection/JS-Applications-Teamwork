/* */ 
(function(process) {
  ;
  (function() {
    function require(p) {
      var path = require.resolve(p),
          mod = require.modules[path];
      if (!mod)
        throw new Error('failed to require "' + p + '"');
      if (!mod.exports) {
        mod.exports = {};
        mod.call(mod.exports, mod, mod.exports, require.relative(path));
      }
      return mod.exports;
    }
    require.modules = {};
    require.resolve = function(path) {
      var orig = path,
          reg = path + '.js',
          index = path + '/index.js';
      return require.modules[reg] && reg || require.modules[index] && index || orig;
    };
    require.register = function(path, fn) {
      require.modules[path] = fn;
    };
    require.relative = function(parent) {
      return function(p) {
        if ('.' != p.charAt(0))
          return require(p);
        var path = parent.split('/'),
            segs = p.split('/');
        path.pop();
        for (var i = 0; i < segs.length; i++) {
          var seg = segs[i];
          if ('..' == seg)
            path.pop();
          else if ('.' != seg)
            path.push(seg);
        }
        return require(path.join('/'));
      };
    };
    require.register("browser/debug.js", function(module, exports, require) {
      module.exports = function(type) {
        return function() {};
      };
    });
    require.register("browser/diff.js", function(module, exports, require) {});
    require.register("browser/events.js", function(module, exports, require) {
      exports.EventEmitter = EventEmitter;
      function isArray(obj) {
        return '[object Array]' == {}.toString.call(obj);
      }
      function EventEmitter() {}
      ;
      EventEmitter.prototype.on = function(name, fn) {
        if (!this.$events) {
          this.$events = {};
        }
        if (!this.$events[name]) {
          this.$events[name] = fn;
        } else if (isArray(this.$events[name])) {
          this.$events[name].push(fn);
        } else {
          this.$events[name] = [this.$events[name], fn];
        }
        return this;
      };
      EventEmitter.prototype.addListener = EventEmitter.prototype.on;
      EventEmitter.prototype.once = function(name, fn) {
        var self = this;
        function on() {
          self.removeListener(name, on);
          fn.apply(this, arguments);
        }
        ;
        on.listener = fn;
        this.on(name, on);
        return this;
      };
      EventEmitter.prototype.removeListener = function(name, fn) {
        if (this.$events && this.$events[name]) {
          var list = this.$events[name];
          if (isArray(list)) {
            var pos = -1;
            for (var i = 0,
                l = list.length; i < l; i++) {
              if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
                pos = i;
                break;
              }
            }
            if (pos < 0) {
              return this;
            }
            list.splice(pos, 1);
            if (!list.length) {
              delete this.$events[name];
            }
          } else if (list === fn || (list.listener && list.listener === fn)) {
            delete this.$events[name];
          }
        }
        return this;
      };
      EventEmitter.prototype.removeAllListeners = function(name) {
        if (name === undefined) {
          this.$events = {};
          return this;
        }
        if (this.$events && this.$events[name]) {
          this.$events[name] = null;
        }
        return this;
      };
      EventEmitter.prototype.listeners = function(name) {
        if (!this.$events) {
          this.$events = {};
        }
        if (!this.$events[name]) {
          this.$events[name] = [];
        }
        if (!isArray(this.$events[name])) {
          this.$events[name] = [this.$events[name]];
        }
        return this.$events[name];
      };
      EventEmitter.prototype.emit = function(name) {
        if (!this.$events) {
          return false;
        }
        var handler = this.$events[name];
        if (!handler) {
          return false;
        }
        var args = [].slice.call(arguments, 1);
        if ('function' == typeof handler) {
          handler.apply(this, args);
        } else if (isArray(handler)) {
          var listeners = handler.slice();
          for (var i = 0,
              l = listeners.length; i < l; i++) {
            listeners[i].apply(this, args);
          }
        } else {
          return false;
        }
        return true;
      };
    });
    require.register("browser/fs.js", function(module, exports, require) {});
    require.register("browser/path.js", function(module, exports, require) {});
    require.register("browser/progress.js", function(module, exports, require) {
      module.exports = Progress;
      function Progress() {
        this.percent = 0;
        this.size(0);
        this.fontSize(11);
        this.font('helvetica, arial, sans-serif');
      }
      Progress.prototype.size = function(n) {
        this._size = n;
        return this;
      };
      Progress.prototype.text = function(str) {
        this._text = str;
        return this;
      };
      Progress.prototype.fontSize = function(n) {
        this._fontSize = n;
        return this;
      };
      Progress.prototype.font = function(family) {
        this._font = family;
        return this;
      };
      Progress.prototype.update = function(n) {
        this.percent = n;
        return this;
      };
      Progress.prototype.draw = function(ctx) {
        var percent = Math.min(this.percent, 100),
            size = this._size,
            half = size / 2,
            x = half,
            y = half,
            rad = half - 1,
            fontSize = this._fontSize;
        ctx.font = fontSize + 'px ' + this._font;
        var angle = Math.PI * 2 * (percent / 100);
        ctx.clearRect(0, 0, size, size);
        ctx.strokeStyle = '#9f9f9f';
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, angle, false);
        ctx.stroke();
        ctx.strokeStyle = '#eee';
        ctx.beginPath();
        ctx.arc(x, y, rad - 1, 0, angle, true);
        ctx.stroke();
        var text = this._text || (percent | 0) + '%',
            w = ctx.measureText(text).width;
        ctx.fillText(text, x - w / 2 + 1, y + fontSize / 2 - 1);
        return this;
      };
    });
    require.register("browser/tty.js", function(module, exports, require) {
      exports.isatty = function() {
        return true;
      };
      exports.getWindowSize = function() {
        return [window.innerHeight, window.innerWidth];
      };
    });
    require.register("context.js", function(module, exports, require) {
      module.exports = Context;
      function Context() {}
      Context.prototype.runnable = function(runnable) {
        this._runnable = runnable;
        return this;
      };
      Context.prototype.timeout = function(ms) {
        this._runnable.timeout(ms);
        return this;
      };
      Context.prototype.inspect = function() {
        return JSON.stringify(this, function(key, val) {
          return '_runnable' == key ? undefined : val;
        }, 2);
      };
    });
    require.register("hook.js", function(module, exports, require) {
      var Runnable = require("./runnable");
      module.exports = Hook;
      function Hook(title, fn) {
        Runnable.call(this, title, fn);
        this.type = 'hook';
      }
      Hook.prototype = new Runnable;
      Hook.prototype.constructor = Hook;
    });
    require.register("interfaces/bdd.js", function(module, exports, require) {
      var Suite = require("../suite"),
          Test = require("../test");
      module.exports = function(suite) {
        var suites = [suite];
        suite.on('pre-require', function(context) {
          context.xdescribe = function() {};
          context.xit = function() {};
          context.before = function(fn) {
            suites[0].beforeAll(fn);
          };
          context.after = function(fn) {
            suites[0].afterAll(fn);
          };
          context.beforeEach = function(fn) {
            suites[0].beforeEach(fn);
          };
          context.afterEach = function(fn) {
            suites[0].afterEach(fn);
          };
          context.describe = function(title, fn) {
            var suite = Suite.create(suites[0], title);
            suites.unshift(suite);
            fn();
            suites.shift();
          };
          context.it = function(title, fn) {
            suites[0].addTest(new Test(title, fn));
          };
        });
      };
    });
    require.register("interfaces/exports.js", function(module, exports, require) {
      var Suite = require("../suite"),
          Test = require("../test");
      module.exports = function(suite) {
        var suites = [suite];
        suite.on('require', visit);
        function visit(obj) {
          var suite;
          for (var key in obj) {
            if ('function' == typeof obj[key]) {
              var fn = obj[key];
              switch (key) {
                case 'before':
                  suites[0].beforeAll(fn);
                  break;
                case 'after':
                  suites[0].afterAll(fn);
                  break;
                case 'beforeEach':
                  suites[0].beforeEach(fn);
                  break;
                case 'afterEach':
                  suites[0].afterEach(fn);
                  break;
                default:
                  suites[0].addTest(new Test(key, fn));
              }
            } else {
              var suite = Suite.create(suites[0], key);
              suites.unshift(suite);
              visit(obj[key]);
              suites.shift();
            }
          }
        }
      };
    });
    require.register("interfaces/index.js", function(module, exports, require) {
      exports.bdd = require("./bdd");
      exports.tdd = require("./tdd");
      exports.qunit = require("./qunit");
      exports.exports = require("./exports");
    });
    require.register("interfaces/qunit.js", function(module, exports, require) {
      var Suite = require("../suite"),
          Test = require("../test");
      module.exports = function(suite) {
        var suites = [suite];
        suite.on('pre-require', function(context) {
          context.before = function(fn) {
            suites[0].beforeAll(fn);
          };
          context.after = function(fn) {
            suites[0].afterAll(fn);
          };
          context.beforeEach = function(fn) {
            suites[0].beforeEach(fn);
          };
          context.afterEach = function(fn) {
            suites[0].afterEach(fn);
          };
          context.suite = function(title) {
            if (suites.length > 1)
              suites.shift();
            var suite = Suite.create(suites[0], title);
            suites.unshift(suite);
          };
          context.test = function(title, fn) {
            suites[0].addTest(new Test(title, fn));
          };
        });
      };
    });
    require.register("interfaces/tdd.js", function(module, exports, require) {
      var Suite = require("../suite"),
          Test = require("../test");
      module.exports = function(suite) {
        var suites = [suite];
        suite.on('pre-require', function(context) {
          context.setup = function(fn) {
            suites[0].beforeEach(fn);
          };
          context.teardown = function(fn) {
            suites[0].afterEach(fn);
          };
          context.suiteSetup = function(fn) {
            suites[0].beforeAll(fn);
          };
          context.suiteTeardown = function(fn) {
            suites[0].afterAll(fn);
          };
          context.suite = function(title, fn) {
            var suite = Suite.create(suites[0], title);
            suites.unshift(suite);
            fn();
            suites.shift();
          };
          context.test = function(title, fn) {
            suites[0].addTest(new Test(title, fn));
          };
        });
      };
    });
    require.register("mocha.js", function(module, exports, require) {
      var path = require("browser/path");
      exports = module.exports = Mocha;
      exports.version = '1.0.1';
      exports.utils = require("./utils");
      exports.interfaces = require("./interfaces");
      exports.reporters = require("./reporters");
      exports.Runnable = require("./runnable");
      exports.Context = require("./context");
      exports.Runner = require("./runner");
      exports.Suite = require("./suite");
      exports.Hook = require("./hook");
      exports.Test = require("./test");
      function image(name) {
        return __dirname + '/../images/' + name + '.png';
      }
      function Mocha(options) {
        options = options || {};
        this.files = [];
        this.options = options;
        this.suite = new exports.Suite('', new exports.Context);
        this.ui(options.ui);
        this.reporter(options.reporter);
        if (options.timeout)
          this.suite.timeout(options.timeout);
      }
      Mocha.prototype.addFile = function(file) {
        this.files.push(file);
        return this;
      };
      Mocha.prototype.reporter = function(name) {
        name = name || 'dot';
        this._reporter = require('./reporters/' + name);
        if (!this._reporter)
          throw new Error('invalid reporter "' + name + '"');
        return this;
      };
      Mocha.prototype.ui = function(name) {
        name = name || 'bdd';
        this._ui = exports.interfaces[name];
        if (!this._ui)
          throw new Error('invalid interface "' + name + '"');
        this._ui = this._ui(this.suite);
        return this;
      };
      Mocha.prototype.loadFiles = function() {
        var suite = this.suite;
        this.files.forEach(function(file) {
          file = path.resolve(file);
          suite.emit('pre-require', global, file);
          suite.emit('require', require(file), file);
          suite.emit('post-require', global, file);
        });
      };
      Mocha.prototype.growl = function(runner, reporter) {
        var notify = require("growl");
        runner.on('end', function() {
          var stats = reporter.stats;
          if (stats.failures) {
            var msg = stats.failures + ' of ' + runner.total + ' tests failed';
            notify(msg, {
              title: 'Failed',
              image: image('fail')
            });
          } else {
            notify(stats.passes + ' tests passed in ' + stats.duration + 'ms', {
              title: 'Passed',
              image: image('pass')
            });
          }
        });
      };
      Mocha.prototype.run = function(fn) {
        this.loadFiles();
        var suite = this.suite;
        var options = this.options;
        var runner = new exports.Runner(suite);
        var reporter = new this._reporter(runner);
        runner.ignoreLeaks = options.ignoreLeaks;
        if (options.grep)
          runner.grep(options.grep);
        if (options.globals)
          runner.globals(options.globals);
        if (options.growl)
          this.growl(runner, reporter);
        return runner.run(fn);
      };
    });
    require.register("reporters/base.js", function(module, exports, require) {
      var tty = require("browser/tty"),
          diff = require("browser/diff");
      var isatty = tty.isatty(1) && tty.isatty(2);
      exports = module.exports = Base;
      exports.useColors = isatty;
      exports.colors = {
        'pass': 90,
        'fail': 31,
        'bright pass': 92,
        'bright fail': 91,
        'bright yellow': 93,
        'pending': 36,
        'suite': 0,
        'error title': 0,
        'error message': 31,
        'error stack': 90,
        'checkmark': 32,
        'fast': 90,
        'medium': 33,
        'slow': 31,
        'green': 32,
        'light': 90,
        'diff gutter': 90,
        'diff added': 42,
        'diff removed': 41
      };
      var color = exports.color = function(type, str) {
        if (!exports.useColors)
          return str;
        return '\033[' + exports.colors[type] + 'm' + str + '\033[0m';
      };
      exports.window = {width: isatty ? process.stdout.getWindowSize ? process.stdout.getWindowSize(1)[0] : tty.getWindowSize()[1] : 75};
      exports.cursor = {
        hide: function() {
          process.stdout.write('\033[?25l');
        },
        show: function() {
          process.stdout.write('\033[?25h');
        },
        deleteLine: function() {
          process.stdout.write('\033[2K');
        },
        beginningOfLine: function() {
          process.stdout.write('\033[0G');
        },
        CR: function() {
          exports.cursor.deleteLine();
          exports.cursor.beginningOfLine();
        }
      };
      exports.slow = 75;
      exports.list = function(failures) {
        console.error();
        failures.forEach(function(test, i) {
          var fmt = color('error title', '  %s) %s:\n') + color('error message', '     %s') + color('error stack', '\n%s\n');
          var err = test.err,
              message = err.message || '',
              stack = err.stack || message,
              index = stack.indexOf(message) + message.length,
              msg = stack.slice(0, index),
              actual = err.actual,
              expected = err.expected;
          if ('string' == typeof actual && 'string' == typeof expected) {
            var len = Math.max(actual.length, expected.length);
            if (len < 20)
              msg = errorDiff(err, 'Chars');
            else
              msg = errorDiff(err, 'Words');
            var lines = msg.split('\n');
            if (lines.length > 4) {
              var width = String(lines.length).length;
              msg = lines.map(function(str, i) {
                return pad(++i, width) + ' |' + ' ' + str;
              }).join('\n');
            }
            msg = '\n' + color('diff removed', 'actual') + ' ' + color('diff added', 'expected') + '\n\n' + msg + '\n';
            msg = msg.replace(/^/gm, '      ');
            fmt = color('error title', '  %s) %s:\n%s') + color('error stack', '\n%s\n');
          }
          stack = stack.slice(index ? index + 1 : index).replace(/^/gm, '  ');
          console.error(fmt, (i + 1), test.fullTitle(), msg, stack);
        });
      };
      function Base(runner) {
        var self = this,
            stats = this.stats = {
              suites: 0,
              tests: 0,
              passes: 0,
              failures: 0
            },
            failures = this.failures = [];
        if (!runner)
          return;
        this.runner = runner;
        runner.on('start', function() {
          stats.start = new Date;
        });
        runner.on('suite', function(suite) {
          stats.suites = stats.suites || 0;
          suite.root || stats.suites++;
        });
        runner.on('test end', function(test) {
          stats.tests = stats.tests || 0;
          stats.tests++;
        });
        runner.on('pass', function(test) {
          stats.passes = stats.passes || 0;
          var medium = exports.slow / 2;
          test.speed = test.duration > exports.slow ? 'slow' : test.duration > medium ? 'medium' : 'fast';
          stats.passes++;
        });
        runner.on('fail', function(test, err) {
          stats.failures = stats.failures || 0;
          stats.failures++;
          test.err = err;
          failures.push(test);
        });
        runner.on('end', function() {
          stats.end = new Date;
          stats.duration = new Date - stats.start;
        });
      }
      Base.prototype.epilogue = function() {
        var stats = this.stats,
            fmt;
        console.log();
        if (stats.failures) {
          fmt = color('bright fail', '  ✖') + color('fail', ' %d of %d tests failed') + color('light', ':');
          console.error(fmt, stats.failures, this.runner.total);
          Base.list(this.failures);
          console.error();
          return;
        }
        fmt = color('bright pass', '  ✔') + color('green', ' %d tests complete') + color('light', ' (%dms)');
        console.log(fmt, stats.tests || 0, stats.duration);
        console.log();
      };
      function pad(str, len) {
        str = String(str);
        return Array(len - str.length + 1).join(' ') + str;
      }
      function errorDiff(err, type) {
        return diff['diff' + type](err.actual, err.expected).map(function(str) {
          if (str.added)
            return colorLines('diff added', str.value);
          if (str.removed)
            return colorLines('diff removed', str.value);
          return str.value;
        }).join('');
      }
      function colorLines(name, str) {
        return str.split('\n').map(function(str) {
          return color(name, str);
        }).join('\n');
      }
    });
    require.register("reporters/doc.js", function(module, exports, require) {
      var Base = require("./base"),
          utils = require("../utils");
      exports = module.exports = Doc;
      function Doc(runner) {
        Base.call(this, runner);
        var self = this,
            stats = this.stats,
            total = runner.total,
            indents = 2;
        function indent() {
          return Array(indents).join('  ');
        }
        runner.on('suite', function(suite) {
          if (suite.root)
            return;
          ++indents;
          console.log('%s<section class="suite">', indent());
          ++indents;
          console.log('%s<h1>%s</h1>', indent(), suite.title);
          console.log('%s<dl>', indent());
        });
        runner.on('suite end', function(suite) {
          if (suite.root)
            return;
          console.log('%s</dl>', indent());
          --indents;
          console.log('%s</section>', indent());
          --indents;
        });
        runner.on('pass', function(test) {
          console.log('%s  <dt>%s</dt>', indent(), test.title);
          var code = utils.escape(clean(test.fn.toString()));
          console.log('%s  <dd><pre><code>%s</code></pre></dd>', indent(), code);
        });
      }
      function clean(str) {
        str = str.replace(/^function *\(.*\) *{/, '').replace(/\s+\}$/, '');
        var spaces = str.match(/^\n?( *)/)[1].length,
            re = new RegExp('^ {' + spaces + '}', 'gm');
        str = str.replace(re, '');
        return str;
      }
    });
    require.register("reporters/dot.js", function(module, exports, require) {
      var Base = require("./base"),
          color = Base.color;
      exports = module.exports = Dot;
      function Dot(runner) {
        Base.call(this, runner);
        var self = this,
            stats = this.stats,
            width = Base.window.width * .75 | 0,
            n = 0;
        runner.on('start', function() {
          process.stdout.write('\n  ');
        });
        runner.on('pending', function(test) {
          process.stdout.write(color('pending', '.'));
        });
        runner.on('pass', function(test) {
          if (++n % width == 0)
            process.stdout.write('\n  ');
          if ('slow' == test.speed) {
            process.stdout.write(color('bright yellow', '.'));
          } else {
            process.stdout.write(color(test.speed, '.'));
          }
        });
        runner.on('fail', function(test, err) {
          if (++n % width == 0)
            process.stdout.write('\n  ');
          process.stdout.write(color('fail', '.'));
        });
        runner.on('end', function() {
          console.log();
          self.epilogue();
        });
      }
      Dot.prototype = new Base;
      Dot.prototype.constructor = Dot;
    });
    require.register("reporters/html-cov.js", function(module, exports, require) {
      var JSONCov = require("./json-cov"),
          fs = require("browser/fs");
      exports = module.exports = HTMLCov;
      function HTMLCov(runner) {
        var jade = require("jade"),
            file = __dirname + '/templates/coverage.jade',
            str = fs.readFileSync(file, 'utf8'),
            fn = jade.compile(str, {filename: file}),
            self = this;
        JSONCov.call(this, runner, false);
        runner.on('end', function() {
          process.stdout.write(fn({
            cov: self.cov,
            coverageClass: coverageClass
          }));
        });
      }
      function coverageClass(n) {
        if (n >= 75)
          return 'high';
        if (n >= 50)
          return 'medium';
        if (n >= 25)
          return 'low';
        return 'terrible';
      }
    });
    require.register("reporters/html.js", function(module, exports, require) {
      var Base = require("./base"),
          utils = require("../utils"),
          Progress = require("../browser/progress"),
          escape = utils.escape;
      exports = module.exports = HTML;
      var statsTemplate = '<ul id="stats">' + '<li class="progress"><canvas width="40" height="40"></canvas></li>' + '<li class="passes">passes: <em>0</em></li>' + '<li class="failures">failures: <em>0</em></li>' + '<li class="duration">duration: <em>0</em>s</li>' + '</ul>';
      function HTML(runner) {
        Base.call(this, runner);
        var self = this,
            stats = this.stats,
            total = runner.total,
            root = document.getElementById('mocha'),
            stat = fragment(statsTemplate),
            items = stat.getElementsByTagName('li'),
            passes = items[1].getElementsByTagName('em')[0],
            failures = items[2].getElementsByTagName('em')[0],
            duration = items[3].getElementsByTagName('em')[0],
            canvas = stat.getElementsByTagName('canvas')[0],
            stack = [root],
            progress,
            ctx;
        if (canvas.getContext) {
          ctx = canvas.getContext('2d');
          progress = new Progress;
        }
        if (!root)
          return error('#mocha div missing, add it to your document');
        root.appendChild(stat);
        if (progress)
          progress.size(40);
        runner.on('suite', function(suite) {
          if (suite.root)
            return;
          var el = fragment('<div class="suite"><h1>%s</h1></div>', suite.title);
          stack[0].appendChild(el);
          stack.unshift(document.createElement('div'));
          el.appendChild(stack[0]);
        });
        runner.on('suite end', function(suite) {
          if (suite.root)
            return;
          stack.shift();
        });
        runner.on('fail', function(test, err) {
          if ('hook' == test.type || err.uncaught)
            runner.emit('test end', test);
        });
        runner.on('test end', function(test) {
          var percent = stats.tests / total * 100 | 0;
          if (progress)
            progress.update(percent).draw(ctx);
          var ms = new Date - stats.start;
          text(passes, stats.passes);
          text(failures, stats.failures);
          text(duration, (ms / 1000).toFixed(2));
          if ('passed' == test.state) {
            var el = fragment('<div class="test pass"><h2>%e</h2></div>', test.title);
          } else if (test.pending) {
            var el = fragment('<div class="test pass pending"><h2>%e</h2></div>', test.title);
          } else {
            var el = fragment('<div class="test fail"><h2>%e</h2></div>', test.title);
            var str = test.err.stack || test.err.toString();
            if (!~str.indexOf(test.err.message)) {
              str = test.err.message + '\n' + str;
            }
            if ('[object Error]' == str)
              str = test.err.message;
            if (!test.err.stack && test.err.sourceURL && test.err.line !== undefined) {
              str += "\n(" + test.err.sourceURL + ":" + test.err.line + ")";
            }
            el.appendChild(fragment('<pre class="error">%e</pre>', str));
          }
          var h2 = el.getElementsByTagName('h2')[0];
          on(h2, 'click', function() {
            pre.style.display = 'none' == pre.style.display ? 'block' : 'none';
          });
          if (!test.pending) {
            var pre = fragment('<pre><code>%e</code></pre>', clean(test.fn.toString()));
            el.appendChild(pre);
            pre.style.display = 'none';
          }
          stack[0].appendChild(el);
        });
      }
      function error(msg) {
        document.body.appendChild(fragment('<div id="error">%s</div>', msg));
      }
      function fragment(html) {
        var args = arguments,
            div = document.createElement('div'),
            i = 1;
        div.innerHTML = html.replace(/%([se])/g, function(_, type) {
          switch (type) {
            case 's':
              return String(args[i++]);
            case 'e':
              return escape(args[i++]);
          }
        });
        return div.firstChild;
      }
      function text(el, str) {
        if (el.textContent) {
          el.textContent = str;
        } else {
          el.innerText = str;
        }
      }
      function on(el, event, fn) {
        if (el.addEventListener) {
          el.addEventListener(event, fn, false);
        } else {
          el.attachEvent('on' + event, fn);
        }
      }
      function clean(str) {
        str = str.replace(/^function *\(.*\) *{/, '').replace(/\s+\}$/, '');
        var spaces = str.match(/^\n?( *)/)[1].length,
            re = new RegExp('^ {' + spaces + '}', 'gm');
        str = str.replace(re, '').replace(/^\s+/, '');
        return str;
      }
    });
    require.register("reporters/index.js", function(module, exports, require) {
      exports.Base = require("./base");
      exports.Dot = require("./dot");
      exports.Doc = require("./doc");
      exports.TAP = require("./tap");
      exports.JSON = require("./json");
      exports.HTML = require("./html");
      exports.List = require("./list");
      exports.Min = require("./min");
      exports.Spec = require("./spec");
      exports.Progress = require("./progress");
      exports.Landing = require("./landing");
      exports.JSONCov = require("./json-cov");
      exports.HTMLCov = require("./html-cov");
      exports.JSONStream = require("./json-stream");
      exports.XUnit = require("./xunit");
      exports.Teamcity = require("./teamcity");
    });
    require.register("reporters/json-cov.js", function(module, exports, require) {
      var Base = require("./base");
      exports = module.exports = JSONCov;
      function JSONCov(runner, output) {
        var self = this,
            output = 1 == arguments.length ? true : output;
        Base.call(this, runner);
        var tests = [],
            failures = [],
            passes = [];
        runner.on('test end', function(test) {
          tests.push(test);
        });
        runner.on('pass', function(test) {
          passes.push(test);
        });
        runner.on('fail', function(test) {
          failures.push(test);
        });
        runner.on('end', function() {
          var cov = global._$jscoverage || {};
          var result = self.cov = map(cov);
          result.stats = self.stats;
          result.tests = tests.map(clean);
          result.failures = failures.map(clean);
          result.passes = passes.map(clean);
          if (!output)
            return;
          process.stdout.write(JSON.stringify(result, null, 2));
        });
      }
      function map(cov) {
        var ret = {
          instrumentation: 'node-jscoverage',
          sloc: 0,
          hits: 0,
          misses: 0,
          coverage: 0,
          files: []
        };
        for (var filename in cov) {
          var data = coverage(filename, cov[filename]);
          ret.files.push(data);
          ret.hits += data.hits;
          ret.misses += data.misses;
          ret.sloc += data.sloc;
        }
        if (ret.sloc > 0) {
          ret.coverage = (ret.hits / ret.sloc) * 100;
        }
        return ret;
      }
      ;
      function coverage(filename, data) {
        var ret = {
          filename: filename,
          coverage: 0,
          hits: 0,
          misses: 0,
          sloc: 0,
          source: {}
        };
        data.source.forEach(function(line, num) {
          num++;
          if (data[num] === 0) {
            ret.misses++;
            ret.sloc++;
          } else if (data[num] !== undefined) {
            ret.hits++;
            ret.sloc++;
          }
          ret.source[num] = {
            source: line,
            coverage: data[num] === undefined ? '' : data[num]
          };
        });
        ret.coverage = ret.hits / ret.sloc * 100;
        return ret;
      }
      function clean(test) {
        return {
          title: test.title,
          fullTitle: test.fullTitle(),
          duration: test.duration
        };
      }
    });
    require.register("reporters/json-stream.js", function(module, exports, require) {
      var Base = require("./base"),
          color = Base.color;
      exports = module.exports = List;
      function List(runner) {
        Base.call(this, runner);
        var self = this,
            stats = this.stats,
            total = runner.total;
        runner.on('start', function() {
          console.log(JSON.stringify(['start', {total: total}]));
        });
        runner.on('pass', function(test) {
          console.log(JSON.stringify(['pass', clean(test)]));
        });
        runner.on('fail', function(test, err) {
          console.log(JSON.stringify(['fail', clean(test)]));
        });
        runner.on('end', function() {
          process.stdout.write(JSON.stringify(['end', self.stats]));
        });
      }
      function clean(test) {
        return {
          title: test.title,
          fullTitle: test.fullTitle(),
          duration: test.duration
        };
      }
    });
    require.register("reporters/json.js", function(module, exports, require) {
      var Base = require("./base"),
          cursor = Base.cursor,
          color = Base.color;
      exports = module.exports = JSONReporter;
      function JSONReporter(runner) {
        var self = this;
        Base.call(this, runner);
        var tests = [],
            failures = [],
            passes = [];
        runner.on('test end', function(test) {
          tests.push(test);
        });
        runner.on('pass', function(test) {
          passes.push(test);
        });
        runner.on('fail', function(test) {
          failures.push(test);
        });
        runner.on('end', function() {
          var obj = {
            stats: self.stats,
            tests: tests.map(clean),
            failures: failures.map(clean),
            passes: passes.map(clean)
          };
          process.stdout.write(JSON.stringify(obj, null, 2));
        });
      }
      function clean(test) {
        return {
          title: test.title,
          fullTitle: test.fullTitle(),
          duration: test.duration
        };
      }
    });
    require.register("reporters/landing.js", function(module, exports, require) {
      var Base = require("./base"),
          cursor = Base.cursor,
          color = Base.color;
      exports = module.exports = Landing;
      Base.colors.plane = 0;
      Base.colors['plane crash'] = 31;
      Base.colors.runway = 90;
      function Landing(runner) {
        Base.call(this, runner);
        var self = this,
            stats = this.stats,
            width = Base.window.width * .75 | 0,
            total = runner.total,
            stream = process.stdout,
            plane = color('plane', '✈'),
            crashed = -1,
            n = 0;
        function runway() {
          var buf = Array(width).join('-');
          return '  ' + color('runway', buf);
        }
        runner.on('start', function() {
          stream.write('\n  ');
          cursor.hide();
        });
        runner.on('test end', function(test) {
          var col = -1 == crashed ? width * ++n / total | 0 : crashed;
          if ('failed' == test.state) {
            plane = color('plane crash', '✈');
            crashed = col;
          }
          stream.write('\033[4F\n\n');
          stream.write(runway());
          stream.write('\n  ');
          stream.write(color('runway', Array(col).join('⋅')));
          stream.write(plane);
          stream.write(color('runway', Array(width - col).join('⋅') + '\n'));
          stream.write(runway());
          stream.write('\033[0m');
        });
        runner.on('end', function() {
          cursor.show();
          console.log();
          self.epilogue();
        });
      }
      Landing.prototype = new Base;
      Landing.prototype.constructor = Landing;
    });
    require.register("reporters/list.js", function(module, exports, require) {
      var Base = require("./base"),
          cursor = Base.cursor,
          color = Base.color;
      exports = module.exports = List;
      function List(runner) {
        Base.call(this, runner);
        var self = this,
            stats = this.stats,
            n = 0;
        runner.on('start', function() {
          console.log();
        });
        runner.on('test', function(test) {
          process.stdout.write(color('pass', '    ' + test.fullTitle() + ': '));
        });
        runner.on('pending', function(test) {
          var fmt = color('checkmark', '  -') + color('pending', ' %s');
          console.log(fmt, test.fullTitle());
        });
        runner.on('pass', function(test) {
          var fmt = color('checkmark', '  ✓') + color('pass', ' %s: ') + color(test.speed, '%dms');
          cursor.CR();
          console.log(fmt, test.fullTitle(), test.duration);
        });
        runner.on('fail', function(test, err) {
          cursor.CR();
          console.log(color('fail', '  %d) %s'), ++n, test.fullTitle());
        });
        runner.on('end', self.epilogue.bind(self));
      }
      List.prototype = new Base;
      List.prototype.constructor = List;
    });
    require.register("reporters/markdown.js", function(module, exports, require) {
      var Base = require("./base"),
          utils = require("../utils");
      exports = module.exports = Markdown;
      function Markdown(runner) {
        Base.call(this, runner);
        var self = this,
            stats = this.stats,
            total = runner.total,
            level = 0,
            buf = '';
        function title(str) {
          return Array(level).join('#') + ' ' + str;
        }
        function indent() {
          return Array(level).join('  ');
        }
        function mapTOC(suite, obj) {
          var ret = obj;
          obj = obj[suite.title] = obj[suite.title] || {suite: suite};
          suite.suites.forEach(function(suite) {
            mapTOC(suite, obj);
          });
          return ret;
        }
        function stringifyTOC(obj, level) {
          ++level;
          var buf = '';
          var link;
          for (var key in obj) {
            if ('suite' == key)
              continue;
            if (key)
              link = ' - [' + key + '](#' + utils.slug(obj[key].suite.fullTitle()) + ')\n';
            if (key)
              buf += Array(level).join('  ') + link;
            buf += stringifyTOC(obj[key], level);
          }
          --level;
          return buf;
        }
        function generateTOC(suite) {
          var obj = mapTOC(suite, {});
          return stringifyTOC(obj, 0);
        }
        generateTOC(runner.suite);
        runner.on('suite', function(suite) {
          ++level;
          var slug = utils.slug(suite.fullTitle());
          buf += '<a name="' + slug + '" />' + '\n';
          buf += title(suite.title) + '\n';
        });
        runner.on('suite end', function(suite) {
          --level;
        });
        runner.on('pass', function(test) {
          var code = clean(test.fn.toString());
          buf += test.title + '.\n';
          buf += '\n```js';
          buf += code + '\n';
          buf += '```\n\n';
        });
        runner.on('end', function() {
          process.stdout.write('# TOC\n');
          process.stdout.write(generateTOC(runner.suite));
          process.stdout.write(buf);
        });
      }
      function clean(str) {
        str = str.replace(/^function *\(.*\) *{/, '').replace(/\s+\}$/, '');
        var spaces = str.match(/^\n?( *)/)[1].length,
            re = new RegExp('^ {' + spaces + '}', 'gm');
        str = str.replace(re, '');
        return str;
      }
    });
    require.register("reporters/min.js", function(module, exports, require) {
      var Base = require("./base");
      exports = module.exports = Min;
      function Min(runner) {
        Base.call(this, runner);
        runner.on('start', function() {
          process.stdout.write('\033[2J');
          process.stdout.write('\033[1;3H');
        });
        runner.on('end', this.epilogue.bind(this));
      }
      Min.prototype = new Base;
      Min.prototype.constructor = Min;
    });
    require.register("reporters/progress.js", function(module, exports, require) {
      var Base = require("./base"),
          cursor = Base.cursor,
          color = Base.color;
      exports = module.exports = Progress;
      Base.colors.progress = 90;
      function Progress(runner, options) {
        Base.call(this, runner);
        var self = this,
            options = options || {},
            stats = this.stats,
            width = Base.window.width * .50 | 0,
            total = runner.total,
            complete = 0,
            max = Math.max;
        options.open = options.open || '[';
        options.complete = options.complete || '▬';
        options.incomplete = options.incomplete || '⋅';
        options.close = options.close || ']';
        options.verbose = false;
        runner.on('start', function() {
          console.log();
          cursor.hide();
        });
        runner.on('test end', function() {
          var incomplete = total - complete,
              percent = complete++ / total,
              n = width * percent | 0,
              i = width - n;
          cursor.CR();
          process.stdout.write('\033[J');
          process.stdout.write(color('progress', '  ' + options.open));
          process.stdout.write(Array(n).join(options.complete));
          process.stdout.write(Array(i).join(options.incomplete));
          process.stdout.write(color('progress', options.close));
          if (options.verbose) {
            process.stdout.write(color('progress', ' ' + complete + ' of ' + total));
          }
        });
        runner.on('end', function() {
          cursor.show();
          console.log();
          self.epilogue();
        });
      }
      Progress.prototype = new Base;
      Progress.prototype.constructor = Progress;
    });
    require.register("reporters/spec.js", function(module, exports, require) {
      var Base = require("./base"),
          cursor = Base.cursor,
          color = Base.color;
      exports = module.exports = Spec;
      function Spec(runner) {
        Base.call(this, runner);
        var self = this,
            stats = this.stats,
            indents = 0,
            n = 0;
        function indent() {
          return Array(indents).join('  ');
        }
        runner.on('start', function() {
          console.log();
        });
        runner.on('suite', function(suite) {
          ++indents;
          console.log(color('suite', '%s%s'), indent(), suite.title);
        });
        runner.on('suite end', function(suite) {
          --indents;
          if (1 == indents)
            console.log();
        });
        runner.on('test', function(test) {
          process.stdout.write(indent() + color('pass', '  ◦ ' + test.title + ': '));
        });
        runner.on('pending', function(test) {
          var fmt = indent() + color('pending', '  - %s');
          console.log(fmt, test.title);
        });
        runner.on('pass', function(test) {
          if ('fast' == test.speed) {
            var fmt = indent() + color('checkmark', '  ✓') + color('pass', ' %s ');
            cursor.CR();
            console.log(fmt, test.title);
          } else {
            var fmt = indent() + color('checkmark', '  ✓') + color('pass', ' %s ') + color(test.speed, '(%dms)');
            cursor.CR();
            console.log(fmt, test.title, test.duration);
          }
        });
        runner.on('fail', function(test, err) {
          cursor.CR();
          console.log(indent() + color('fail', '  %d) %s'), ++n, test.title);
        });
        runner.on('end', self.epilogue.bind(self));
      }
      Spec.prototype = new Base;
      Spec.prototype.constructor = Spec;
    });
    require.register("reporters/tap.js", function(module, exports, require) {
      var Base = require("./base"),
          cursor = Base.cursor,
          color = Base.color;
      exports = module.exports = TAP;
      function TAP(runner) {
        Base.call(this, runner);
        var self = this,
            stats = this.stats,
            total = runner.total,
            n = 1;
        runner.on('start', function() {
          console.log('%d..%d', 1, total);
        });
        runner.on('test end', function() {
          ++n;
        });
        runner.on('pending', function(test) {
          console.log('ok %d %s # SKIP -', n, title(test));
        });
        runner.on('pass', function(test) {
          console.log('ok %d %s', n, title(test));
        });
        runner.on('fail', function(test, err) {
          console.log('not ok %d %s', n, title(test));
          console.log(err.stack.replace(/^/gm, '  '));
        });
      }
      function title(test) {
        return test.fullTitle().replace(/#/g, '');
      }
    });
    require.register("reporters/teamcity.js", function(module, exports, require) {
      var Base = require("./base");
      exports = module.exports = Teamcity;
      function Teamcity(runner) {
        Base.call(this, runner);
        var stats = this.stats;
        runner.on('start', function() {
          console.log("##teamcity[testSuiteStarted name='mocha.suite']");
        });
        runner.on('test', function(test) {
          console.log("##teamcity[testStarted name='%s']", escape(test.fullTitle()));
        });
        runner.on('fail', function(test, err) {
          console.log("##teamcity[testFailed name='%s' message='%s']", escape(test.fullTitle()), escape(err.message));
        });
        runner.on('pending', function(test) {
          console.log("##teamcity[testIgnored name='%s' message='pending']", escape(test.fullTitle()));
        });
        runner.on('test end', function(test) {
          console.log("##teamcity[testFinished name='%s' duration='%s']", escape(test.fullTitle()), test.duration);
        });
        runner.on('end', function() {
          console.log("##teamcity[testSuiteFinished name='mocha.suite' duration='%s']", stats.duration);
        });
      }
      function escape(str) {
        return str.replace(/'/g, "|'");
      }
    });
    require.register("reporters/xunit.js", function(module, exports, require) {
      var Base = require("./base"),
          utils = require("../utils"),
          escape = utils.escape;
      exports = module.exports = XUnit;
      function XUnit(runner) {
        Base.call(this, runner);
        var stats = this.stats,
            tests = [],
            self = this;
        runner.on('test end', function(test) {
          tests.push(test);
        });
        runner.on('end', function() {
          console.log(tag('testsuite', {
            name: 'Mocha Tests',
            tests: stats.tests,
            failures: stats.failures,
            errors: stats.failures,
            skip: stats.tests - stats.failures - stats.passes,
            timestamp: (new Date).toUTCString(),
            time: stats.duration / 1000
          }, false));
          tests.forEach(test);
          console.log('</testsuite>');
        });
      }
      XUnit.prototype = new Base;
      XUnit.prototype.constructor = XUnit;
      function test(test) {
        var attrs = {
          classname: test.parent.fullTitle(),
          name: test.title,
          time: test.duration / 1000
        };
        if ('failed' == test.state) {
          var err = test.err;
          attrs.message = escape(err.message);
          console.log(tag('testcase', attrs, false, tag('failure', attrs, false, cdata(err.stack))));
        } else if (test.pending) {
          console.log(tag('testcase', attrs, false, tag('skipped', {}, true)));
        } else {
          console.log(tag('testcase', attrs, true));
        }
      }
      function tag(name, attrs, close, content) {
        var end = close ? '/>' : '>',
            pairs = [],
            tag;
        for (var key in attrs) {
          pairs.push(key + '="' + escape(attrs[key]) + '"');
        }
        tag = '<' + name + (pairs.length ? ' ' + pairs.join(' ') : '') + end;
        if (content)
          tag += content + '</' + name + end;
        return tag;
      }
      function cdata(str) {
        return '<![CDATA[' + escape(str) + ']]>';
      }
    });
    require.register("runnable.js", function(module, exports, require) {
      var EventEmitter = require("browser/events").EventEmitter,
          debug = require("browser/debug")('runnable');
      module.exports = Runnable;
      function Runnable(title, fn) {
        this.title = title;
        this.fn = fn;
        this.async = fn && fn.length;
        this.sync = !this.async;
        this._timeout = 2000;
        this.timedOut = false;
      }
      Runnable.prototype = new EventEmitter;
      Runnable.prototype.constructor = Runnable;
      Runnable.prototype.timeout = function(ms) {
        if (0 == arguments.length)
          return this._timeout;
        debug('timeout %d', ms);
        this._timeout = ms;
        if (this.timer)
          this.resetTimeout();
        return this;
      };
      Runnable.prototype.fullTitle = function() {
        return this.parent.fullTitle() + ' ' + this.title;
      };
      Runnable.prototype.clearTimeout = function() {
        clearTimeout(this.timer);
      };
      Runnable.prototype.resetTimeout = function() {
        var self = this,
            ms = this.timeout();
        this.clearTimeout();
        if (ms) {
          this.timer = setTimeout(function() {
            self.callback(new Error('timeout of ' + ms + 'ms exceeded'));
            self.timedOut = true;
          }, ms);
        }
      };
      Runnable.prototype.run = function(fn) {
        var self = this,
            ms = this.timeout(),
            start = new Date,
            ctx = this.ctx,
            finished,
            emitted;
        if (ctx)
          ctx.runnable(this);
        if (this.async) {
          if (ms) {
            this.timer = setTimeout(function() {
              done(new Error('timeout of ' + ms + 'ms exceeded'));
              self.timedOut = true;
            }, ms);
          }
        }
        function multiple() {
          if (emitted)
            return;
          emitted = true;
          self.emit('error', new Error('done() called multiple times'));
        }
        function done(err) {
          if (self.timedOut)
            return;
          if (finished)
            return multiple();
          self.clearTimeout();
          self.duration = new Date - start;
          finished = true;
          fn(err);
        }
        this.callback = done;
        if (this.async) {
          try {
            this.fn.call(ctx, function(err) {
              if (err instanceof Error)
                return done(err);
              if (null != err)
                return done(new Error('done() invoked with non-Error: ' + err));
              done();
            });
          } catch (err) {
            done(err);
          }
          return;
        }
        try {
          if (!this.pending)
            this.fn.call(ctx);
          this.duration = new Date - start;
          fn();
        } catch (err) {
          fn(err);
        }
      };
    });
    require.register("runner.js", function(module, exports, require) {
      var EventEmitter = require("browser/events").EventEmitter,
          debug = require("browser/debug")('runner'),
          Test = require("./test"),
          utils = require("./utils"),
          noop = function() {};
      module.exports = Runner;
      function Runner(suite) {
        var self = this;
        this._globals = [];
        this.suite = suite;
        this.total = suite.total();
        this.failures = 0;
        this.on('test end', function(test) {
          self.checkGlobals(test);
        });
        this.on('hook end', function(hook) {
          self.checkGlobals(hook);
        });
        this.grep(/.*/);
        this.globals(utils.keys(global).concat(['errno']));
      }
      Runner.prototype = new EventEmitter;
      Runner.prototype.constructor = Runner;
      Runner.prototype.grep = function(re) {
        debug('grep %s', re);
        this._grep = re;
        return this;
      };
      Runner.prototype.globals = function(arr) {
        if (0 == arguments.length)
          return this._globals;
        debug('globals %j', arr);
        utils.forEach(arr, function(arr) {
          this._globals.push(arr);
        }, this);
        return this;
      };
      Runner.prototype.checkGlobals = function(test) {
        if (this.ignoreLeaks)
          return;
        var leaks = utils.filter(utils.keys(global), function(key) {
          return !~utils.indexOf(this._globals, key) && (!global.navigator || 'onerror' !== key);
        }, this);
        this._globals = this._globals.concat(leaks);
        if (leaks.length > 1) {
          this.fail(test, new Error('global leaks detected: ' + leaks.join(', ') + ''));
        } else if (leaks.length) {
          this.fail(test, new Error('global leak detected: ' + leaks[0]));
        }
      };
      Runner.prototype.fail = function(test, err) {
        ++this.failures;
        test.state = 'failed';
        this.emit('fail', test, err);
      };
      Runner.prototype.failHook = function(hook, err) {
        this.fail(hook, err);
        this.emit('end');
      };
      Runner.prototype.hook = function(name, fn) {
        var suite = this.suite,
            hooks = suite['_' + name],
            ms = suite._timeout,
            self = this,
            timer;
        function next(i) {
          var hook = hooks[i];
          if (!hook)
            return fn();
          self.currentRunnable = hook;
          self.emit('hook', hook);
          hook.on('error', function(err) {
            self.failHook(hook, err);
          });
          hook.run(function(err) {
            hook.removeAllListeners('error');
            if (err)
              return self.failHook(hook, err);
            self.emit('hook end', hook);
            next(++i);
          });
        }
        process.nextTick(function() {
          next(0);
        });
      };
      Runner.prototype.hooks = function(name, suites, fn) {
        var self = this,
            orig = this.suite;
        function next(suite) {
          self.suite = suite;
          if (!suite) {
            self.suite = orig;
            return fn();
          }
          self.hook(name, function(err) {
            if (err) {
              self.suite = orig;
              return fn(err);
            }
            next(suites.pop());
          });
        }
        next(suites.pop());
      };
      Runner.prototype.hookUp = function(name, fn) {
        var suites = [this.suite].concat(this.parents()).reverse();
        this.hooks(name, suites, fn);
      };
      Runner.prototype.hookDown = function(name, fn) {
        var suites = [this.suite].concat(this.parents());
        this.hooks(name, suites, fn);
      };
      Runner.prototype.parents = function() {
        var suite = this.suite,
            suites = [];
        while (suite = suite.parent)
          suites.push(suite);
        return suites;
      };
      Runner.prototype.runTest = function(fn) {
        var test = this.test,
            self = this;
        try {
          test.on('error', function(err) {
            self.fail(test, err);
          });
          test.run(fn);
        } catch (err) {
          fn(err);
        }
      };
      Runner.prototype.runTests = function(suite, fn) {
        var self = this,
            tests = suite.tests,
            test;
        function next(err) {
          if (self.failures && suite._bail)
            return fn();
          test = tests.shift();
          if (!test)
            return fn();
          if (!self._grep.test(test.fullTitle()))
            return next();
          if (test.pending) {
            self.emit('pending', test);
            self.emit('test end', test);
            return next();
          }
          self.emit('test', self.test = test);
          self.hookDown('beforeEach', function() {
            self.currentRunnable = self.test;
            self.runTest(function(err) {
              test = self.test;
              if (err) {
                self.fail(test, err);
                self.emit('test end', test);
                return self.hookUp('afterEach', next);
              }
              test.state = 'passed';
              self.emit('pass', test);
              self.emit('test end', test);
              self.hookUp('afterEach', next);
            });
          });
        }
        this.next = next;
        next();
      };
      Runner.prototype.runSuite = function(suite, fn) {
        var self = this,
            i = 0;
        debug('run suite %s', suite.fullTitle());
        this.emit('suite', this.suite = suite);
        function next() {
          var curr = suite.suites[i++];
          if (!curr)
            return done();
          self.runSuite(curr, next);
        }
        function done() {
          self.suite = suite;
          self.hook('afterAll', function() {
            self.emit('suite end', suite);
            fn();
          });
        }
        this.hook('beforeAll', function() {
          self.runTests(suite, next);
        });
      };
      Runner.prototype.uncaught = function(err) {
        debug('uncaught exception');
        var runnable = this.currentRunnable;
        if ('failed' == runnable.state)
          return;
        runnable.clearTimeout();
        err.uncaught = true;
        this.fail(runnable, err);
        if ('test' == runnable.type) {
          this.emit('test end', runnable);
          this.hookUp('afterEach', this.next);
          return;
        }
        this.emit('end');
      };
      Runner.prototype.run = function(fn) {
        var self = this,
            fn = fn || function() {};
        debug('start');
        this.on('end', function() {
          debug('end');
          process.removeListener('uncaughtException', this.uncaught);
          fn(self.failures);
        });
        this.emit('start');
        this.runSuite(this.suite, function() {
          debug('finished running');
          self.emit('end');
        });
        process.on('uncaughtException', function(err) {
          self.uncaught(err);
        });
        return this;
      };
    });
    require.register("suite.js", function(module, exports, require) {
      var EventEmitter = require("browser/events").EventEmitter,
          debug = require("browser/debug")('suite'),
          utils = require("./utils"),
          Hook = require("./hook");
      exports = module.exports = Suite;
      exports.create = function(parent, title) {
        var suite = new Suite(title, parent.ctx);
        suite.parent = parent;
        title = suite.fullTitle();
        parent.addSuite(suite);
        return suite;
      };
      function Suite(title, ctx) {
        this.title = title;
        this.ctx = ctx;
        this.suites = [];
        this.tests = [];
        this._beforeEach = [];
        this._beforeAll = [];
        this._afterEach = [];
        this._afterAll = [];
        this.root = !title;
        this._timeout = 2000;
        this._bail = false;
      }
      Suite.prototype = new EventEmitter;
      Suite.prototype.constructor = Suite;
      Suite.prototype.clone = function() {
        var suite = new Suite(this.title);
        debug('clone');
        suite.ctx = this.ctx;
        suite.timeout(this.timeout());
        suite.bail(this.bail());
        return suite;
      };
      Suite.prototype.timeout = function(ms) {
        if (0 == arguments.length)
          return this._timeout;
        if (String(ms).match(/s$/))
          ms = parseFloat(ms) * 1000;
        debug('timeout %d', ms);
        this._timeout = parseInt(ms, 10);
        return this;
      };
      Suite.prototype.bail = function(bail) {
        if (0 == arguments.length)
          return this._bail;
        debug('bail %s', bail);
        this._bail = bail;
        return this;
      };
      Suite.prototype.beforeAll = function(fn) {
        var hook = new Hook('"before all" hook', fn);
        hook.parent = this;
        hook.timeout(this.timeout());
        hook.ctx = this.ctx;
        this._beforeAll.push(hook);
        this.emit('beforeAll', hook);
        return this;
      };
      Suite.prototype.afterAll = function(fn) {
        var hook = new Hook('"after all" hook', fn);
        hook.parent = this;
        hook.timeout(this.timeout());
        hook.ctx = this.ctx;
        this._afterAll.push(hook);
        this.emit('afterAll', hook);
        return this;
      };
      Suite.prototype.beforeEach = function(fn) {
        var hook = new Hook('"before each" hook', fn);
        hook.parent = this;
        hook.timeout(this.timeout());
        hook.ctx = this.ctx;
        this._beforeEach.push(hook);
        this.emit('beforeEach', hook);
        return this;
      };
      Suite.prototype.afterEach = function(fn) {
        var hook = new Hook('"after each" hook', fn);
        hook.parent = this;
        hook.timeout(this.timeout());
        hook.ctx = this.ctx;
        this._afterEach.push(hook);
        this.emit('afterEach', hook);
        return this;
      };
      Suite.prototype.addSuite = function(suite) {
        suite.parent = this;
        suite.timeout(this.timeout());
        suite.bail(this.bail());
        this.suites.push(suite);
        this.emit('suite', suite);
        return this;
      };
      Suite.prototype.addTest = function(test) {
        test.parent = this;
        test.timeout(this.timeout());
        test.ctx = this.ctx;
        this.tests.push(test);
        this.emit('test', test);
        return this;
      };
      Suite.prototype.fullTitle = function() {
        if (this.parent) {
          var full = this.parent.fullTitle();
          if (full)
            return full + ' ' + this.title;
        }
        return this.title;
      };
      Suite.prototype.total = function() {
        return utils.reduce(this.suites, function(sum, suite) {
          return sum + suite.total();
        }, 0) + this.tests.length;
      };
    });
    require.register("test.js", function(module, exports, require) {
      var Runnable = require("./runnable");
      module.exports = Test;
      function Test(title, fn) {
        Runnable.call(this, title, fn);
        this.pending = !fn;
        this.type = 'test';
      }
      Test.prototype = new Runnable;
      Test.prototype.constructor = Test;
      Test.prototype.inspect = function() {
        return JSON.stringify(this, function(key, val) {
          return '_' == key[0] ? undefined : 'parent' == key ? '#<Suite>' : val;
        }, 2);
      };
    });
    require.register("utils.js", function(module, exports, require) {
      var fs = require("browser/fs"),
          path = require("browser/path"),
          join = path.join,
          debug = require("browser/debug")('watch');
      var ignore = ['node_modules', '.git'];
      exports.escape = function(html) {
        return String(html).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      };
      exports.forEach = function(arr, fn, scope) {
        for (var i = 0,
            l = arr.length; i < l; i++)
          fn.call(scope, arr[i], i);
      };
      exports.indexOf = function(arr, obj, start) {
        for (var i = start || 0,
            l = arr.length; i < l; i++) {
          if (arr[i] === obj)
            return i;
        }
        return -1;
      };
      exports.reduce = function(arr, fn, val, scope) {
        var rval = val;
        for (var i = 0,
            l = arr.length; i < l; i++) {
          rval = fn.call(scope, rval, arr[i], i, arr);
        }
        return rval;
      };
      exports.filter = function(arr, fn, scope) {
        var ret = [];
        for (var i = 0,
            l = arr.length; i < l; i++) {
          var val = arr[i];
          if (fn.call(scope, val, i, arr))
            ret.push(val);
        }
        return ret;
      };
      exports.keys = Object.keys || function(obj) {
        var keys = [],
            has = Object.prototype.hasOwnProperty;
        for (var key in obj) {
          if (has.call(obj, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      exports.watch = function(files, fn) {
        var options = {interval: 100};
        files.forEach(function(file) {
          debug('file %s', file);
          fs.watchFile(file, options, function(curr, prev) {
            if (prev.mtime < curr.mtime)
              fn(file);
          });
        });
      };
      function ignored(path) {
        return !~ignore.indexOf(path);
      }
      exports.files = function(dir, ret) {
        ret = ret || [];
        fs.readdirSync(dir).filter(ignored).forEach(function(path) {
          path = join(dir, path);
          if (fs.statSync(path).isDirectory()) {
            exports.files(path, ret);
          } else if (path.match(/\.(js|coffee)$/)) {
            ret.push(path);
          }
        });
        return ret;
      };
      exports.slug = function(str) {
        return str.toLowerCase().replace(/ +/g, '-').replace(/[^-\w]/g, '');
      };
    });
    process = {};
    process.exit = function(status) {};
    process.stdout = {};
    global = window;
    process.nextTick = (function() {
      if (window.ActiveXObject || !window.postMessage) {
        return function(fn) {
          fn();
        };
      }
      var timeouts = [],
          name = 'mocha-zero-timeout';
      return function(fn) {
        timeouts.push(fn);
        window.postMessage(name, '*');
        window.addEventListener('message', function(e) {
          if (e.source == window && e.data == name) {
            if (e.stopPropagation)
              e.stopPropagation();
            if (timeouts.length)
              timeouts.shift()();
          }
        }, true);
      };
    })();
    process.removeListener = function(e) {
      if ('uncaughtException' == e) {
        window.onerror = null;
      }
    };
    process.on = function(e, fn) {
      if ('uncaughtException' == e) {
        window.onerror = fn;
      }
    };
    window.mocha = require("mocha");
    ;
    (function() {
      var suite = new mocha.Suite('', new mocha.Context),
          utils = mocha.utils,
          options = {};
      function highlight(js) {
        return js.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>').replace(/('.*?')/gm, '<span class="string">$1</span>').replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>').replace(/(\d+)/gm, '<span class="number">$1</span>').replace(/\bnew *(\w+)/gm, '<span class="keyword">new</span> <span class="init">$1</span>').replace(/\b(function|new|throw|return|var|if|else)\b/gm, '<span class="keyword">$1</span>');
      }
      function highlightCode() {
        var code = document.getElementsByTagName('code');
        for (var i = 0,
            len = code.length; i < len; ++i) {
          code[i].innerHTML = highlight(code[i].innerHTML);
        }
      }
      function parse(qs) {
        return utils.reduce(qs.replace('?', '').split('&'), function(obj, pair) {
          var i = pair.indexOf('='),
              key = pair.slice(0, i),
              val = pair.slice(++i);
          obj[key] = decodeURIComponent(val);
          return obj;
        }, {});
      }
      mocha.setup = function(opts) {
        if ('string' === typeof opts)
          options.ui = opts;
        else
          options = opts;
        ui = mocha.interfaces[options.ui];
        if (!ui)
          throw new Error('invalid mocha interface "' + ui + '"');
        if (options.timeout)
          suite.timeout(options.timeout);
        ui(suite);
        suite.emit('pre-require', window);
      };
      mocha.run = function(fn) {
        suite.emit('run');
        var runner = new mocha.Runner(suite);
        var Reporter = options.reporter || mocha.reporters.HTML;
        var reporter = new Reporter(runner);
        var query = parse(window.location.search || "");
        if (query.grep)
          runner.grep(new RegExp(query.grep));
        if (options.ignoreLeaks)
          runner.ignoreLeaks = true;
        if (options.globals)
          runner.globals(options.globals);
        runner.globals(['location']);
        runner.on('end', highlightCode);
        return runner.run(fn);
      };
    })();
  })();
})(require("process"));
