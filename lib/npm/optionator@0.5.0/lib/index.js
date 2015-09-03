/* */ 
(function(process) {
  (function() {
    var VERSION,
        ref$,
        id,
        map,
        compact,
        any,
        groupBy,
        partition,
        chars,
        isItNaN,
        keys,
        Obj,
        camelize,
        deepIs,
        closestString,
        nameToRaw,
        dasherize,
        generateHelp,
        generateHelpForOption,
        parsedTypeCheck,
        parseType,
        parseLevn,
        camelizeKeys,
        parseString,
        main,
        toString$ = {}.toString,
        slice$ = [].slice;
    VERSION = '0.5.0';
    ref$ = require("prelude-ls"), id = ref$.id, map = ref$.map, compact = ref$.compact, any = ref$.any, groupBy = ref$.groupBy, partition = ref$.partition, chars = ref$.chars, isItNaN = ref$.isItNaN, keys = ref$.keys, Obj = ref$.Obj, camelize = ref$.camelize;
    deepIs = require("deep-is");
    ref$ = require("./util"), closestString = ref$.closestString, nameToRaw = ref$.nameToRaw, dasherize = ref$.dasherize;
    ref$ = require("./help"), generateHelp = ref$.generateHelp, generateHelpForOption = ref$.generateHelpForOption;
    ref$ = require("type-check"), parsedTypeCheck = ref$.parsedTypeCheck, parseType = ref$.parseType;
    parseLevn = require("levn").parsedTypeParse;
    camelizeKeys = function(obj) {
      var key,
          value,
          resultObj$ = {};
      for (key in obj) {
        value = obj[key];
        resultObj$[camelize(key)] = value;
      }
      return resultObj$;
    };
    parseString = function(string) {
      var assignOpt,
          regex,
          replaceRegex,
          result;
      assignOpt = '--?[a-zA-Z][-a-z-A-Z0-9]*=';
      regex = RegExp('(?:' + assignOpt + ')?(?:\'(?:\\\\\'|[^\'])+\'|"(?:\\\\"|[^"])+")|[^\'"\\s]+', 'g');
      replaceRegex = RegExp('^(' + assignOpt + ')?[\'"]([\\s\\S]*)[\'"]$');
      result = map(function(it) {
        return it.replace(replaceRegex, '$1$2');
      }, string.match(regex) || []);
      return result;
    };
    main = function(libOptions) {
      var opts,
          defaults,
          required,
          traverse,
          getOption,
          parse;
      opts = {};
      defaults = {};
      required = [];
      if (toString$.call(libOptions.stdout).slice(8, -1) === 'Undefined') {
        libOptions.stdout = process.stdout;
      }
      traverse = function(options) {
        var i$,
            len$,
            option,
            name,
            e,
            parsedPossibilities,
            parsedType,
            j$,
            ref$,
            len1$,
            possibility,
            that,
            rawDependsType,
            dependsOpts,
            dependsType,
            alias,
            shortNames,
            longNames;
        if (toString$.call(options).slice(8, -1) !== 'Array') {
          throw new Error('No options defined.');
        }
        for (i$ = 0, len$ = options.length; i$ < len$; ++i$) {
          option = options[i$];
          if (option.heading == null) {
            name = option.option;
            if (opts[name] != null) {
              throw new Error("Option '" + name + "' already defined.");
            }
            if (option.type === 'Boolean') {
              option.boolean == null && (option.boolean = true);
            }
            if (option.parsedType == null) {
              if (!option.type) {
                throw new Error("No type defined for option '" + name + "'.");
              }
              try {
                option.parsedType = parseType(option.type);
              } catch (e$) {
                e = e$;
                throw new Error("Option '" + name + "': Error parsing type '" + option.type + "': " + e.message);
              }
            }
            if (option['default']) {
              try {
                defaults[name] = parseLevn(option.parsedType, option['default']);
              } catch (e$) {
                e = e$;
                throw new Error("Option '" + name + "': Error parsing default value '" + option['default'] + "' for type '" + option.type + "': " + e.message);
              }
            }
            if (option['enum'] && !option.parsedPossiblities) {
              parsedPossibilities = [];
              parsedType = option.parsedType;
              for (j$ = 0, len1$ = (ref$ = option['enum']).length; j$ < len1$; ++j$) {
                possibility = ref$[j$];
                try {
                  parsedPossibilities.push(parseLevn(parsedType, possibility));
                } catch (e$) {
                  e = e$;
                  throw new Error("Option '" + name + "': Error parsing enum value '" + possibility + "' for type '" + option.type + "': " + e.message);
                }
              }
              option.parsedPossibilities = parsedPossibilities;
            }
            if (that = option.dependsOn) {
              if (that.length) {
                ref$ = [].concat(option.dependsOn), rawDependsType = ref$[0], dependsOpts = slice$.call(ref$, 1);
                dependsType = rawDependsType.toLowerCase();
                if (dependsOpts.length) {
                  if (dependsType === 'and' || dependsType === 'or') {
                    option.dependsOn = [dependsType].concat(slice$.call(dependsOpts));
                  } else {
                    throw new Error("Option '" + name + "': If you have more than one dependency, you must specify either 'and' or 'or'");
                  }
                } else {
                  if ((ref$ = dependsType.toLowerCase()) === 'and' || ref$ === 'or') {
                    option.dependsOn = null;
                  } else {
                    option.dependsOn = ['and', rawDependsType];
                  }
                }
              } else {
                option.dependsOn = null;
              }
            }
            if (option.required) {
              required.push(name);
            }
            opts[name] = option;
            if (option.alias || option.aliases) {
              if (name === 'NUM') {
                throw new Error("-NUM option can't have aliases.");
              }
              if (option.alias) {
                option.aliases == null && (option.aliases = [].concat(option.alias));
              }
              for (j$ = 0, len1$ = (ref$ = option.aliases).length; j$ < len1$; ++j$) {
                alias = ref$[j$];
                if (opts[alias] != null) {
                  throw new Error("Option '" + alias + "' already defined.");
                }
                opts[alias] = option;
              }
              ref$ = partition(fn$, option.aliases), shortNames = ref$[0], longNames = ref$[1];
              option.shortNames == null && (option.shortNames = shortNames);
              option.longNames == null && (option.longNames = longNames);
            }
            if ((!option.aliases || option.shortNames.length === 0) && option.type === 'Boolean' && option['default'] === 'true') {
              option.negateName = true;
            }
          }
        }
        function fn$(it) {
          return it.length === 1;
        }
      };
      traverse(libOptions.options);
      getOption = function(name) {
        var opt,
            possiblyMeant;
        opt = opts[name];
        if (opt == null) {
          possiblyMeant = closestString(keys(opts), name);
          throw new Error("Invalid option '" + nameToRaw(name) + "'" + (possiblyMeant ? " - perhaps you meant '" + nameToRaw(possiblyMeant) + "'?" : '.'));
        }
        return opt;
      };
      parse = function(input, arg$) {
        var slice,
            obj,
            positional,
            restPositional,
            overrideRequired,
            prop,
            setValue,
            setDefaults,
            checkRequired,
            mutuallyExclusiveError,
            checkMutuallyExclusive,
            checkDependency,
            checkDependencies,
            args,
            key,
            value,
            option,
            ref$,
            i$,
            len$,
            arg,
            that,
            result,
            short,
            argName,
            usingAssign,
            val,
            flags,
            len,
            j$,
            len1$,
            i,
            flag,
            opt,
            name,
            negated,
            noedName,
            valPrime;
        slice = (arg$ != null ? arg$ : {}).slice;
        obj = {};
        positional = [];
        restPositional = false;
        overrideRequired = false;
        prop = null;
        setValue = function(name, value) {
          var opt,
              val,
              e,
              currentType;
          opt = getOption(name);
          if (opt.boolean) {
            val = value;
          } else {
            try {
              val = parseLevn(opt.parsedType, value);
            } catch (e$) {
              e = e$;
              throw new Error("Invalid value for option '" + name + "' - expected type " + opt.type + ", received value: " + value + ".");
            }
            if (opt['enum'] && !any(function(it) {
              return deepIs(it, val);
            }, opt.parsedPossibilities)) {
              throw new Error("Option " + name + ": '" + val + "' not in [" + opt['enum'].join(', ') + "].");
            }
          }
          currentType = toString$.call(obj[name]).slice(8, -1);
          if (obj[name] != null) {
            if (libOptions.concatRepeatedArrays && currentType === 'Array') {
              obj[name] = obj[name].concat(val);
            } else if (libOptions.mergeRepeatedObjects && currentType === 'Object') {
              import$(obj[name], val);
            } else {
              obj[name] = val;
            }
          } else {
            obj[name] = val;
          }
          if (opt.restPositional) {
            restPositional = true;
          }
          if (opt.overrideRequired) {
            overrideRequired = true;
          }
        };
        setDefaults = function() {
          var name,
              ref$,
              value;
          for (name in ref$ = defaults) {
            value = ref$[name];
            if (obj[name] == null) {
              obj[name] = value;
            }
          }
        };
        checkRequired = function() {
          var i$,
              ref$,
              len$,
              name;
          if (overrideRequired) {
            return;
          }
          for (i$ = 0, len$ = (ref$ = required).length; i$ < len$; ++i$) {
            name = ref$[i$];
            if (!obj[name]) {
              throw new Error("Option " + nameToRaw(name) + " is required.");
            }
          }
        };
        mutuallyExclusiveError = function(first, second) {
          throw new Error("The options " + nameToRaw(first) + " and " + nameToRaw(second) + " are mutually exclusive - you cannot use them at the same time.");
        };
        checkMutuallyExclusive = function() {
          var rules,
              i$,
              len$,
              rule,
              present,
              j$,
              len1$,
              element,
              k$,
              len2$,
              opt;
          rules = libOptions.mutuallyExclusive;
          if (!rules) {
            return;
          }
          for (i$ = 0, len$ = rules.length; i$ < len$; ++i$) {
            rule = rules[i$];
            present = null;
            for (j$ = 0, len1$ = rule.length; j$ < len1$; ++j$) {
              element = rule[j$];
              if (toString$.call(element).slice(8, -1) === 'Array') {
                for (k$ = 0, len2$ = element.length; k$ < len2$; ++k$) {
                  opt = element[k$];
                  if (opt in obj) {
                    if (present != null) {
                      mutuallyExclusiveError(present, opt);
                    } else {
                      present = opt;
                      break;
                    }
                  }
                }
              } else {
                if (element in obj) {
                  if (present != null) {
                    mutuallyExclusiveError(present, element);
                  } else {
                    present = element;
                  }
                }
              }
            }
          }
        };
        checkDependency = function(option) {
          var dependsOn,
              type,
              targetOptionNames,
              i$,
              len$,
              targetOptionName,
              targetOption;
          dependsOn = option.dependsOn;
          if (!dependsOn || option.dependenciesMet) {
            return true;
          }
          type = dependsOn[0], targetOptionNames = slice$.call(dependsOn, 1);
          for (i$ = 0, len$ = targetOptionNames.length; i$ < len$; ++i$) {
            targetOptionName = targetOptionNames[i$];
            targetOption = obj[targetOptionName];
            if (targetOption && checkDependency(targetOption)) {
              if (type === 'or') {
                return true;
              }
            } else if (type === 'and') {
              throw new Error("The option '" + option.option + "' did not have its dependencies met.");
            }
          }
          if (type === 'and') {
            return true;
          } else {
            throw new Error("The option '" + option.option + "' did not meet any of its dependencies.");
          }
        };
        checkDependencies = function() {
          var name;
          for (name in obj) {
            checkDependency(opts[name]);
          }
        };
        switch (toString$.call(input).slice(8, -1)) {
          case 'String':
            args = parseString(input.slice(slice != null ? slice : 0));
            break;
          case 'Array':
            args = input.slice(slice != null ? slice : 2);
            break;
          case 'Object':
            obj = {};
            for (key in input) {
              value = input[key];
              if (key !== '_') {
                option = getOption(dasherize(key));
                if (parsedTypeCheck(option.parsedType, value)) {
                  obj[option.option] = value;
                } else {
                  throw new Error("Option '" + option.option + "': Invalid type for '" + value + "' - expected type '" + option.type + "'.");
                }
              }
            }
            checkMutuallyExclusive();
            checkDependencies();
            setDefaults();
            checkRequired();
            return ref$ = camelizeKeys(obj), ref$._ = input._ || [], ref$;
          default:
            throw new Error("Invalid argument to 'parse': " + input + ".");
        }
        for (i$ = 0, len$ = args.length; i$ < len$; ++i$) {
          arg = args[i$];
          if (arg === '--') {
            restPositional = true;
          } else if (restPositional) {
            positional.push(arg);
          } else {
            if (that = arg.match(/^(--?)([a-zA-Z][-a-zA-Z0-9]*)(=)?(.*)?$/)) {
              result = that;
              if (prop) {
                throw new Error("Value for '" + prop + "' of type '" + getOption(prop).type + "' required.");
              }
              short = result[1].length === 1;
              argName = result[2];
              usingAssign = result[3] != null;
              val = result[4];
              if (usingAssign && val == null) {
                throw new Error("No value for '" + argName + "' specified.");
              }
              if (short) {
                flags = chars(argName);
                len = flags.length;
                for (j$ = 0, len1$ = flags.length; j$ < len1$; ++j$) {
                  i = j$;
                  flag = flags[j$];
                  opt = getOption(flag);
                  name = opt.option;
                  if (restPositional) {
                    positional.push(flag);
                  } else if (opt.boolean) {
                    setValue(name, true);
                  } else if (i === len - 1) {
                    if (usingAssign) {
                      setValue(name, val);
                    } else {
                      prop = name;
                    }
                  } else {
                    throw new Error("Can't set argument '" + flag + "' when not last flag in a group of short flags.");
                  }
                }
              } else {
                negated = false;
                if (that = argName.match(/^no-(.+)$/)) {
                  negated = true;
                  noedName = that[1];
                  opt = getOption(noedName);
                } else {
                  opt = getOption(argName);
                }
                name = opt.option;
                if (opt.boolean) {
                  valPrime = usingAssign ? parseLevn([{type: 'Boolean'}], val) : true;
                  if (negated) {
                    setValue(name, !valPrime);
                  } else {
                    setValue(name, valPrime);
                  }
                } else {
                  if (negated) {
                    throw new Error("Only use 'no-' prefix for Boolean options, not with '" + noedName + "'.");
                  }
                  if (usingAssign) {
                    setValue(name, val);
                  } else {
                    prop = name;
                  }
                }
              }
            } else if (that = arg.match(/^-([0-9]+(?:\.[0-9]+)?)$/)) {
              opt = opts.NUM;
              if (!opt) {
                throw new Error('No -NUM option defined.');
              }
              setValue(opt.option, that[1]);
            } else {
              if (prop) {
                setValue(prop, arg);
                prop = null;
              } else {
                positional.push(arg);
              }
            }
          }
        }
        checkMutuallyExclusive();
        checkDependencies();
        setDefaults();
        checkRequired();
        return ref$ = camelizeKeys(obj), ref$._ = positional, ref$;
      };
      return {
        parse: parse,
        generateHelp: generateHelp(libOptions),
        generateHelpForOption: generateHelpForOption(getOption, libOptions)
      };
    };
    main.VERSION = VERSION;
    module.exports = main;
    function import$(obj, src) {
      var own = {}.hasOwnProperty;
      for (var key in src)
        if (own.call(src, key))
          obj[key] = src[key];
      return obj;
    }
  }).call(this);
})(require("process"));