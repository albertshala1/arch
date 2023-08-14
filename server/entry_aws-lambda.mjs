var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
import require$$1, { join, basename, extname } from "path";
import { s as setServerPlatform2, r as render, m as manifest } from "./assets/entry.ssr-5fc179d6.mjs";
import { getNotFound } from "./@qwik-city-not-found-paths.js";
import { isStaticPath } from "./@qwik-city-static-paths.js";
import { createReadStream } from "fs";
import require$$0$8, { fileURLToPath } from "url";
import { Http2ServerRequest } from "http2";
import require$$13, { TextEncoderStream as TextEncoderStream$1, TextDecoderStream, WritableStream as WritableStream$1, ReadableStream as ReadableStream$1 } from "stream/web";
import require$$0$1 from "assert";
import require$$4 from "net";
import require$$0$2 from "http";
import require$$0$3 from "stream";
import require$$7 from "buffer";
import require$$0$4 from "util";
import require$$8 from "querystring";
import require$$0$5 from "worker_threads";
import require$$2 from "perf_hooks";
import require$$5 from "util/types";
import require$$0$6 from "events";
import require$$4$1 from "tls";
import require$$4$2 from "async_hooks";
import "console";
import require$$3 from "zlib";
import require$$6 from "string_decoder";
import require$$0$7 from "crypto";
import require$$1$1 from "diagnostics_channel";
import { _ as _deserializeData, a as _serializeData, v as verifySerializable$1, q as qwikCityPlan } from "./assets/@qwik-city-plan-39ca7485.mjs";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var sourceMapSupport = { exports: {} };
var sourceMap = {};
var sourceMapGenerator = {};
var base64Vlq = {};
var base64$1 = {};
var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
base64$1.encode = function(number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};
base64$1.decode = function(charCode) {
  var bigA = 65;
  var bigZ = 90;
  var littleA = 97;
  var littleZ = 122;
  var zero = 48;
  var nine = 57;
  var plus = 43;
  var slash = 47;
  var littleOffset = 26;
  var numberOffset = 52;
  if (bigA <= charCode && charCode <= bigZ) {
    return charCode - bigA;
  }
  if (littleA <= charCode && charCode <= littleZ) {
    return charCode - littleA + littleOffset;
  }
  if (zero <= charCode && charCode <= nine) {
    return charCode - zero + numberOffset;
  }
  if (charCode == plus) {
    return 62;
  }
  if (charCode == slash) {
    return 63;
  }
  return -1;
};
var base64 = base64$1;
var VLQ_BASE_SHIFT = 5;
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
var VLQ_BASE_MASK = VLQ_BASE - 1;
var VLQ_CONTINUATION_BIT = VLQ_BASE;
function toVLQSigned(aValue) {
  return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
}
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative ? -shifted : shifted;
}
base64Vlq.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;
  var vlq = toVLQSigned(aValue);
  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);
  return encoded;
};
base64Vlq.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;
  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }
    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }
    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);
  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};
var util$p = {};
(function(exports) {
  function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) {
      return aArgs[aName];
    } else if (arguments.length === 3) {
      return aDefaultValue;
    } else {
      throw new Error('"' + aName + '" is a required argument.');
    }
  }
  exports.getArg = getArg;
  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
  var dataUrlRegexp = /^data:.+\,.+$/;
  function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    if (!match) {
      return null;
    }
    return {
      scheme: match[1],
      auth: match[2],
      host: match[3],
      port: match[4],
      path: match[5]
    };
  }
  exports.urlParse = urlParse;
  function urlGenerate(aParsedUrl) {
    var url2 = "";
    if (aParsedUrl.scheme) {
      url2 += aParsedUrl.scheme + ":";
    }
    url2 += "//";
    if (aParsedUrl.auth) {
      url2 += aParsedUrl.auth + "@";
    }
    if (aParsedUrl.host) {
      url2 += aParsedUrl.host;
    }
    if (aParsedUrl.port) {
      url2 += ":" + aParsedUrl.port;
    }
    if (aParsedUrl.path) {
      url2 += aParsedUrl.path;
    }
    return url2;
  }
  exports.urlGenerate = urlGenerate;
  function normalize(aPath) {
    var path = aPath;
    var url2 = urlParse(aPath);
    if (url2) {
      if (!url2.path) {
        return aPath;
      }
      path = url2.path;
    }
    var isAbsolute = exports.isAbsolute(path);
    var parts = path.split(/\/+/);
    for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
      part = parts[i];
      if (part === ".") {
        parts.splice(i, 1);
      } else if (part === "..") {
        up++;
      } else if (up > 0) {
        if (part === "") {
          parts.splice(i + 1, up);
          up = 0;
        } else {
          parts.splice(i, 2);
          up--;
        }
      }
    }
    path = parts.join("/");
    if (path === "") {
      path = isAbsolute ? "/" : ".";
    }
    if (url2) {
      url2.path = path;
      return urlGenerate(url2);
    }
    return path;
  }
  exports.normalize = normalize;
  function join2(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }
    if (aPath === "") {
      aPath = ".";
    }
    var aPathUrl = urlParse(aPath);
    var aRootUrl = urlParse(aRoot);
    if (aRootUrl) {
      aRoot = aRootUrl.path || "/";
    }
    if (aPathUrl && !aPathUrl.scheme) {
      if (aRootUrl) {
        aPathUrl.scheme = aRootUrl.scheme;
      }
      return urlGenerate(aPathUrl);
    }
    if (aPathUrl || aPath.match(dataUrlRegexp)) {
      return aPath;
    }
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
      aRootUrl.host = aPath;
      return urlGenerate(aRootUrl);
    }
    var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
    if (aRootUrl) {
      aRootUrl.path = joined;
      return urlGenerate(aRootUrl);
    }
    return joined;
  }
  exports.join = join2;
  exports.isAbsolute = function(aPath) {
    return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
  };
  function relative(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }
    aRoot = aRoot.replace(/\/$/, "");
    var level = 0;
    while (aPath.indexOf(aRoot + "/") !== 0) {
      var index = aRoot.lastIndexOf("/");
      if (index < 0) {
        return aPath;
      }
      aRoot = aRoot.slice(0, index);
      if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
        return aPath;
      }
      ++level;
    }
    return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
  }
  exports.relative = relative;
  var supportsNullProto = function() {
    var obj = /* @__PURE__ */ Object.create(null);
    return !("__proto__" in obj);
  }();
  function identity(s) {
    return s;
  }
  function toSetString(aStr) {
    if (isProtoString(aStr)) {
      return "$" + aStr;
    }
    return aStr;
  }
  exports.toSetString = supportsNullProto ? identity : toSetString;
  function fromSetString(aStr) {
    if (isProtoString(aStr)) {
      return aStr.slice(1);
    }
    return aStr;
  }
  exports.fromSetString = supportsNullProto ? identity : fromSetString;
  function isProtoString(s) {
    if (!s) {
      return false;
    }
    var length = s.length;
    if (length < 9) {
      return false;
    }
    if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
      return false;
    }
    for (var i = length - 10; i >= 0; i--) {
      if (s.charCodeAt(i) !== 36) {
        return false;
      }
    }
    return true;
  }
  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    var cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0 || onlyCompareOriginal) {
      return cmp;
    }
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }
    return strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByOriginalPositions = compareByOriginalPositions;
  function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0 || onlyCompareGenerated) {
      return cmp;
    }
    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) {
      return cmp;
    }
    return strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
  function strcmp(aStr1, aStr2) {
    if (aStr1 === aStr2) {
      return 0;
    }
    if (aStr1 === null) {
      return 1;
    }
    if (aStr2 === null) {
      return -1;
    }
    if (aStr1 > aStr2) {
      return 1;
    }
    return -1;
  }
  function compareByGeneratedPositionsInflated(mappingA, mappingB) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) {
      return cmp;
    }
    return strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
  function parseSourceMapInput(str) {
    return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
  }
  exports.parseSourceMapInput = parseSourceMapInput;
  function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
    sourceURL = sourceURL || "";
    if (sourceRoot) {
      if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
        sourceRoot += "/";
      }
      sourceURL = sourceRoot + sourceURL;
    }
    if (sourceMapURL) {
      var parsed = urlParse(sourceMapURL);
      if (!parsed) {
        throw new Error("sourceMapURL could not be parsed");
      }
      if (parsed.path) {
        var index = parsed.path.lastIndexOf("/");
        if (index >= 0) {
          parsed.path = parsed.path.substring(0, index + 1);
        }
      }
      sourceURL = join2(urlGenerate(parsed), sourceURL);
    }
    return normalize(sourceURL);
  }
  exports.computeSourceURL = computeSourceURL;
})(util$p);
var arraySet = {};
var util$o = util$p;
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";
function ArraySet$2() {
  this._array = [];
  this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
}
ArraySet$2.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet$2();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};
ArraySet$2.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};
ArraySet$2.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util$o.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};
ArraySet$2.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util$o.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};
ArraySet$2.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
      return idx;
    }
  } else {
    var sStr = util$o.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }
  throw new Error('"' + aStr + '" is not in the set.');
};
ArraySet$2.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error("No element indexed by " + aIdx);
};
ArraySet$2.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};
arraySet.ArraySet = ArraySet$2;
var mappingList = {};
var util$n = util$p;
function generatedPositionAfter(mappingA, mappingB) {
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA || util$n.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}
function MappingList$1() {
  this._array = [];
  this._sorted = true;
  this._last = { generatedLine: -1, generatedColumn: 0 };
}
MappingList$1.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
  this._array.forEach(aCallback, aThisArg);
};
MappingList$1.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};
MappingList$1.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util$n.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};
mappingList.MappingList = MappingList$1;
var base64VLQ$1 = base64Vlq;
var util$m = util$p;
var ArraySet$1 = arraySet.ArraySet;
var MappingList = mappingList.MappingList;
function SourceMapGenerator$1(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util$m.getArg(aArgs, "file", null);
  this._sourceRoot = util$m.getArg(aArgs, "sourceRoot", null);
  this._skipValidation = util$m.getArg(aArgs, "skipValidation", false);
  this._sources = new ArraySet$1();
  this._names = new ArraySet$1();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}
SourceMapGenerator$1.prototype._version = 3;
SourceMapGenerator$1.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
  var sourceRoot = aSourceMapConsumer.sourceRoot;
  var generator = new SourceMapGenerator$1({
    file: aSourceMapConsumer.file,
    sourceRoot
  });
  aSourceMapConsumer.eachMapping(function(mapping) {
    var newMapping = {
      generated: {
        line: mapping.generatedLine,
        column: mapping.generatedColumn
      }
    };
    if (mapping.source != null) {
      newMapping.source = mapping.source;
      if (sourceRoot != null) {
        newMapping.source = util$m.relative(sourceRoot, newMapping.source);
      }
      newMapping.original = {
        line: mapping.originalLine,
        column: mapping.originalColumn
      };
      if (mapping.name != null) {
        newMapping.name = mapping.name;
      }
    }
    generator.addMapping(newMapping);
  });
  aSourceMapConsumer.sources.forEach(function(sourceFile) {
    var sourceRelative = sourceFile;
    if (sourceRoot !== null) {
      sourceRelative = util$m.relative(sourceRoot, sourceFile);
    }
    if (!generator._sources.has(sourceRelative)) {
      generator._sources.add(sourceRelative);
    }
    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
    if (content != null) {
      generator.setSourceContent(sourceFile, content);
    }
  });
  return generator;
};
SourceMapGenerator$1.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
  var generated = util$m.getArg(aArgs, "generated");
  var original = util$m.getArg(aArgs, "original", null);
  var source = util$m.getArg(aArgs, "source", null);
  var name = util$m.getArg(aArgs, "name", null);
  if (!this._skipValidation) {
    this._validateMapping(generated, original, source, name);
  }
  if (source != null) {
    source = String(source);
    if (!this._sources.has(source)) {
      this._sources.add(source);
    }
  }
  if (name != null) {
    name = String(name);
    if (!this._names.has(name)) {
      this._names.add(name);
    }
  }
  this._mappings.add({
    generatedLine: generated.line,
    generatedColumn: generated.column,
    originalLine: original != null && original.line,
    originalColumn: original != null && original.column,
    source,
    name
  });
};
SourceMapGenerator$1.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
  var source = aSourceFile;
  if (this._sourceRoot != null) {
    source = util$m.relative(this._sourceRoot, source);
  }
  if (aSourceContent != null) {
    if (!this._sourcesContents) {
      this._sourcesContents = /* @__PURE__ */ Object.create(null);
    }
    this._sourcesContents[util$m.toSetString(source)] = aSourceContent;
  } else if (this._sourcesContents) {
    delete this._sourcesContents[util$m.toSetString(source)];
    if (Object.keys(this._sourcesContents).length === 0) {
      this._sourcesContents = null;
    }
  }
};
SourceMapGenerator$1.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
  var sourceFile = aSourceFile;
  if (aSourceFile == null) {
    if (aSourceMapConsumer.file == null) {
      throw new Error(
        `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
      );
    }
    sourceFile = aSourceMapConsumer.file;
  }
  var sourceRoot = this._sourceRoot;
  if (sourceRoot != null) {
    sourceFile = util$m.relative(sourceRoot, sourceFile);
  }
  var newSources = new ArraySet$1();
  var newNames = new ArraySet$1();
  this._mappings.unsortedForEach(function(mapping) {
    if (mapping.source === sourceFile && mapping.originalLine != null) {
      var original = aSourceMapConsumer.originalPositionFor({
        line: mapping.originalLine,
        column: mapping.originalColumn
      });
      if (original.source != null) {
        mapping.source = original.source;
        if (aSourceMapPath != null) {
          mapping.source = util$m.join(aSourceMapPath, mapping.source);
        }
        if (sourceRoot != null) {
          mapping.source = util$m.relative(sourceRoot, mapping.source);
        }
        mapping.originalLine = original.line;
        mapping.originalColumn = original.column;
        if (original.name != null) {
          mapping.name = original.name;
        }
      }
    }
    var source = mapping.source;
    if (source != null && !newSources.has(source)) {
      newSources.add(source);
    }
    var name = mapping.name;
    if (name != null && !newNames.has(name)) {
      newNames.add(name);
    }
  }, this);
  this._sources = newSources;
  this._names = newNames;
  aSourceMapConsumer.sources.forEach(function(sourceFile2) {
    var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
    if (content != null) {
      if (aSourceMapPath != null) {
        sourceFile2 = util$m.join(aSourceMapPath, sourceFile2);
      }
      if (sourceRoot != null) {
        sourceFile2 = util$m.relative(sourceRoot, sourceFile2);
      }
      this.setSourceContent(sourceFile2, content);
    }
  }, this);
};
SourceMapGenerator$1.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
  if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
    throw new Error(
      "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
    );
  }
  if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
    return;
  } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
    return;
  } else {
    throw new Error("Invalid mapping: " + JSON.stringify({
      generated: aGenerated,
      source: aSource,
      original: aOriginal,
      name: aName
    }));
  }
};
SourceMapGenerator$1.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
  var previousGeneratedColumn = 0;
  var previousGeneratedLine = 1;
  var previousOriginalColumn = 0;
  var previousOriginalLine = 0;
  var previousName = 0;
  var previousSource = 0;
  var result = "";
  var next;
  var mapping;
  var nameIdx;
  var sourceIdx;
  var mappings = this._mappings.toArray();
  for (var i = 0, len = mappings.length; i < len; i++) {
    mapping = mappings[i];
    next = "";
    if (mapping.generatedLine !== previousGeneratedLine) {
      previousGeneratedColumn = 0;
      while (mapping.generatedLine !== previousGeneratedLine) {
        next += ";";
        previousGeneratedLine++;
      }
    } else {
      if (i > 0) {
        if (!util$m.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
          continue;
        }
        next += ",";
      }
    }
    next += base64VLQ$1.encode(mapping.generatedColumn - previousGeneratedColumn);
    previousGeneratedColumn = mapping.generatedColumn;
    if (mapping.source != null) {
      sourceIdx = this._sources.indexOf(mapping.source);
      next += base64VLQ$1.encode(sourceIdx - previousSource);
      previousSource = sourceIdx;
      next += base64VLQ$1.encode(mapping.originalLine - 1 - previousOriginalLine);
      previousOriginalLine = mapping.originalLine - 1;
      next += base64VLQ$1.encode(mapping.originalColumn - previousOriginalColumn);
      previousOriginalColumn = mapping.originalColumn;
      if (mapping.name != null) {
        nameIdx = this._names.indexOf(mapping.name);
        next += base64VLQ$1.encode(nameIdx - previousName);
        previousName = nameIdx;
      }
    }
    result += next;
  }
  return result;
};
SourceMapGenerator$1.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
  return aSources.map(function(source) {
    if (!this._sourcesContents) {
      return null;
    }
    if (aSourceRoot != null) {
      source = util$m.relative(aSourceRoot, source);
    }
    var key = util$m.toSetString(source);
    return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
  }, this);
};
SourceMapGenerator$1.prototype.toJSON = function SourceMapGenerator_toJSON() {
  var map = {
    version: this._version,
    sources: this._sources.toArray(),
    names: this._names.toArray(),
    mappings: this._serializeMappings()
  };
  if (this._file != null) {
    map.file = this._file;
  }
  if (this._sourceRoot != null) {
    map.sourceRoot = this._sourceRoot;
  }
  if (this._sourcesContents) {
    map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
  }
  return map;
};
SourceMapGenerator$1.prototype.toString = function SourceMapGenerator_toString() {
  return JSON.stringify(this.toJSON());
};
sourceMapGenerator.SourceMapGenerator = SourceMapGenerator$1;
var sourceMapConsumer = {};
var binarySearch$1 = {};
(function(exports) {
  exports.GREATEST_LOWER_BOUND = 1;
  exports.LEAST_UPPER_BOUND = 2;
  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    var cmp = aCompare(aNeedle, aHaystack[mid], true);
    if (cmp === 0) {
      return mid;
    } else if (cmp > 0) {
      if (aHigh - mid > 1) {
        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
      }
      if (aBias == exports.LEAST_UPPER_BOUND) {
        return aHigh < aHaystack.length ? aHigh : -1;
      } else {
        return mid;
      }
    } else {
      if (mid - aLow > 1) {
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
      }
      if (aBias == exports.LEAST_UPPER_BOUND) {
        return mid;
      } else {
        return aLow < 0 ? -1 : aLow;
      }
    }
  }
  exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
    if (aHaystack.length === 0) {
      return -1;
    }
    var index = recursiveSearch(
      -1,
      aHaystack.length,
      aNeedle,
      aHaystack,
      aCompare,
      aBias || exports.GREATEST_LOWER_BOUND
    );
    if (index < 0) {
      return -1;
    }
    while (index - 1 >= 0) {
      if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
        break;
      }
      --index;
    }
    return index;
  };
})(binarySearch$1);
var quickSort$1 = {};
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}
function randomIntInRange(low, high) {
  return Math.round(low + Math.random() * (high - low));
}
function doQuickSort(ary, comparator, p, r) {
  if (p < r) {
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;
    swap(ary, pivotIndex, r);
    var pivot = ary[r];
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }
    swap(ary, i + 1, j);
    var q = i + 1;
    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}
quickSort$1.quickSort = function(ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};
var util$l = util$p;
var binarySearch = binarySearch$1;
var ArraySet = arraySet.ArraySet;
var base64VLQ = base64Vlq;
var quickSort = quickSort$1.quickSort;
function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap2 = aSourceMap;
  if (typeof aSourceMap === "string") {
    sourceMap2 = util$l.parseSourceMapInput(aSourceMap);
  }
  return sourceMap2.sections != null ? new IndexedSourceMapConsumer(sourceMap2, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap2, aSourceMapURL);
}
SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};
SourceMapConsumer.prototype._version = 3;
SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
  configurable: true,
  enumerable: true,
  get: function() {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }
    return this.__generatedMappings;
  }
});
SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
  configurable: true,
  enumerable: true,
  get: function() {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }
    return this.__originalMappings;
  }
});
SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
  var c = aStr.charAt(index);
  return c === ";" || c === ",";
};
SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
  throw new Error("Subclasses must implement _parseMappings");
};
SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;
SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;
SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
  var context = aContext || null;
  var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
  var mappings;
  switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
  }
  var sourceRoot = this.sourceRoot;
  mappings.map(function(mapping) {
    var source = mapping.source === null ? null : this._sources.at(mapping.source);
    source = util$l.computeSourceURL(sourceRoot, source, this._sourceMapURL);
    return {
      source,
      generatedLine: mapping.generatedLine,
      generatedColumn: mapping.generatedColumn,
      originalLine: mapping.originalLine,
      originalColumn: mapping.originalColumn,
      name: mapping.name === null ? null : this._names.at(mapping.name)
    };
  }, this).forEach(aCallback, context);
};
SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
  var line = util$l.getArg(aArgs, "line");
  var needle = {
    source: util$l.getArg(aArgs, "source"),
    originalLine: line,
    originalColumn: util$l.getArg(aArgs, "column", 0)
  };
  needle.source = this._findSourceIndex(needle.source);
  if (needle.source < 0) {
    return [];
  }
  var mappings = [];
  var index = this._findMapping(
    needle,
    this._originalMappings,
    "originalLine",
    "originalColumn",
    util$l.compareByOriginalPositions,
    binarySearch.LEAST_UPPER_BOUND
  );
  if (index >= 0) {
    var mapping = this._originalMappings[index];
    if (aArgs.column === void 0) {
      var originalLine = mapping.originalLine;
      while (mapping && mapping.originalLine === originalLine) {
        mappings.push({
          line: util$l.getArg(mapping, "generatedLine", null),
          column: util$l.getArg(mapping, "generatedColumn", null),
          lastColumn: util$l.getArg(mapping, "lastGeneratedColumn", null)
        });
        mapping = this._originalMappings[++index];
      }
    } else {
      var originalColumn = mapping.originalColumn;
      while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
        mappings.push({
          line: util$l.getArg(mapping, "generatedLine", null),
          column: util$l.getArg(mapping, "generatedColumn", null),
          lastColumn: util$l.getArg(mapping, "lastGeneratedColumn", null)
        });
        mapping = this._originalMappings[++index];
      }
    }
  }
  return mappings;
};
sourceMapConsumer.SourceMapConsumer = SourceMapConsumer;
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap2 = aSourceMap;
  if (typeof aSourceMap === "string") {
    sourceMap2 = util$l.parseSourceMapInput(aSourceMap);
  }
  var version = util$l.getArg(sourceMap2, "version");
  var sources = util$l.getArg(sourceMap2, "sources");
  var names = util$l.getArg(sourceMap2, "names", []);
  var sourceRoot = util$l.getArg(sourceMap2, "sourceRoot", null);
  var sourcesContent = util$l.getArg(sourceMap2, "sourcesContent", null);
  var mappings = util$l.getArg(sourceMap2, "mappings");
  var file2 = util$l.getArg(sourceMap2, "file", null);
  if (version != this._version) {
    throw new Error("Unsupported version: " + version);
  }
  if (sourceRoot) {
    sourceRoot = util$l.normalize(sourceRoot);
  }
  sources = sources.map(String).map(util$l.normalize).map(function(source) {
    return sourceRoot && util$l.isAbsolute(sourceRoot) && util$l.isAbsolute(source) ? util$l.relative(sourceRoot, source) : source;
  });
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);
  this._absoluteSources = this._sources.toArray().map(function(s) {
    return util$l.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });
  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file2;
}
BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util$l.relative(this.sourceRoot, relativeSource);
  }
  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }
  return -1;
};
BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
  var smc = Object.create(BasicSourceMapConsumer.prototype);
  var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
  var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
  smc.sourceRoot = aSourceMap._sourceRoot;
  smc.sourcesContent = aSourceMap._generateSourcesContent(
    smc._sources.toArray(),
    smc.sourceRoot
  );
  smc.file = aSourceMap._file;
  smc._sourceMapURL = aSourceMapURL;
  smc._absoluteSources = smc._sources.toArray().map(function(s) {
    return util$l.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
  });
  var generatedMappings = aSourceMap._mappings.toArray().slice();
  var destGeneratedMappings = smc.__generatedMappings = [];
  var destOriginalMappings = smc.__originalMappings = [];
  for (var i = 0, length = generatedMappings.length; i < length; i++) {
    var srcMapping = generatedMappings[i];
    var destMapping = new Mapping();
    destMapping.generatedLine = srcMapping.generatedLine;
    destMapping.generatedColumn = srcMapping.generatedColumn;
    if (srcMapping.source) {
      destMapping.source = sources.indexOf(srcMapping.source);
      destMapping.originalLine = srcMapping.originalLine;
      destMapping.originalColumn = srcMapping.originalColumn;
      if (srcMapping.name) {
        destMapping.name = names.indexOf(srcMapping.name);
      }
      destOriginalMappings.push(destMapping);
    }
    destGeneratedMappings.push(destMapping);
  }
  quickSort(smc.__originalMappings, util$l.compareByOriginalPositions);
  return smc;
};
BasicSourceMapConsumer.prototype._version = 3;
Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
  get: function() {
    return this._absoluteSources.slice();
  }
});
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}
BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings2(aStr, aSourceRoot) {
  var generatedLine = 1;
  var previousGeneratedColumn = 0;
  var previousOriginalLine = 0;
  var previousOriginalColumn = 0;
  var previousSource = 0;
  var previousName = 0;
  var length = aStr.length;
  var index = 0;
  var cachedSegments = {};
  var temp = {};
  var originalMappings = [];
  var generatedMappings = [];
  var mapping, str, segment, end, value;
  while (index < length) {
    if (aStr.charAt(index) === ";") {
      generatedLine++;
      index++;
      previousGeneratedColumn = 0;
    } else if (aStr.charAt(index) === ",") {
      index++;
    } else {
      mapping = new Mapping();
      mapping.generatedLine = generatedLine;
      for (end = index; end < length; end++) {
        if (this._charIsMappingSeparator(aStr, end)) {
          break;
        }
      }
      str = aStr.slice(index, end);
      segment = cachedSegments[str];
      if (segment) {
        index += str.length;
      } else {
        segment = [];
        while (index < end) {
          base64VLQ.decode(aStr, index, temp);
          value = temp.value;
          index = temp.rest;
          segment.push(value);
        }
        if (segment.length === 2) {
          throw new Error("Found a source, but no line and column");
        }
        if (segment.length === 3) {
          throw new Error("Found a source and line, but no column");
        }
        cachedSegments[str] = segment;
      }
      mapping.generatedColumn = previousGeneratedColumn + segment[0];
      previousGeneratedColumn = mapping.generatedColumn;
      if (segment.length > 1) {
        mapping.source = previousSource + segment[1];
        previousSource += segment[1];
        mapping.originalLine = previousOriginalLine + segment[2];
        previousOriginalLine = mapping.originalLine;
        mapping.originalLine += 1;
        mapping.originalColumn = previousOriginalColumn + segment[3];
        previousOriginalColumn = mapping.originalColumn;
        if (segment.length > 4) {
          mapping.name = previousName + segment[4];
          previousName += segment[4];
        }
      }
      generatedMappings.push(mapping);
      if (typeof mapping.originalLine === "number") {
        originalMappings.push(mapping);
      }
    }
  }
  quickSort(generatedMappings, util$l.compareByGeneratedPositionsDeflated);
  this.__generatedMappings = generatedMappings;
  quickSort(originalMappings, util$l.compareByOriginalPositions);
  this.__originalMappings = originalMappings;
};
BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
  if (aNeedle[aLineName] <= 0) {
    throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
  }
  if (aNeedle[aColumnName] < 0) {
    throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
  }
  return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
};
BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
  for (var index = 0; index < this._generatedMappings.length; ++index) {
    var mapping = this._generatedMappings[index];
    if (index + 1 < this._generatedMappings.length) {
      var nextMapping = this._generatedMappings[index + 1];
      if (mapping.generatedLine === nextMapping.generatedLine) {
        mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
        continue;
      }
    }
    mapping.lastGeneratedColumn = Infinity;
  }
};
BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
  var needle = {
    generatedLine: util$l.getArg(aArgs, "line"),
    generatedColumn: util$l.getArg(aArgs, "column")
  };
  var index = this._findMapping(
    needle,
    this._generatedMappings,
    "generatedLine",
    "generatedColumn",
    util$l.compareByGeneratedPositionsDeflated,
    util$l.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
  );
  if (index >= 0) {
    var mapping = this._generatedMappings[index];
    if (mapping.generatedLine === needle.generatedLine) {
      var source = util$l.getArg(mapping, "source", null);
      if (source !== null) {
        source = this._sources.at(source);
        source = util$l.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
      }
      var name = util$l.getArg(mapping, "name", null);
      if (name !== null) {
        name = this._names.at(name);
      }
      return {
        source,
        line: util$l.getArg(mapping, "originalLine", null),
        column: util$l.getArg(mapping, "originalColumn", null),
        name
      };
    }
  }
  return {
    source: null,
    line: null,
    column: null,
    name: null
  };
};
BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
  if (!this.sourcesContent) {
    return false;
  }
  return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
    return sc == null;
  });
};
BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
  if (!this.sourcesContent) {
    return null;
  }
  var index = this._findSourceIndex(aSource);
  if (index >= 0) {
    return this.sourcesContent[index];
  }
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util$l.relative(this.sourceRoot, relativeSource);
  }
  var url2;
  if (this.sourceRoot != null && (url2 = util$l.urlParse(this.sourceRoot))) {
    var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
    if (url2.scheme == "file" && this._sources.has(fileUriAbsPath)) {
      return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
    }
    if ((!url2.path || url2.path == "/") && this._sources.has("/" + relativeSource)) {
      return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
    }
  }
  if (nullOnMissing) {
    return null;
  } else {
    throw new Error('"' + relativeSource + '" is not in the SourceMap.');
  }
};
BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
  var source = util$l.getArg(aArgs, "source");
  source = this._findSourceIndex(source);
  if (source < 0) {
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  }
  var needle = {
    source,
    originalLine: util$l.getArg(aArgs, "line"),
    originalColumn: util$l.getArg(aArgs, "column")
  };
  var index = this._findMapping(
    needle,
    this._originalMappings,
    "originalLine",
    "originalColumn",
    util$l.compareByOriginalPositions,
    util$l.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
  );
  if (index >= 0) {
    var mapping = this._originalMappings[index];
    if (mapping.source === needle.source) {
      return {
        line: util$l.getArg(mapping, "generatedLine", null),
        column: util$l.getArg(mapping, "generatedColumn", null),
        lastColumn: util$l.getArg(mapping, "lastGeneratedColumn", null)
      };
    }
  }
  return {
    line: null,
    column: null,
    lastColumn: null
  };
};
sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap2 = aSourceMap;
  if (typeof aSourceMap === "string") {
    sourceMap2 = util$l.parseSourceMapInput(aSourceMap);
  }
  var version = util$l.getArg(sourceMap2, "version");
  var sections = util$l.getArg(sourceMap2, "sections");
  if (version != this._version) {
    throw new Error("Unsupported version: " + version);
  }
  this._sources = new ArraySet();
  this._names = new ArraySet();
  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function(s) {
    if (s.url) {
      throw new Error("Support for url field in sections not implemented.");
    }
    var offset = util$l.getArg(s, "offset");
    var offsetLine = util$l.getArg(offset, "line");
    var offsetColumn = util$l.getArg(offset, "column");
    if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
      throw new Error("Section offsets must be ordered and non-overlapping.");
    }
    lastOffset = offset;
    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util$l.getArg(s, "map"), aSourceMapURL)
    };
  });
}
IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
IndexedSourceMapConsumer.prototype._version = 3;
Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
  get: function() {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});
IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
  var needle = {
    generatedLine: util$l.getArg(aArgs, "line"),
    generatedColumn: util$l.getArg(aArgs, "column")
  };
  var sectionIndex = binarySearch.search(
    needle,
    this._sections,
    function(needle2, section2) {
      var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
      if (cmp) {
        return cmp;
      }
      return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
    }
  );
  var section = this._sections[sectionIndex];
  if (!section) {
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }
  return section.consumer.originalPositionFor({
    line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
    column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
    bias: aArgs.bias
  });
};
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
  return this._sections.every(function(s) {
    return s.consumer.hasContentsOfAllSources();
  });
};
IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
  for (var i = 0; i < this._sections.length; i++) {
    var section = this._sections[i];
    var content = section.consumer.sourceContentFor(aSource, true);
    if (content) {
      return content;
    }
  }
  if (nullOnMissing) {
    return null;
  } else {
    throw new Error('"' + aSource + '" is not in the SourceMap.');
  }
};
IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
  for (var i = 0; i < this._sections.length; i++) {
    var section = this._sections[i];
    if (section.consumer._findSourceIndex(util$l.getArg(aArgs, "source")) === -1) {
      continue;
    }
    var generatedPosition = section.consumer.generatedPositionFor(aArgs);
    if (generatedPosition) {
      var ret = {
        line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
        column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
      };
      return ret;
    }
  }
  return {
    line: null,
    column: null
  };
};
IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
  this.__generatedMappings = [];
  this.__originalMappings = [];
  for (var i = 0; i < this._sections.length; i++) {
    var section = this._sections[i];
    var sectionMappings = section.consumer._generatedMappings;
    for (var j = 0; j < sectionMappings.length; j++) {
      var mapping = sectionMappings[j];
      var source = section.consumer._sources.at(mapping.source);
      source = util$l.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
      this._sources.add(source);
      source = this._sources.indexOf(source);
      var name = null;
      if (mapping.name) {
        name = section.consumer._names.at(mapping.name);
        this._names.add(name);
        name = this._names.indexOf(name);
      }
      var adjustedMapping = {
        source,
        generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
        generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name
      };
      this.__generatedMappings.push(adjustedMapping);
      if (typeof adjustedMapping.originalLine === "number") {
        this.__originalMappings.push(adjustedMapping);
      }
    }
  }
  quickSort(this.__generatedMappings, util$l.compareByGeneratedPositionsDeflated);
  quickSort(this.__originalMappings, util$l.compareByOriginalPositions);
};
sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
var sourceNode = {};
var SourceMapGenerator = sourceMapGenerator.SourceMapGenerator;
var util$k = util$p;
var REGEX_NEWLINE = /(\r?\n)/;
var NEWLINE_CODE = 10;
var isSourceNode = "$$$isSourceNode$$$";
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null)
    this.add(aChunks);
}
SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
  var node = new SourceNode();
  var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
  var remainingLinesIndex = 0;
  var shiftNextLine = function() {
    var lineContents = getNextLine();
    var newLine = getNextLine() || "";
    return lineContents + newLine;
    function getNextLine() {
      return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
    }
  };
  var lastGeneratedLine = 1, lastGeneratedColumn = 0;
  var lastMapping = null;
  aSourceMapConsumer.eachMapping(function(mapping) {
    if (lastMapping !== null) {
      if (lastGeneratedLine < mapping.generatedLine) {
        addMappingWithCode(lastMapping, shiftNextLine());
        lastGeneratedLine++;
        lastGeneratedColumn = 0;
      } else {
        var nextLine = remainingLines[remainingLinesIndex] || "";
        var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
        addMappingWithCode(lastMapping, code);
        lastMapping = mapping;
        return;
      }
    }
    while (lastGeneratedLine < mapping.generatedLine) {
      node.add(shiftNextLine());
      lastGeneratedLine++;
    }
    if (lastGeneratedColumn < mapping.generatedColumn) {
      var nextLine = remainingLines[remainingLinesIndex] || "";
      node.add(nextLine.substr(0, mapping.generatedColumn));
      remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
      lastGeneratedColumn = mapping.generatedColumn;
    }
    lastMapping = mapping;
  }, this);
  if (remainingLinesIndex < remainingLines.length) {
    if (lastMapping) {
      addMappingWithCode(lastMapping, shiftNextLine());
    }
    node.add(remainingLines.splice(remainingLinesIndex).join(""));
  }
  aSourceMapConsumer.sources.forEach(function(sourceFile) {
    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
    if (content != null) {
      if (aRelativePath != null) {
        sourceFile = util$k.join(aRelativePath, sourceFile);
      }
      node.setSourceContent(sourceFile, content);
    }
  });
  return node;
  function addMappingWithCode(mapping, code) {
    if (mapping === null || mapping.source === void 0) {
      node.add(code);
    } else {
      var source = aRelativePath ? util$k.join(aRelativePath, mapping.source) : mapping.source;
      node.add(new SourceNode(
        mapping.originalLine,
        mapping.originalColumn,
        source,
        code,
        mapping.name
      ));
    }
  }
};
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function(chunk) {
      this.add(chunk);
    }, this);
  } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  } else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length - 1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  } else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    } else {
      if (chunk !== "") {
        aFn(chunk, {
          source: this.source,
          line: this.line,
          column: this.column,
          name: this.name
        });
      }
    }
  }
};
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len - 1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  } else if (typeof lastChild === "string") {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  } else {
    this.children.push("".replace(aPattern, aReplacement));
  }
  return this;
};
SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
  this.sourceContents[util$k.toSetString(aSourceFile)] = aSourceContent;
};
SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
  for (var i = 0, len = this.children.length; i < len; i++) {
    if (this.children[i][isSourceNode]) {
      this.children[i].walkSourceContents(aFn);
    }
  }
  var sources = Object.keys(this.sourceContents);
  for (var i = 0, len = sources.length; i < len; i++) {
    aFn(util$k.fromSetString(sources[i]), this.sourceContents[sources[i]]);
  }
};
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function(chunk) {
    str += chunk;
  });
  return str;
};
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function(chunk, original) {
    generated.code += chunk;
    if (original.source !== null && original.line !== null && original.column !== null) {
      if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function(sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });
  return { code: generated.code, map };
};
sourceNode.SourceNode = SourceNode;
sourceMap.SourceMapGenerator = sourceMapGenerator.SourceMapGenerator;
sourceMap.SourceMapConsumer = sourceMapConsumer.SourceMapConsumer;
sourceMap.SourceNode = sourceNode.SourceNode;
var toString = Object.prototype.toString;
var isModern = typeof Buffer !== "undefined" && typeof Buffer.alloc === "function" && typeof Buffer.allocUnsafe === "function" && typeof Buffer.from === "function";
function isArrayBuffer(input) {
  return toString.call(input).slice(8, -1) === "ArrayBuffer";
}
function fromArrayBuffer(obj, byteOffset, length) {
  byteOffset >>>= 0;
  var maxLength = obj.byteLength - byteOffset;
  if (maxLength < 0) {
    throw new RangeError("'offset' is out of bounds");
  }
  if (length === void 0) {
    length = maxLength;
  } else {
    length >>>= 0;
    if (length > maxLength) {
      throw new RangeError("'length' is out of bounds");
    }
  }
  return isModern ? Buffer.from(obj.slice(byteOffset, byteOffset + length)) : new Buffer(new Uint8Array(obj.slice(byteOffset, byteOffset + length)));
}
function fromString(string, encoding2) {
  if (typeof encoding2 !== "string" || encoding2 === "") {
    encoding2 = "utf8";
  }
  if (!Buffer.isEncoding(encoding2)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }
  return isModern ? Buffer.from(string, encoding2) : new Buffer(string, encoding2);
}
function bufferFrom(value, encodingOrOffset, length) {
  if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }
  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length);
  }
  if (typeof value === "string") {
    return fromString(value, encodingOrOffset);
  }
  return isModern ? Buffer.from(value) : new Buffer(value);
}
var bufferFrom_1 = bufferFrom;
sourceMapSupport.exports;
(function(module, exports) {
  var SourceMapConsumer2 = sourceMap.SourceMapConsumer;
  var path = require$$1;
  var fs;
  try {
    fs = require("fs");
    if (!fs.existsSync || !fs.readFileSync) {
      fs = null;
    }
  } catch (err) {
  }
  var bufferFrom2 = bufferFrom_1;
  function dynamicRequire(mod, request2) {
    return mod.require(request2);
  }
  var errorFormatterInstalled = false;
  var uncaughtShimInstalled = false;
  var emptyCacheBetweenOperations = false;
  var environment = "auto";
  var fileContentsCache = {};
  var sourceMapCache = {};
  var reSourceMap = /^data:application\/json[^,]+base64,/;
  var retrieveFileHandlers = [];
  var retrieveMapHandlers = [];
  function isInBrowser() {
    if (environment === "browser")
      return true;
    if (environment === "node")
      return false;
    return typeof window !== "undefined" && typeof XMLHttpRequest === "function" && !(window.require && window.module && window.process && window.process.type === "renderer");
  }
  function hasGlobalProcessEventEmitter() {
    return typeof process === "object" && process !== null && typeof process.on === "function";
  }
  function globalProcessVersion() {
    if (typeof process === "object" && process !== null) {
      return process.version;
    } else {
      return "";
    }
  }
  function globalProcessStderr() {
    if (typeof process === "object" && process !== null) {
      return process.stderr;
    }
  }
  function globalProcessExit(code) {
    if (typeof process === "object" && process !== null && typeof process.exit === "function") {
      return process.exit(code);
    }
  }
  function handlerExec(list) {
    return function(arg) {
      for (var i = 0; i < list.length; i++) {
        var ret = list[i](arg);
        if (ret) {
          return ret;
        }
      }
      return null;
    };
  }
  var retrieveFile = handlerExec(retrieveFileHandlers);
  retrieveFileHandlers.push(function(path2) {
    path2 = path2.trim();
    if (/^file:/.test(path2)) {
      path2 = path2.replace(/file:\/\/\/(\w:)?/, function(protocol, drive) {
        return drive ? "" : (
          // file:///C:/dir/file -> C:/dir/file
          "/"
        );
      });
    }
    if (path2 in fileContentsCache) {
      return fileContentsCache[path2];
    }
    var contents = "";
    try {
      if (!fs) {
        var xhr = new XMLHttpRequest();
        xhr.open(
          "GET",
          path2,
          /** async */
          false
        );
        xhr.send(null);
        if (xhr.readyState === 4 && xhr.status === 200) {
          contents = xhr.responseText;
        }
      } else if (fs.existsSync(path2)) {
        contents = fs.readFileSync(path2, "utf8");
      }
    } catch (er) {
    }
    return fileContentsCache[path2] = contents;
  });
  function supportRelativeURL(file2, url2) {
    if (!file2)
      return url2;
    var dir = path.dirname(file2);
    var match = /^\w+:\/\/[^\/]*/.exec(dir);
    var protocol = match ? match[0] : "";
    var startPath = dir.slice(protocol.length);
    if (protocol && /^\/\w\:/.test(startPath)) {
      protocol += "/";
      return protocol + path.resolve(dir.slice(protocol.length), url2).replace(/\\/g, "/");
    }
    return protocol + path.resolve(dir.slice(protocol.length), url2);
  }
  function retrieveSourceMapURL(source) {
    var fileData;
    if (isInBrowser()) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", source, false);
        xhr.send(null);
        fileData = xhr.readyState === 4 ? xhr.responseText : null;
        var sourceMapHeader = xhr.getResponseHeader("SourceMap") || xhr.getResponseHeader("X-SourceMap");
        if (sourceMapHeader) {
          return sourceMapHeader;
        }
      } catch (e) {
      }
    }
    fileData = retrieveFile(source);
    var re = /(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/mg;
    var lastMatch, match;
    while (match = re.exec(fileData))
      lastMatch = match;
    if (!lastMatch)
      return null;
    return lastMatch[1];
  }
  var retrieveSourceMap = handlerExec(retrieveMapHandlers);
  retrieveMapHandlers.push(function(source) {
    var sourceMappingURL = retrieveSourceMapURL(source);
    if (!sourceMappingURL)
      return null;
    var sourceMapData;
    if (reSourceMap.test(sourceMappingURL)) {
      var rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(",") + 1);
      sourceMapData = bufferFrom2(rawData, "base64").toString();
      sourceMappingURL = source;
    } else {
      sourceMappingURL = supportRelativeURL(source, sourceMappingURL);
      sourceMapData = retrieveFile(sourceMappingURL);
    }
    if (!sourceMapData) {
      return null;
    }
    return {
      url: sourceMappingURL,
      map: sourceMapData
    };
  });
  function mapSourcePosition(position) {
    var sourceMap2 = sourceMapCache[position.source];
    if (!sourceMap2) {
      var urlAndMap = retrieveSourceMap(position.source);
      if (urlAndMap) {
        sourceMap2 = sourceMapCache[position.source] = {
          url: urlAndMap.url,
          map: new SourceMapConsumer2(urlAndMap.map)
        };
        if (sourceMap2.map.sourcesContent) {
          sourceMap2.map.sources.forEach(function(source, i) {
            var contents = sourceMap2.map.sourcesContent[i];
            if (contents) {
              var url2 = supportRelativeURL(sourceMap2.url, source);
              fileContentsCache[url2] = contents;
            }
          });
        }
      } else {
        sourceMap2 = sourceMapCache[position.source] = {
          url: null,
          map: null
        };
      }
    }
    if (sourceMap2 && sourceMap2.map && typeof sourceMap2.map.originalPositionFor === "function") {
      var originalPosition = sourceMap2.map.originalPositionFor(position);
      if (originalPosition.source !== null) {
        originalPosition.source = supportRelativeURL(
          sourceMap2.url,
          originalPosition.source
        );
        return originalPosition;
      }
    }
    return position;
  }
  function mapEvalOrigin(origin) {
    var match = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(origin);
    if (match) {
      var position = mapSourcePosition({
        source: match[2],
        line: +match[3],
        column: match[4] - 1
      });
      return "eval at " + match[1] + " (" + position.source + ":" + position.line + ":" + (position.column + 1) + ")";
    }
    match = /^eval at ([^(]+) \((.+)\)$/.exec(origin);
    if (match) {
      return "eval at " + match[1] + " (" + mapEvalOrigin(match[2]) + ")";
    }
    return origin;
  }
  function CallSiteToString() {
    var fileName;
    var fileLocation = "";
    if (this.isNative()) {
      fileLocation = "native";
    } else {
      fileName = this.getScriptNameOrSourceURL();
      if (!fileName && this.isEval()) {
        fileLocation = this.getEvalOrigin();
        fileLocation += ", ";
      }
      if (fileName) {
        fileLocation += fileName;
      } else {
        fileLocation += "<anonymous>";
      }
      var lineNumber = this.getLineNumber();
      if (lineNumber != null) {
        fileLocation += ":" + lineNumber;
        var columnNumber = this.getColumnNumber();
        if (columnNumber) {
          fileLocation += ":" + columnNumber;
        }
      }
    }
    var line = "";
    var functionName = this.getFunctionName();
    var addSuffix = true;
    var isConstructor = this.isConstructor();
    var isMethodCall = !(this.isToplevel() || isConstructor);
    if (isMethodCall) {
      var typeName = this.getTypeName();
      if (typeName === "[object Object]") {
        typeName = "null";
      }
      var methodName = this.getMethodName();
      if (functionName) {
        if (typeName && functionName.indexOf(typeName) != 0) {
          line += typeName + ".";
        }
        line += functionName;
        if (methodName && functionName.indexOf("." + methodName) != functionName.length - methodName.length - 1) {
          line += " [as " + methodName + "]";
        }
      } else {
        line += typeName + "." + (methodName || "<anonymous>");
      }
    } else if (isConstructor) {
      line += "new " + (functionName || "<anonymous>");
    } else if (functionName) {
      line += functionName;
    } else {
      line += fileLocation;
      addSuffix = false;
    }
    if (addSuffix) {
      line += " (" + fileLocation + ")";
    }
    return line;
  }
  function cloneCallSite(frame2) {
    var object = {};
    Object.getOwnPropertyNames(Object.getPrototypeOf(frame2)).forEach(function(name) {
      object[name] = /^(?:is|get)/.test(name) ? function() {
        return frame2[name].call(frame2);
      } : frame2[name];
    });
    object.toString = CallSiteToString;
    return object;
  }
  function wrapCallSite(frame2, state) {
    if (state === void 0) {
      state = { nextPosition: null, curPosition: null };
    }
    if (frame2.isNative()) {
      state.curPosition = null;
      return frame2;
    }
    var source = frame2.getFileName() || frame2.getScriptNameOrSourceURL();
    if (source) {
      var line = frame2.getLineNumber();
      var column = frame2.getColumnNumber() - 1;
      var noHeader = /^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/;
      var headerLength = noHeader.test(globalProcessVersion()) ? 0 : 62;
      if (line === 1 && column > headerLength && !isInBrowser() && !frame2.isEval()) {
        column -= headerLength;
      }
      var position = mapSourcePosition({
        source,
        line,
        column
      });
      state.curPosition = position;
      frame2 = cloneCallSite(frame2);
      var originalFunctionName = frame2.getFunctionName;
      frame2.getFunctionName = function() {
        if (state.nextPosition == null) {
          return originalFunctionName();
        }
        return state.nextPosition.name || originalFunctionName();
      };
      frame2.getFileName = function() {
        return position.source;
      };
      frame2.getLineNumber = function() {
        return position.line;
      };
      frame2.getColumnNumber = function() {
        return position.column + 1;
      };
      frame2.getScriptNameOrSourceURL = function() {
        return position.source;
      };
      return frame2;
    }
    var origin = frame2.isEval() && frame2.getEvalOrigin();
    if (origin) {
      origin = mapEvalOrigin(origin);
      frame2 = cloneCallSite(frame2);
      frame2.getEvalOrigin = function() {
        return origin;
      };
      return frame2;
    }
    return frame2;
  }
  function prepareStackTrace(error, stack) {
    if (emptyCacheBetweenOperations) {
      fileContentsCache = {};
      sourceMapCache = {};
    }
    var name = error.name || "Error";
    var message = error.message || "";
    var errorString = name + ": " + message;
    var state = { nextPosition: null, curPosition: null };
    var processedStack = [];
    for (var i = stack.length - 1; i >= 0; i--) {
      processedStack.push("\n    at " + wrapCallSite(stack[i], state));
      state.nextPosition = state.curPosition;
    }
    state.curPosition = state.nextPosition = null;
    return errorString + processedStack.reverse().join("");
  }
  function getErrorSource(error) {
    var match = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(error.stack);
    if (match) {
      var source = match[1];
      var line = +match[2];
      var column = +match[3];
      var contents = fileContentsCache[source];
      if (!contents && fs && fs.existsSync(source)) {
        try {
          contents = fs.readFileSync(source, "utf8");
        } catch (er) {
          contents = "";
        }
      }
      if (contents) {
        var code = contents.split(/(?:\r\n|\r|\n)/)[line - 1];
        if (code) {
          return source + ":" + line + "\n" + code + "\n" + new Array(column).join(" ") + "^";
        }
      }
    }
    return null;
  }
  function printErrorAndExit(error) {
    var source = getErrorSource(error);
    var stderr = globalProcessStderr();
    if (stderr && stderr._handle && stderr._handle.setBlocking) {
      stderr._handle.setBlocking(true);
    }
    if (source) {
      console.error();
      console.error(source);
    }
    console.error(error.stack);
    globalProcessExit(1);
  }
  function shimEmitUncaughtException() {
    var origEmit = process.emit;
    process.emit = function(type) {
      if (type === "uncaughtException") {
        var hasStack = arguments[1] && arguments[1].stack;
        var hasListeners = this.listeners(type).length > 0;
        if (hasStack && !hasListeners) {
          return printErrorAndExit(arguments[1]);
        }
      }
      return origEmit.apply(this, arguments);
    };
  }
  var originalRetrieveFileHandlers = retrieveFileHandlers.slice(0);
  var originalRetrieveMapHandlers = retrieveMapHandlers.slice(0);
  exports.wrapCallSite = wrapCallSite;
  exports.getErrorSource = getErrorSource;
  exports.mapSourcePosition = mapSourcePosition;
  exports.retrieveSourceMap = retrieveSourceMap;
  exports.install = function(options) {
    options = options || {};
    if (options.environment) {
      environment = options.environment;
      if (["node", "browser", "auto"].indexOf(environment) === -1) {
        throw new Error("environment " + environment + " was unknown. Available options are {auto, browser, node}");
      }
    }
    if (options.retrieveFile) {
      if (options.overrideRetrieveFile) {
        retrieveFileHandlers.length = 0;
      }
      retrieveFileHandlers.unshift(options.retrieveFile);
    }
    if (options.retrieveSourceMap) {
      if (options.overrideRetrieveSourceMap) {
        retrieveMapHandlers.length = 0;
      }
      retrieveMapHandlers.unshift(options.retrieveSourceMap);
    }
    if (options.hookRequire && !isInBrowser()) {
      var Module = dynamicRequire(module, "module");
      var $compile = Module.prototype._compile;
      if (!$compile.__sourceMapSupport) {
        Module.prototype._compile = function(content, filename) {
          fileContentsCache[filename] = content;
          sourceMapCache[filename] = void 0;
          return $compile.call(this, content, filename);
        };
        Module.prototype._compile.__sourceMapSupport = true;
      }
    }
    if (!emptyCacheBetweenOperations) {
      emptyCacheBetweenOperations = "emptyCacheBetweenOperations" in options ? options.emptyCacheBetweenOperations : false;
    }
    if (!errorFormatterInstalled) {
      errorFormatterInstalled = true;
      Error.prepareStackTrace = prepareStackTrace;
    }
    if (!uncaughtShimInstalled) {
      var installHandler = "handleUncaughtExceptions" in options ? options.handleUncaughtExceptions : true;
      try {
        var worker_threads = dynamicRequire(module, "worker_threads");
        if (worker_threads.isMainThread === false) {
          installHandler = false;
        }
      } catch (e) {
      }
      if (installHandler && hasGlobalProcessEventEmitter()) {
        uncaughtShimInstalled = true;
        shimEmitUncaughtException();
      }
    }
  };
  exports.resetRetrieveHandlers = function() {
    retrieveFileHandlers.length = 0;
    retrieveMapHandlers.length = 0;
    retrieveFileHandlers = originalRetrieveFileHandlers.slice(0);
    retrieveMapHandlers = originalRetrieveMapHandlers.slice(0);
    retrieveSourceMap = handlerExec(retrieveMapHandlers);
    retrieveFile = handlerExec(retrieveFileHandlers);
  };
})(sourceMapSupport, sourceMapSupport.exports);
var sourceMapSupportExports = sourceMapSupport.exports;
sourceMapSupportExports.install();
var ErrorResponse = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
};
function getErrorHtml(status, e) {
  let message = "Server Error";
  if (e != null) {
    if (typeof e.message === "string") {
      message = e.message;
    } else {
      message = String(e);
    }
  }
  return `<html>` + minimalHtmlResponse(status, message) + `</html>`;
}
function minimalHtmlResponse(status, message) {
  if (typeof status !== "number") {
    status = 500;
  }
  if (typeof message === "string") {
    message = escapeHtml(message);
  } else {
    message = "";
  }
  const width = typeof message === "string" ? "600px" : "300px";
  const color = status >= 500 ? COLOR_500 : COLOR_400;
  return `
<head>
  <meta charset="utf-8">
  <meta http-equiv="Status" content="${status}">
  <title>${status} ${message}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { color: ${color}; background-color: #fafafa; padding: 30px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif; }
    p { max-width: ${width}; margin: 60px auto 30px auto; background: white; border-radius: 4px; box-shadow: 0px 0px 50px -20px ${color}; overflow: hidden; }
    strong { display: inline-block; padding: 15px; background: ${color}; color: white; }
    span { display: inline-block; padding: 15px; }
  </style>
</head>
<body><p><strong>${status}</strong> <span>${message}</span></p></body>
`;
}
var ESCAPE_HTML = /[&<>]/g;
var escapeHtml = (s) => {
  return s.replace(ESCAPE_HTML, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      default:
        return "";
    }
  });
};
var COLOR_400 = "#006ce9";
var COLOR_500 = "#713fc2";
var SAMESITE = {
  lax: "Lax",
  none: "None",
  strict: "Strict"
};
var UNIT = {
  seconds: 1,
  minutes: 1 * 60,
  hours: 1 * 60 * 60,
  days: 1 * 60 * 60 * 24,
  weeks: 1 * 60 * 60 * 24 * 7
};
var createSetCookieValue = (cookieName, cookieValue, options) => {
  const c = [`${cookieName}=${cookieValue}`];
  if (typeof options.domain === "string") {
    c.push(`Domain=${options.domain}`);
  }
  if (typeof options.maxAge === "number") {
    c.push(`Max-Age=${options.maxAge}`);
  } else if (Array.isArray(options.maxAge)) {
    c.push(`Max-Age=${options.maxAge[0] * UNIT[options.maxAge[1]]}`);
  } else if (typeof options.expires === "number" || typeof options.expires == "string") {
    c.push(`Expires=${options.expires}`);
  } else if (options.expires instanceof Date) {
    c.push(`Expires=${options.expires.toUTCString()}`);
  }
  if (options.httpOnly) {
    c.push("HttpOnly");
  }
  if (typeof options.path === "string") {
    c.push(`Path=${options.path}`);
  }
  const sameSite = resolveSameSite(options.sameSite);
  if (sameSite) {
    c.push(`SameSite=${sameSite}`);
  }
  if (options.secure) {
    c.push("Secure");
  }
  return c.join("; ");
};
var parseCookieString = (cookieString) => {
  const cookie = {};
  if (typeof cookieString === "string" && cookieString !== "") {
    const cookieSegments = cookieString.split(";");
    for (const cookieSegment of cookieSegments) {
      const separatorIndex = cookieSegment.indexOf("=");
      if (separatorIndex !== -1) {
        cookie[decodeURIComponent(cookieSegment.slice(0, separatorIndex).trim())] = decodeURIComponent(cookieSegment.slice(separatorIndex + 1).trim());
      }
    }
  }
  return cookie;
};
function resolveSameSite(sameSite) {
  if (sameSite === true) {
    return "Strict";
  }
  if (sameSite === false) {
    return "None";
  }
  if (sameSite) {
    return SAMESITE[sameSite];
  }
  return void 0;
}
var REQ_COOKIE = Symbol("request-cookies");
var RES_COOKIE = Symbol("response-cookies");
var LIVE_COOKIE = Symbol("live-cookies");
var _a, _b;
var Cookie = class {
  constructor(cookieString) {
    this[_a] = {};
    this[_b] = {};
    this[REQ_COOKIE] = parseCookieString(cookieString);
    this[LIVE_COOKIE] = { ...this[REQ_COOKIE] };
  }
  get(cookieName, live = true) {
    const value = this[live ? LIVE_COOKIE : REQ_COOKIE][cookieName];
    if (!value) {
      return null;
    }
    return {
      value,
      json() {
        return JSON.parse(value);
      },
      number() {
        return Number(value);
      }
    };
  }
  getAll(live = true) {
    return Object.keys(this[live ? LIVE_COOKIE : REQ_COOKIE]).reduce((cookies2, cookieName) => {
      cookies2[cookieName] = this.get(cookieName);
      return cookies2;
    }, {});
  }
  has(cookieName, live = true) {
    return !!this[live ? LIVE_COOKIE : REQ_COOKIE][cookieName];
  }
  set(cookieName, cookieValue, options = {}) {
    this[LIVE_COOKIE][cookieName] = typeof cookieValue === "string" ? cookieValue : JSON.stringify(cookieValue);
    const resolvedValue = typeof cookieValue === "string" ? cookieValue : encodeURIComponent(JSON.stringify(cookieValue));
    this[RES_COOKIE][cookieName] = createSetCookieValue(cookieName, resolvedValue, options);
  }
  delete(name, options) {
    this.set(name, "deleted", { ...options, maxAge: 0 });
    this[LIVE_COOKIE][name] = null;
  }
  headers() {
    return Object.values(this[RES_COOKIE]);
  }
};
_a = RES_COOKIE, _b = LIVE_COOKIE;
var AbortMessage = class {
};
var RedirectMessage = class extends AbortMessage {
};
var MODULE_CACHE = /* @__PURE__ */ new WeakMap();
var QACTION_KEY = "qaction";
var QFN_KEY = "qfunc";
function getQwikCityServerData(requestEv) {
  const { url: url2, params, request: request2, status, locale } = requestEv;
  const requestHeaders2 = {};
  request2.headers.forEach((value, key) => requestHeaders2[key] = value);
  const action = requestEv.sharedMap.get(RequestEvSharedActionId);
  const formData = requestEv.sharedMap.get(RequestEvSharedActionFormData);
  const nonce = requestEv.sharedMap.get(RequestEvSharedNonce);
  return {
    url: new URL(url2.pathname + url2.search, url2).href,
    requestHeaders: requestHeaders2,
    locale: locale(),
    nonce,
    qwikcity: {
      ev: requestEv,
      params: { ...params },
      loadedRoute: getRequestRoute(requestEv),
      response: {
        status: status(),
        loaders: getRequestLoaders(requestEv),
        action,
        formData
      }
    }
  };
}
var resolveRequestHandlers = (serverPlugins, route, method, checkOrigin, renderHandler) => {
  const routeLoaders = [];
  const routeActions = [];
  const requestHandlers = [];
  const isPageRoute = !!(route && isLastModulePageRoute(route[1]));
  if (serverPlugins) {
    _resolveRequestHandlers(
      routeLoaders,
      routeActions,
      requestHandlers,
      serverPlugins,
      isPageRoute,
      method
    );
  }
  if (route) {
    if (checkOrigin && (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE")) {
      requestHandlers.unshift(csrfCheckMiddleware);
    }
    if (isPageRoute) {
      if (method === "POST") {
        requestHandlers.push(pureServerFunction);
      }
      requestHandlers.push(fixTrailingSlash);
      requestHandlers.push(renderQData);
    }
    requestHandlers.push(handleRedirect);
    _resolveRequestHandlers(
      routeLoaders,
      routeActions,
      requestHandlers,
      route[1],
      isPageRoute,
      method
    );
    if (isPageRoute) {
      requestHandlers.push(actionsMiddleware(routeLoaders, routeActions));
      requestHandlers.push(renderHandler);
    }
  }
  return requestHandlers;
};
var _resolveRequestHandlers = (routeLoaders, routeActions, requestHandlers, routeModules, collectActions, method) => {
  for (const routeModule of routeModules) {
    if (typeof routeModule.onRequest === "function") {
      requestHandlers.push(routeModule.onRequest);
    } else if (Array.isArray(routeModule.onRequest)) {
      requestHandlers.push(...routeModule.onRequest);
    }
    let methodReqHandler;
    switch (method) {
      case "GET": {
        methodReqHandler = routeModule.onGet;
        break;
      }
      case "POST": {
        methodReqHandler = routeModule.onPost;
        break;
      }
      case "PUT": {
        methodReqHandler = routeModule.onPut;
        break;
      }
      case "PATCH": {
        methodReqHandler = routeModule.onPatch;
        break;
      }
      case "DELETE": {
        methodReqHandler = routeModule.onDelete;
        break;
      }
      case "OPTIONS": {
        methodReqHandler = routeModule.onOptions;
        break;
      }
      case "HEAD": {
        methodReqHandler = routeModule.onHead;
        break;
      }
    }
    if (typeof methodReqHandler === "function") {
      requestHandlers.push(methodReqHandler);
    } else if (Array.isArray(methodReqHandler)) {
      requestHandlers.push(...methodReqHandler);
    }
    if (collectActions) {
      const loaders = Object.values(routeModule).filter(
        (e) => checkBrand(e, "server_loader")
      );
      routeLoaders.push(...loaders);
      const actions = Object.values(routeModule).filter(
        (e) => checkBrand(e, "server_action")
      );
      routeActions.push(...actions);
    }
  }
};
var checkBrand = (obj, brand) => {
  return obj && typeof obj === "function" && obj.__brand === brand;
};
function actionsMiddleware(routeLoaders, routeActions) {
  return async (requestEv) => {
    if (requestEv.headersSent) {
      requestEv.exit();
      return;
    }
    const { method } = requestEv;
    const loaders = getRequestLoaders(requestEv);
    const isDev = getRequestMode(requestEv) === "dev";
    const qwikSerializer = requestEv[RequestEvQwikSerializer];
    if (isDev && method === "GET") {
      if (requestEv.query.has(QACTION_KEY)) {
        console.warn(
          'Seems like you are submitting a Qwik Action via GET request. Qwik Actions should be submitted via POST request.\nMake sure your <form> has method="POST" attribute, like this: <form method="POST">'
        );
      }
    }
    if (method === "POST") {
      const selectedAction = requestEv.query.get(QACTION_KEY);
      if (selectedAction) {
        const serverActionsMap = globalThis._qwikActionsMap;
        const action = routeActions.find((action2) => action2.__id === selectedAction) ?? (serverActionsMap == null ? void 0 : serverActionsMap.get(selectedAction));
        if (action) {
          requestEv.sharedMap.set(RequestEvSharedActionId, selectedAction);
          const data = await requestEv.parseBody();
          if (!data || typeof data !== "object") {
            throw new Error("Expected request data to be an object");
          }
          const result = await runValidators(requestEv, action.__validators, data, isDev);
          if (!result.success) {
            loaders[selectedAction] = requestEv.fail(result.status ?? 500, result.error);
          } else {
            const actionResolved = isDev ? await measure(
              requestEv,
              action.__qrl.getSymbol().split("_", 1)[0],
              () => action.__qrl.call(requestEv, result.data, requestEv)
            ) : await action.__qrl.call(requestEv, result.data, requestEv);
            if (isDev) {
              verifySerializable(qwikSerializer, actionResolved, action.__qrl);
            }
            loaders[selectedAction] = actionResolved;
          }
        }
      }
    }
    if (routeLoaders.length > 0) {
      await Promise.all(
        routeLoaders.map((loader) => {
          const loaderId = loader.__id;
          return loaders[loaderId] = runValidators(
            requestEv,
            loader.__validators,
            void 0,
            isDev
          ).then((res) => {
            if (res.success) {
              if (isDev) {
                return measure(
                  requestEv,
                  loader.__qrl.getSymbol().split("_", 1)[0],
                  () => loader.__qrl.call(requestEv, requestEv)
                );
              } else {
                return loader.__qrl.call(requestEv, requestEv);
              }
            } else {
              return requestEv.fail(res.status ?? 500, res.error);
            }
          }).then((loaderResolved) => {
            if (typeof loaderResolved === "function") {
              loaders[loaderId] = loaderResolved();
            } else {
              if (isDev) {
                verifySerializable(qwikSerializer, loaderResolved, loader.__qrl);
              }
              loaders[loaderId] = loaderResolved;
            }
            return loaderResolved;
          });
        })
      );
    }
  };
}
async function runValidators(requestEv, validators, data, isDev) {
  let lastResult = {
    success: true,
    data
  };
  if (validators) {
    for (const validator of validators) {
      if (isDev) {
        lastResult = await measure(
          requestEv,
          `validator$`,
          () => validator.validate(requestEv, data)
        );
      } else {
        lastResult = await validator.validate(requestEv, data);
      }
      if (!lastResult.success) {
        return lastResult;
      } else {
        data = lastResult.data;
      }
    }
  }
  return lastResult;
}
function isAsyncIterator(obj) {
  return obj && typeof obj === "object" && Symbol.asyncIterator in obj;
}
async function pureServerFunction(ev) {
  const fn = ev.query.get(QFN_KEY);
  if (fn && ev.request.headers.get("X-QRL") === fn && ev.request.headers.get("Content-Type") === "application/qwik-json") {
    ev.exit();
    const isDev = getRequestMode(ev) === "dev";
    const qwikSerializer = ev[RequestEvQwikSerializer];
    const data = await ev.parseBody();
    if (Array.isArray(data)) {
      const [qrl, ...args] = data;
      if (isQrl(qrl) && qrl.getHash() === fn) {
        let result;
        try {
          if (isDev) {
            result = await measure(ev, `server_${qrl.getSymbol()}`, () => qrl.apply(ev, args));
          } else {
            result = await qrl.apply(ev, args);
          }
        } catch (err) {
          ev.headers.set("Content-Type", "application/qwik-json");
          ev.send(500, await qwikSerializer._serializeData(err, true));
          return;
        }
        if (isAsyncIterator(result)) {
          ev.headers.set("Content-Type", "text/qwik-json-stream");
          const writable = ev.getWritableStream();
          const stream2 = writable.getWriter();
          for await (const item of result) {
            if (isDev) {
              verifySerializable(qwikSerializer, item, qrl);
            }
            const message = await qwikSerializer._serializeData(item, true);
            if (ev.signal.aborted) {
              break;
            }
            await stream2.write(encoder.encode(`${message}
`));
          }
          stream2.close();
        } else {
          verifySerializable(qwikSerializer, result, qrl);
          ev.headers.set("Content-Type", "application/qwik-json");
          const message = await qwikSerializer._serializeData(result, true);
          ev.send(200, message);
        }
        return;
      }
    }
    throw ev.error(500, "Invalid request");
  }
}
function fixTrailingSlash(ev) {
  const trailingSlash = getRequestTrailingSlash(ev);
  const { basePathname, pathname, url: url2, sharedMap } = ev;
  const isQData = sharedMap.has(IsQData);
  if (!isQData && pathname !== basePathname && !pathname.endsWith(".html")) {
    if (trailingSlash) {
      if (!pathname.endsWith("/")) {
        throw ev.redirect(302, pathname + "/" + url2.search);
      }
    } else {
      if (pathname.endsWith("/")) {
        throw ev.redirect(302, pathname.slice(0, pathname.length - 1) + url2.search);
      }
    }
  }
}
function verifySerializable(qwikSerializer, data, qrl) {
  try {
    qwikSerializer._verifySerializable(data, void 0);
  } catch (e) {
    if (e instanceof Error && qrl.dev) {
      e.loc = qrl.dev;
    }
    throw e;
  }
}
var isQrl = (value) => {
  return typeof value === "function" && typeof value.getSymbol === "function";
};
function isLastModulePageRoute(routeModules) {
  const lastRouteModule = routeModules[routeModules.length - 1];
  return lastRouteModule && typeof lastRouteModule.default === "function";
}
function getPathname(url2, trailingSlash) {
  if (url2.pathname.endsWith(QDATA_JSON)) {
    return url2.pathname.slice(0, -QDATA_JSON.length + (trailingSlash ? 1 : 0)) + url2.search;
  }
  return url2.pathname;
}
var encoder = /* @__PURE__ */ new TextEncoder();
function csrfCheckMiddleware(requestEv) {
  const isForm = isContentType(
    requestEv.request.headers,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
  if (isForm) {
    const inputOrigin = requestEv.request.headers.get("origin");
    const origin = requestEv.url.origin;
    const forbidden = inputOrigin !== origin;
    if (forbidden) {
      throw requestEv.error(
        403,
        `CSRF check failed. Cross-site ${requestEv.method} form submissions are forbidden.
The request origin "${inputOrigin}" does not match the server origin "${origin}".`
      );
    }
  }
}
function renderQwikMiddleware(render2) {
  return async (requestEv) => {
    if (requestEv.headersSent) {
      return;
    }
    const isPageDataReq = requestEv.sharedMap.has(IsQData);
    if (isPageDataReq) {
      return;
    }
    requestEv.request.headers.forEach((value, key) => value);
    const responseHeaders = requestEv.headers;
    if (!responseHeaders.has("Content-Type")) {
      responseHeaders.set("Content-Type", "text/html; charset=utf-8");
    }
    const trailingSlash = getRequestTrailingSlash(requestEv);
    const { readable: readable2, writable } = new TextEncoderStream();
    const writableStream = requestEv.getWritableStream();
    const pipe = readable2.pipeTo(writableStream, { preventClose: true });
    const stream2 = writable.getWriter();
    const status = requestEv.status();
    try {
      const isStatic = getRequestMode(requestEv) === "static";
      const result = await render2({
        base: requestEv.basePathname + "build/",
        stream: stream2,
        serverData: getQwikCityServerData(requestEv),
        containerAttributes: {
          ["q:render"]: isStatic ? "static" : ""
        }
      });
      const qData = {
        loaders: getRequestLoaders(requestEv),
        action: requestEv.sharedMap.get(RequestEvSharedActionId),
        status: status !== 200 ? status : 200,
        href: getPathname(requestEv.url, trailingSlash)
      };
      if (typeof result.html === "string") {
        await stream2.write(result.html);
      }
      requestEv.sharedMap.set("qData", qData);
    } finally {
      await stream2.ready;
      await stream2.close();
      await pipe;
    }
    await writableStream.close();
  };
}
async function handleRedirect(requestEv) {
  const isPageDataReq = requestEv.sharedMap.has(IsQData);
  if (isPageDataReq) {
    try {
      await requestEv.next();
    } catch (err) {
      if (!(err instanceof RedirectMessage)) {
        throw err;
      }
    }
    if (requestEv.headersSent) {
      return;
    }
    const status = requestEv.status();
    const location = requestEv.headers.get("Location");
    const isRedirect = status >= 301 && status <= 308 && location;
    if (isRedirect) {
      const adaptedLocation = makeQDataPath(location);
      if (adaptedLocation) {
        requestEv.headers.set("Location", adaptedLocation);
        requestEv.getWritableStream().close();
        return;
      } else {
        requestEv.status(200);
        requestEv.headers.delete("Location");
      }
    }
  }
}
async function renderQData(requestEv) {
  const isPageDataReq = requestEv.sharedMap.has(IsQData);
  if (isPageDataReq) {
    await requestEv.next();
    if (requestEv.headersSent || requestEv.exited) {
      return;
    }
    const status = requestEv.status();
    const location = requestEv.headers.get("Location");
    const trailingSlash = getRequestTrailingSlash(requestEv);
    requestEv.request.headers.forEach((value, key) => value);
    requestEv.headers.set("Content-Type", "application/json; charset=utf-8");
    const qData = {
      loaders: getRequestLoaders(requestEv),
      action: requestEv.sharedMap.get(RequestEvSharedActionId),
      status: status !== 200 ? status : 200,
      href: getPathname(requestEv.url, trailingSlash),
      redirect: location ?? void 0
    };
    const writer = requestEv.getWritableStream().getWriter();
    const qwikSerializer = requestEv[RequestEvQwikSerializer];
    const data = await qwikSerializer._serializeData(qData, true);
    writer.write(encoder.encode(data));
    requestEv.sharedMap.set("qData", qData);
    writer.close();
  }
}
function makeQDataPath(href) {
  if (href.startsWith("/")) {
    const append = QDATA_JSON;
    const url2 = new URL(href, "http://localhost");
    const pathname = url2.pathname.endsWith("/") ? url2.pathname.slice(0, -1) : url2.pathname;
    return pathname + (append.startsWith("/") ? "" : "/") + append + url2.search;
  } else {
    return void 0;
  }
}
function now() {
  return typeof performance !== "undefined" ? performance.now() : 0;
}
async function measure(requestEv, name, fn) {
  const start = now();
  try {
    return await fn();
  } finally {
    const duration = now() - start;
    let measurements = requestEv.sharedMap.get("@serverTiming");
    if (!measurements) {
      requestEv.sharedMap.set("@serverTiming", measurements = []);
    }
    measurements.push([name, duration]);
  }
}
function isContentType(headers2, ...types) {
  var _a2;
  const type = ((_a2 = headers2.get("content-type")) == null ? void 0 : _a2.split(/;,/, 1)[0].trim()) ?? "";
  return types.includes(type);
}
function createCacheControl(cacheControl) {
  const controls = [];
  if (cacheControl === "day") {
    cacheControl = 60 * 60 * 24;
  } else if (cacheControl === "week") {
    cacheControl = 60 * 60 * 24 * 7;
  } else if (cacheControl === "month") {
    cacheControl = 60 * 60 * 24 * 30;
  } else if (cacheControl === "year") {
    cacheControl = 60 * 60 * 24 * 365;
  } else if (cacheControl === "private") {
    cacheControl = {
      private: true,
      noCache: true
    };
  } else if (cacheControl === "immutable") {
    cacheControl = {
      public: true,
      immutable: true,
      maxAge: 60 * 60 * 24 * 365,
      staleWhileRevalidate: 60 * 60 * 24 * 365
    };
  } else if (cacheControl === "no-cache") {
    cacheControl = {
      noCache: true
    };
  }
  if (typeof cacheControl === "number") {
    cacheControl = {
      maxAge: cacheControl,
      sMaxAge: cacheControl,
      staleWhileRevalidate: cacheControl
    };
  }
  if (cacheControl.immutable) {
    controls.push("immutable");
  }
  if (cacheControl.maxAge) {
    controls.push(`max-age=${cacheControl.maxAge}`);
  }
  if (cacheControl.sMaxAge) {
    controls.push(`s-maxage=${cacheControl.sMaxAge}`);
  }
  if (cacheControl.noStore) {
    controls.push("no-store");
  }
  if (cacheControl.noCache) {
    controls.push("no-cache");
  }
  if (cacheControl.private) {
    controls.push("private");
  }
  if (cacheControl.public) {
    controls.push("public");
  }
  if (cacheControl.staleWhileRevalidate) {
    controls.push(`stale-while-revalidate=${cacheControl.staleWhileRevalidate}`);
  }
  if (cacheControl.staleIfError) {
    controls.push(`stale-if-error=${cacheControl.staleIfError}`);
  }
  return controls.join(", ");
}
var RequestEvLoaders = Symbol("RequestEvLoaders");
var RequestEvMode = Symbol("RequestEvMode");
var RequestEvRoute = Symbol("RequestEvRoute");
var RequestEvQwikSerializer = Symbol("RequestEvQwikSerializer");
var RequestEvTrailingSlash = Symbol("RequestEvTrailingSlash");
var RequestEvSharedActionId = "@actionId";
var RequestEvSharedActionFormData = "@actionFormData";
var RequestEvSharedNonce = "@nonce";
function createRequestEvent(serverRequestEv, loadedRoute, requestHandlers, manifest2, trailingSlash, basePathname, qwikSerializer, resolved) {
  const { request: request2, platform, env } = serverRequestEv;
  const sharedMap = /* @__PURE__ */ new Map();
  const cookie = new Cookie(request2.headers.get("cookie"));
  const headers2 = new Headers();
  const url2 = new URL(request2.url);
  if (url2.pathname.endsWith(QDATA_JSON)) {
    url2.pathname = url2.pathname.slice(0, -QDATA_JSON_LEN);
    if (trailingSlash && !url2.pathname.endsWith("/")) {
      url2.pathname += "/";
    }
    sharedMap.set(IsQData, true);
  }
  sharedMap.set("@manifest", manifest2);
  let routeModuleIndex = -1;
  let writableStream = null;
  let requestData = void 0;
  let locale = serverRequestEv.locale;
  let status = 200;
  const next = async () => {
    routeModuleIndex++;
    while (routeModuleIndex < requestHandlers.length) {
      const moduleRequestHandler = requestHandlers[routeModuleIndex];
      const result = moduleRequestHandler(requestEv);
      if (result instanceof Promise) {
        await result;
      }
      routeModuleIndex++;
    }
  };
  const check = () => {
    if (writableStream !== null) {
      throw new Error("Response already sent");
    }
  };
  const send = (statusOrResponse, body2) => {
    check();
    if (typeof statusOrResponse === "number") {
      status = statusOrResponse;
      const writableStream2 = requestEv.getWritableStream();
      const writer = writableStream2.getWriter();
      writer.write(typeof body2 === "string" ? encoder.encode(body2) : body2);
      writer.close();
    } else {
      status = statusOrResponse.status;
      statusOrResponse.headers.forEach((value, key) => {
        headers2.append(key, value);
      });
      if (statusOrResponse.body) {
        const writableStream2 = requestEv.getWritableStream();
        statusOrResponse.body.pipeTo(writableStream2);
      } else {
        if (status >= 300 && status < 400) {
          return new RedirectMessage();
        } else {
          requestEv.getWritableStream().getWriter().close();
        }
      }
    }
    return exit();
  };
  const exit = () => {
    routeModuleIndex = ABORT_INDEX;
    return new AbortMessage();
  };
  const loaders = {};
  const requestEv = {
    [RequestEvLoaders]: loaders,
    [RequestEvMode]: serverRequestEv.mode,
    [RequestEvTrailingSlash]: trailingSlash,
    [RequestEvRoute]: loadedRoute,
    [RequestEvQwikSerializer]: qwikSerializer,
    cookie,
    headers: headers2,
    env,
    method: request2.method,
    signal: request2.signal,
    params: (loadedRoute == null ? void 0 : loadedRoute[0]) ?? {},
    pathname: url2.pathname,
    platform,
    query: url2.searchParams,
    request: request2,
    url: url2,
    basePathname,
    sharedMap,
    get headersSent() {
      return writableStream !== null;
    },
    get exited() {
      return routeModuleIndex >= ABORT_INDEX;
    },
    get clientConn() {
      return serverRequestEv.getClientConn();
    },
    next,
    exit,
    cacheControl: (cacheControl) => {
      check();
      headers2.set("Cache-Control", createCacheControl(cacheControl));
    },
    resolveValue: async (loaderOrAction) => {
      const id = loaderOrAction.__id;
      if (loaderOrAction.__brand === "server_loader") {
        if (!(id in loaders)) {
          throw new Error(
            "You can not get the returned data of a loader that has not been executed for this request."
          );
        }
      }
      return loaders[id];
    },
    status: (statusCode) => {
      if (typeof statusCode === "number") {
        check();
        status = statusCode;
        return statusCode;
      }
      return status;
    },
    locale: (_locale) => {
      if (typeof _locale === "string") {
        locale = _locale;
      }
      return locale || "";
    },
    error: (statusCode, message) => {
      status = statusCode;
      headers2.delete("Cache-Control");
      return new ErrorResponse(statusCode, message);
    },
    redirect: (statusCode, url22) => {
      check();
      status = statusCode;
      if (url22) {
        const fixedURL = url22.replace(/([^:])\/{2,}/g, "$1/");
        if (url22 !== fixedURL) {
          console.warn(`Redirect URL ${url22} is invalid, fixing to ${fixedURL}`);
        }
        headers2.set("Location", fixedURL);
      }
      headers2.delete("Cache-Control");
      if (statusCode > 301) {
        headers2.set("Cache-Control", "no-store");
      }
      exit();
      return new RedirectMessage();
    },
    defer: (returnData) => {
      return typeof returnData === "function" ? returnData : () => returnData;
    },
    fail: (statusCode, data) => {
      check();
      status = statusCode;
      headers2.delete("Cache-Control");
      return {
        failed: true,
        ...data
      };
    },
    text: (statusCode, text) => {
      headers2.set("Content-Type", "text/plain; charset=utf-8");
      return send(statusCode, text);
    },
    html: (statusCode, html) => {
      headers2.set("Content-Type", "text/html; charset=utf-8");
      return send(statusCode, html);
    },
    parseBody: async () => {
      if (requestData !== void 0) {
        return requestData;
      }
      return requestData = parseRequest(requestEv.request, sharedMap, qwikSerializer);
    },
    json: (statusCode, data) => {
      headers2.set("Content-Type", "application/json; charset=utf-8");
      return send(statusCode, JSON.stringify(data));
    },
    send,
    isDirty: () => {
      return writableStream !== null;
    },
    getWritableStream: () => {
      if (writableStream === null) {
        if (serverRequestEv.mode === "dev") {
          const serverTiming = sharedMap.get("@serverTiming");
          if (serverTiming) {
            headers2.set("Server-Timing", serverTiming.map((a) => `${a[0]};dur=${a[1]}`).join(","));
          }
        }
        writableStream = serverRequestEv.getWritableStream(
          status,
          headers2,
          cookie,
          resolved,
          requestEv
        );
      }
      return writableStream;
    }
  };
  return Object.freeze(requestEv);
}
function getRequestLoaders(requestEv) {
  return requestEv[RequestEvLoaders];
}
function getRequestTrailingSlash(requestEv) {
  return requestEv[RequestEvTrailingSlash];
}
function getRequestRoute(requestEv) {
  return requestEv[RequestEvRoute];
}
function getRequestMode(requestEv) {
  return requestEv[RequestEvMode];
}
var ABORT_INDEX = Number.MAX_SAFE_INTEGER;
var parseRequest = async (request2, sharedMap, qwikSerializer) => {
  var _a2;
  const req = request2.clone();
  const type = ((_a2 = request2.headers.get("content-type")) == null ? void 0 : _a2.split(/[;,]/, 1)[0].trim()) ?? "";
  if (type === "application/x-www-form-urlencoded" || type === "multipart/form-data") {
    const formData = await req.formData();
    sharedMap.set(RequestEvSharedActionFormData, formData);
    return formToObj(formData);
  } else if (type === "application/json") {
    const data = await req.json();
    return data;
  } else if (type === "application/qwik-json") {
    return qwikSerializer._deserializeData(await req.text());
  }
  return void 0;
};
var formToObj = (formData) => {
  const obj = {};
  formData.forEach((value, key) => {
    const keys = key.split(".").filter((k) => k);
    let current = obj;
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      if (i === keys.length - 1) {
        if (k.endsWith("[]")) {
          k = k.slice(0, -2);
          current[k] = current[k] || [];
          current[k].push(value);
        } else {
          current[k] = value;
        }
      } else {
        current = current[k] = { ...current[k] };
      }
    }
  });
  return obj;
};
function runQwikCity(serverRequestEv, loadedRoute, requestHandlers, manifest2, trailingSlash = true, basePathname = "/", qwikSerializer) {
  let resolve;
  const responsePromise = new Promise((r) => resolve = r);
  const requestEv = createRequestEvent(
    serverRequestEv,
    loadedRoute,
    requestHandlers,
    manifest2,
    trailingSlash,
    basePathname,
    qwikSerializer,
    resolve
  );
  return {
    response: responsePromise,
    requestEv,
    completion: runNext(requestEv, resolve)
  };
}
async function runNext(requestEv, resolve) {
  try {
    await requestEv.next();
  } catch (e) {
    if (e instanceof RedirectMessage) {
      const stream2 = requestEv.getWritableStream();
      await stream2.close();
    } else if (e instanceof ErrorResponse) {
      console.error(e);
      if (!requestEv.headersSent) {
        const html = getErrorHtml(e.status, e);
        const status = e.status;
        requestEv.html(status, html);
      }
    } else if (!(e instanceof AbortMessage)) {
      if (getRequestMode(requestEv) !== "dev") {
        try {
          if (!requestEv.headersSent) {
            requestEv.headers.set("content-type", "text/html; charset=utf-8");
            requestEv.cacheControl({ noCache: true });
            requestEv.status(500);
          }
          const stream2 = requestEv.getWritableStream();
          if (!stream2.locked) {
            const writer = stream2.getWriter();
            await writer.write(encoder.encode(minimalHtmlResponse(500, "Internal Server Error")));
            await writer.close();
          }
        } catch {
          console.error("Unable to render error page");
        }
      }
      return e;
    }
  } finally {
    if (!requestEv.isDirty()) {
      resolve(null);
    }
  }
  return void 0;
}
function getRouteMatchPathname(pathname, trailingSlash) {
  if (pathname.endsWith(QDATA_JSON)) {
    const trimEnd = pathname.length - QDATA_JSON_LEN + (trailingSlash ? 1 : 0);
    pathname = pathname.slice(0, trimEnd);
    if (pathname === "") {
      pathname = "/";
    }
  }
  return pathname;
}
var IsQData = "@isQData";
var QDATA_JSON = "/q-data.json";
var QDATA_JSON_LEN = QDATA_JSON.length;
var loadRoute = async (routes, menus, cacheModules, pathname) => {
  if (Array.isArray(routes)) {
    for (const route of routes) {
      const match = route[0].exec(pathname);
      if (match) {
        const loaders = route[1];
        const params = getPathParams(route[2], match);
        const routeBundleNames = route[4];
        const mods = new Array(loaders.length);
        const pendingLoads = [];
        const menuLoader = getMenuLoader(menus, pathname);
        let menu = void 0;
        loaders.forEach((moduleLoader, i) => {
          loadModule(
            moduleLoader,
            pendingLoads,
            (routeModule) => mods[i] = routeModule,
            cacheModules
          );
        });
        loadModule(
          menuLoader,
          pendingLoads,
          (menuModule) => menu = menuModule == null ? void 0 : menuModule.default,
          cacheModules
        );
        if (pendingLoads.length > 0) {
          await Promise.all(pendingLoads);
        }
        return [params, mods, menu, routeBundleNames];
      }
    }
  }
  return null;
};
var loadModule = (moduleLoader, pendingLoads, moduleSetter, cacheModules) => {
  if (typeof moduleLoader === "function") {
    const loadedModule = MODULE_CACHE.get(moduleLoader);
    if (loadedModule) {
      moduleSetter(loadedModule);
    } else {
      const l = moduleLoader();
      if (typeof l.then === "function") {
        pendingLoads.push(
          l.then((loadedModule2) => {
            if (cacheModules !== false) {
              MODULE_CACHE.set(moduleLoader, loadedModule2);
            }
            moduleSetter(loadedModule2);
          })
        );
      } else if (l) {
        moduleSetter(l);
      }
    }
  }
};
var getMenuLoader = (menus, pathname) => {
  if (menus) {
    pathname = pathname.endsWith("/") ? pathname : pathname + "/";
    const menu = menus.find(
      (m) => m[0] === pathname || pathname.startsWith(m[0] + (pathname.endsWith("/") ? "" : "/"))
    );
    if (menu) {
      return menu[1];
    }
  }
};
var getPathParams = (paramNames, match) => {
  const params = {};
  if (paramNames) {
    for (let i = 0; i < paramNames.length; i++) {
      const param = (match == null ? void 0 : match[i + 1]) ?? "";
      const v = param.endsWith("/") ? param.slice(0, -1) : param;
      params[paramNames[i]] = decodeURIComponent(v);
    }
  }
  return params;
};
async function requestHandler(serverRequestEv, opts, qwikSerializer) {
  const { render: render2, qwikCityPlan: qwikCityPlan2, manifest: manifest2, checkOrigin } = opts;
  const pathname = serverRequestEv.url.pathname;
  const matchPathname = getRouteMatchPathname(pathname, qwikCityPlan2.trailingSlash);
  const route = await loadRequestHandlers(
    qwikCityPlan2,
    matchPathname,
    serverRequestEv.request.method,
    checkOrigin ?? true,
    render2
  );
  if (route) {
    return runQwikCity(
      serverRequestEv,
      route[0],
      route[1],
      manifest2,
      qwikCityPlan2.trailingSlash,
      qwikCityPlan2.basePathname,
      qwikSerializer
    );
  }
  return null;
}
async function loadRequestHandlers(qwikCityPlan2, pathname, method, checkOrigin, renderFn) {
  const { routes, serverPlugins, menus, cacheModules } = qwikCityPlan2;
  const route = await loadRoute(routes, menus, cacheModules, pathname);
  const requestHandlers = resolveRequestHandlers(
    serverPlugins,
    route,
    method,
    checkOrigin,
    renderQwikMiddleware(renderFn)
  );
  if (requestHandlers.length > 0) {
    return [route, requestHandlers];
  }
  return null;
}
var symbols$4 = {
  kClose: Symbol("close"),
  kDestroy: Symbol("destroy"),
  kDispatch: Symbol("dispatch"),
  kUrl: Symbol("url"),
  kWriting: Symbol("writing"),
  kResuming: Symbol("resuming"),
  kQueue: Symbol("queue"),
  kConnect: Symbol("connect"),
  kConnecting: Symbol("connecting"),
  kHeadersList: Symbol("headers list"),
  kKeepAliveDefaultTimeout: Symbol("default keep alive timeout"),
  kKeepAliveMaxTimeout: Symbol("max keep alive timeout"),
  kKeepAliveTimeoutThreshold: Symbol("keep alive timeout threshold"),
  kKeepAliveTimeoutValue: Symbol("keep alive timeout"),
  kKeepAlive: Symbol("keep alive"),
  kHeadersTimeout: Symbol("headers timeout"),
  kBodyTimeout: Symbol("body timeout"),
  kServerName: Symbol("server name"),
  kLocalAddress: Symbol("local address"),
  kHost: Symbol("host"),
  kNoRef: Symbol("no ref"),
  kBodyUsed: Symbol("used"),
  kRunning: Symbol("running"),
  kBlocking: Symbol("blocking"),
  kPending: Symbol("pending"),
  kSize: Symbol("size"),
  kBusy: Symbol("busy"),
  kQueued: Symbol("queued"),
  kFree: Symbol("free"),
  kConnected: Symbol("connected"),
  kClosed: Symbol("closed"),
  kNeedDrain: Symbol("need drain"),
  kReset: Symbol("reset"),
  kDestroyed: Symbol.for("nodejs.stream.destroyed"),
  kMaxHeadersSize: Symbol("max headers size"),
  kRunningIdx: Symbol("running index"),
  kPendingIdx: Symbol("pending index"),
  kError: Symbol("error"),
  kClients: Symbol("clients"),
  kClient: Symbol("client"),
  kParser: Symbol("parser"),
  kOnDestroyed: Symbol("destroy callbacks"),
  kPipelining: Symbol("pipelining"),
  kSocket: Symbol("socket"),
  kHostHeader: Symbol("host header"),
  kConnector: Symbol("connector"),
  kStrictContentLength: Symbol("strict content length"),
  kMaxRedirections: Symbol("maxRedirections"),
  kMaxRequests: Symbol("maxRequestsPerClient"),
  kProxy: Symbol("proxy agent options"),
  kCounter: Symbol("socket request counter"),
  kInterceptors: Symbol("dispatch interceptors"),
  kMaxResponseSize: Symbol("max response size")
};
let UndiciError$1 = class UndiciError extends Error {
  constructor(message) {
    super(message);
    this.name = "UndiciError";
    this.code = "UND_ERR";
  }
};
let ConnectTimeoutError$1 = class ConnectTimeoutError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ConnectTimeoutError);
    this.name = "ConnectTimeoutError";
    this.message = message || "Connect Timeout Error";
    this.code = "UND_ERR_CONNECT_TIMEOUT";
  }
};
let HeadersTimeoutError$1 = class HeadersTimeoutError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, HeadersTimeoutError);
    this.name = "HeadersTimeoutError";
    this.message = message || "Headers Timeout Error";
    this.code = "UND_ERR_HEADERS_TIMEOUT";
  }
};
let HeadersOverflowError$1 = class HeadersOverflowError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, HeadersOverflowError);
    this.name = "HeadersOverflowError";
    this.message = message || "Headers Overflow Error";
    this.code = "UND_ERR_HEADERS_OVERFLOW";
  }
};
let BodyTimeoutError$1 = class BodyTimeoutError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, BodyTimeoutError);
    this.name = "BodyTimeoutError";
    this.message = message || "Body Timeout Error";
    this.code = "UND_ERR_BODY_TIMEOUT";
  }
};
let ResponseStatusCodeError$1 = class ResponseStatusCodeError extends UndiciError$1 {
  constructor(message, statusCode, headers2, body2) {
    super(message);
    Error.captureStackTrace(this, ResponseStatusCodeError);
    this.name = "ResponseStatusCodeError";
    this.message = message || "Response Status Code Error";
    this.code = "UND_ERR_RESPONSE_STATUS_CODE";
    this.body = body2;
    this.status = statusCode;
    this.statusCode = statusCode;
    this.headers = headers2;
  }
};
let InvalidArgumentError$j = class InvalidArgumentError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, InvalidArgumentError);
    this.name = "InvalidArgumentError";
    this.message = message || "Invalid Argument Error";
    this.code = "UND_ERR_INVALID_ARG";
  }
};
let InvalidReturnValueError$2 = class InvalidReturnValueError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, InvalidReturnValueError);
    this.name = "InvalidReturnValueError";
    this.message = message || "Invalid Return Value Error";
    this.code = "UND_ERR_INVALID_RETURN_VALUE";
  }
};
let RequestAbortedError$8 = class RequestAbortedError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, RequestAbortedError);
    this.name = "AbortError";
    this.message = message || "Request aborted";
    this.code = "UND_ERR_ABORTED";
  }
};
let InformationalError$1 = class InformationalError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, InformationalError);
    this.name = "InformationalError";
    this.message = message || "Request information";
    this.code = "UND_ERR_INFO";
  }
};
let RequestContentLengthMismatchError$1 = class RequestContentLengthMismatchError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, RequestContentLengthMismatchError);
    this.name = "RequestContentLengthMismatchError";
    this.message = message || "Request body length does not match content-length header";
    this.code = "UND_ERR_REQ_CONTENT_LENGTH_MISMATCH";
  }
};
let ResponseContentLengthMismatchError$1 = class ResponseContentLengthMismatchError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ResponseContentLengthMismatchError);
    this.name = "ResponseContentLengthMismatchError";
    this.message = message || "Response body length does not match content-length header";
    this.code = "UND_ERR_RES_CONTENT_LENGTH_MISMATCH";
  }
};
let ClientDestroyedError$2 = class ClientDestroyedError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ClientDestroyedError);
    this.name = "ClientDestroyedError";
    this.message = message || "The client is destroyed";
    this.code = "UND_ERR_DESTROYED";
  }
};
let ClientClosedError$1 = class ClientClosedError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ClientClosedError);
    this.name = "ClientClosedError";
    this.message = message || "The client is closed";
    this.code = "UND_ERR_CLOSED";
  }
};
let SocketError$3 = class SocketError extends UndiciError$1 {
  constructor(message, socket) {
    super(message);
    Error.captureStackTrace(this, SocketError);
    this.name = "SocketError";
    this.message = message || "Socket error";
    this.code = "UND_ERR_SOCKET";
    this.socket = socket;
  }
};
let NotSupportedError$2 = class NotSupportedError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, NotSupportedError);
    this.name = "NotSupportedError";
    this.message = message || "Not supported error";
    this.code = "UND_ERR_NOT_SUPPORTED";
  }
};
class BalancedPoolMissingUpstreamError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, NotSupportedError$2);
    this.name = "MissingUpstreamError";
    this.message = message || "No upstream has been added to the BalancedPool";
    this.code = "UND_ERR_BPL_MISSING_UPSTREAM";
  }
}
let HTTPParserError$1 = class HTTPParserError extends Error {
  constructor(message, code, data) {
    super(message);
    Error.captureStackTrace(this, HTTPParserError);
    this.name = "HTTPParserError";
    this.code = code ? `HPE_${code}` : void 0;
    this.data = data ? data.toString() : void 0;
  }
};
let ResponseExceededMaxSizeError$1 = class ResponseExceededMaxSizeError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ResponseExceededMaxSizeError);
    this.name = "ResponseExceededMaxSizeError";
    this.message = message || "Response content exceeded max size";
    this.code = "UND_ERR_RES_EXCEEDED_MAX_SIZE";
  }
};
var errors$1 = {
  HTTPParserError: HTTPParserError$1,
  UndiciError: UndiciError$1,
  HeadersTimeoutError: HeadersTimeoutError$1,
  HeadersOverflowError: HeadersOverflowError$1,
  BodyTimeoutError: BodyTimeoutError$1,
  RequestContentLengthMismatchError: RequestContentLengthMismatchError$1,
  ConnectTimeoutError: ConnectTimeoutError$1,
  ResponseStatusCodeError: ResponseStatusCodeError$1,
  InvalidArgumentError: InvalidArgumentError$j,
  InvalidReturnValueError: InvalidReturnValueError$2,
  RequestAbortedError: RequestAbortedError$8,
  ClientDestroyedError: ClientDestroyedError$2,
  ClientClosedError: ClientClosedError$1,
  InformationalError: InformationalError$1,
  SocketError: SocketError$3,
  NotSupportedError: NotSupportedError$2,
  ResponseContentLengthMismatchError: ResponseContentLengthMismatchError$1,
  BalancedPoolMissingUpstreamError,
  ResponseExceededMaxSizeError: ResponseExceededMaxSizeError$1
};
const assert$8 = require$$0$1;
const { kDestroyed: kDestroyed$1, kBodyUsed: kBodyUsed$1 } = symbols$4;
const { IncomingMessage } = require$$0$2;
const stream$1 = require$$0$3;
const net$2 = require$$4;
const { InvalidArgumentError: InvalidArgumentError$i } = errors$1;
const { Blob: Blob$2 } = require$$7;
const nodeUtil = require$$0$4;
const { stringify } = require$$8;
const [nodeMajor, nodeMinor] = process.versions.node.split(".").map((v) => Number(v));
function nop$1() {
}
function isStream(obj) {
  return obj && typeof obj === "object" && typeof obj.pipe === "function" && typeof obj.on === "function";
}
function isBlobLike(object) {
  return Blob$2 && object instanceof Blob$2 || object && typeof object === "object" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
}
function buildURL$2(url2, queryParams) {
  if (url2.includes("?") || url2.includes("#")) {
    throw new Error('Query params cannot be passed when url already contains "?" or "#".');
  }
  const stringified = stringify(queryParams);
  if (stringified) {
    url2 += "?" + stringified;
  }
  return url2;
}
function parseURL(url2) {
  if (typeof url2 === "string") {
    url2 = new URL(url2);
    if (!/^https?:/.test(url2.origin || url2.protocol)) {
      throw new InvalidArgumentError$i("Invalid URL protocol: the URL must start with `http:` or `https:`.");
    }
    return url2;
  }
  if (!url2 || typeof url2 !== "object") {
    throw new InvalidArgumentError$i("Invalid URL: The URL argument must be a non-null object.");
  }
  if (url2.port != null && url2.port !== "" && !Number.isFinite(parseInt(url2.port))) {
    throw new InvalidArgumentError$i("Invalid URL: port must be a valid integer or a string representation of an integer.");
  }
  if (url2.path != null && typeof url2.path !== "string") {
    throw new InvalidArgumentError$i("Invalid URL path: the path must be a string or null/undefined.");
  }
  if (url2.pathname != null && typeof url2.pathname !== "string") {
    throw new InvalidArgumentError$i("Invalid URL pathname: the pathname must be a string or null/undefined.");
  }
  if (url2.hostname != null && typeof url2.hostname !== "string") {
    throw new InvalidArgumentError$i("Invalid URL hostname: the hostname must be a string or null/undefined.");
  }
  if (url2.origin != null && typeof url2.origin !== "string") {
    throw new InvalidArgumentError$i("Invalid URL origin: the origin must be a string or null/undefined.");
  }
  if (!/^https?:/.test(url2.origin || url2.protocol)) {
    throw new InvalidArgumentError$i("Invalid URL protocol: the URL must start with `http:` or `https:`.");
  }
  if (!(url2 instanceof URL)) {
    const port = url2.port != null ? url2.port : url2.protocol === "https:" ? 443 : 80;
    let origin = url2.origin != null ? url2.origin : `${url2.protocol}//${url2.hostname}:${port}`;
    let path = url2.path != null ? url2.path : `${url2.pathname || ""}${url2.search || ""}`;
    if (origin.endsWith("/")) {
      origin = origin.substring(0, origin.length - 1);
    }
    if (path && !path.startsWith("/")) {
      path = `/${path}`;
    }
    url2 = new URL(origin + path);
  }
  return url2;
}
function parseOrigin(url2) {
  url2 = parseURL(url2);
  if (url2.pathname !== "/" || url2.search || url2.hash) {
    throw new InvalidArgumentError$i("invalid url");
  }
  return url2;
}
function getHostname(host) {
  if (host[0] === "[") {
    const idx2 = host.indexOf("]");
    assert$8(idx2 !== -1);
    return host.substr(1, idx2 - 1);
  }
  const idx = host.indexOf(":");
  if (idx === -1)
    return host;
  return host.substr(0, idx);
}
function getServerName(host) {
  if (!host) {
    return null;
  }
  assert$8.strictEqual(typeof host, "string");
  const servername = getHostname(host);
  if (net$2.isIP(servername)) {
    return "";
  }
  return servername;
}
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function isAsyncIterable(obj) {
  return !!(obj != null && typeof obj[Symbol.asyncIterator] === "function");
}
function isIterable(obj) {
  return !!(obj != null && (typeof obj[Symbol.iterator] === "function" || typeof obj[Symbol.asyncIterator] === "function"));
}
function bodyLength(body2) {
  if (body2 == null) {
    return 0;
  } else if (isStream(body2)) {
    const state = body2._readableState;
    return state && state.ended === true && Number.isFinite(state.length) ? state.length : null;
  } else if (isBlobLike(body2)) {
    return body2.size != null ? body2.size : null;
  } else if (isBuffer(body2)) {
    return body2.byteLength;
  }
  return null;
}
function isDestroyed(stream2) {
  return !stream2 || !!(stream2.destroyed || stream2[kDestroyed$1]);
}
function isReadableAborted(stream2) {
  const state = stream2 && stream2._readableState;
  return isDestroyed(stream2) && state && !state.endEmitted;
}
function destroy(stream2, err) {
  if (!isStream(stream2) || isDestroyed(stream2)) {
    return;
  }
  if (typeof stream2.destroy === "function") {
    if (Object.getPrototypeOf(stream2).constructor === IncomingMessage) {
      stream2.socket = null;
    }
    stream2.destroy(err);
  } else if (err) {
    process.nextTick((stream3, err2) => {
      stream3.emit("error", err2);
    }, stream2, err);
  }
  if (stream2.destroyed !== true) {
    stream2[kDestroyed$1] = true;
  }
}
const KEEPALIVE_TIMEOUT_EXPR = /timeout=(\d+)/;
function parseKeepAliveTimeout(val) {
  const m = val.toString().match(KEEPALIVE_TIMEOUT_EXPR);
  return m ? parseInt(m[1], 10) * 1e3 : null;
}
function parseHeaders(headers2, obj = {}) {
  for (let i = 0; i < headers2.length; i += 2) {
    const key = headers2[i].toString().toLowerCase();
    let val = obj[key];
    if (!val) {
      if (Array.isArray(headers2[i + 1])) {
        obj[key] = headers2[i + 1];
      } else {
        obj[key] = headers2[i + 1].toString("utf8");
      }
    } else {
      if (!Array.isArray(val)) {
        val = [val];
        obj[key] = val;
      }
      val.push(headers2[i + 1].toString("utf8"));
    }
  }
  if ("content-length" in obj && "content-disposition" in obj) {
    obj["content-disposition"] = Buffer.from(obj["content-disposition"]).toString("latin1");
  }
  return obj;
}
function parseRawHeaders(headers2) {
  const ret = [];
  let hasContentLength = false;
  let contentDispositionIdx = -1;
  for (let n = 0; n < headers2.length; n += 2) {
    const key = headers2[n + 0].toString();
    const val = headers2[n + 1].toString("utf8");
    if (key.length === 14 && (key === "content-length" || key.toLowerCase() === "content-length")) {
      ret.push(key, val);
      hasContentLength = true;
    } else if (key.length === 19 && (key === "content-disposition" || key.toLowerCase() === "content-disposition")) {
      contentDispositionIdx = ret.push(key, val) - 1;
    } else {
      ret.push(key, val);
    }
  }
  if (hasContentLength && contentDispositionIdx !== -1) {
    ret[contentDispositionIdx] = Buffer.from(ret[contentDispositionIdx]).toString("latin1");
  }
  return ret;
}
function isBuffer(buffer) {
  return buffer instanceof Uint8Array || Buffer.isBuffer(buffer);
}
function validateHandler(handler, method, upgrade2) {
  if (!handler || typeof handler !== "object") {
    throw new InvalidArgumentError$i("handler must be an object");
  }
  if (typeof handler.onConnect !== "function") {
    throw new InvalidArgumentError$i("invalid onConnect method");
  }
  if (typeof handler.onError !== "function") {
    throw new InvalidArgumentError$i("invalid onError method");
  }
  if (typeof handler.onBodySent !== "function" && handler.onBodySent !== void 0) {
    throw new InvalidArgumentError$i("invalid onBodySent method");
  }
  if (upgrade2 || method === "CONNECT") {
    if (typeof handler.onUpgrade !== "function") {
      throw new InvalidArgumentError$i("invalid onUpgrade method");
    }
  } else {
    if (typeof handler.onHeaders !== "function") {
      throw new InvalidArgumentError$i("invalid onHeaders method");
    }
    if (typeof handler.onData !== "function") {
      throw new InvalidArgumentError$i("invalid onData method");
    }
    if (typeof handler.onComplete !== "function") {
      throw new InvalidArgumentError$i("invalid onComplete method");
    }
  }
}
function isDisturbed(body2) {
  return !!(body2 && (stream$1.isDisturbed ? stream$1.isDisturbed(body2) || body2[kBodyUsed$1] : body2[kBodyUsed$1] || body2.readableDidRead || body2._readableState && body2._readableState.dataEmitted || isReadableAborted(body2)));
}
function isErrored(body2) {
  return !!(body2 && (stream$1.isErrored ? stream$1.isErrored(body2) : /state: 'errored'/.test(
    nodeUtil.inspect(body2)
  )));
}
function isReadable(body2) {
  return !!(body2 && (stream$1.isReadable ? stream$1.isReadable(body2) : /state: 'readable'/.test(
    nodeUtil.inspect(body2)
  )));
}
function getSocketInfo(socket) {
  return {
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    remoteAddress: socket.remoteAddress,
    remotePort: socket.remotePort,
    remoteFamily: socket.remoteFamily,
    timeout: socket.timeout,
    bytesWritten: socket.bytesWritten,
    bytesRead: socket.bytesRead
  };
}
let ReadableStream;
function ReadableStreamFrom$1(iterable) {
  if (!ReadableStream) {
    ReadableStream = require$$13.ReadableStream;
  }
  if (ReadableStream.from) {
    return ReadableStream.from(iterable);
  }
  let iterator;
  return new ReadableStream(
    {
      async start() {
        iterator = iterable[Symbol.asyncIterator]();
      },
      async pull(controller) {
        const { done, value } = await iterator.next();
        if (done) {
          queueMicrotask(() => {
            controller.close();
          });
        } else {
          const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
          controller.enqueue(new Uint8Array(buf));
        }
        return controller.desiredSize > 0;
      },
      async cancel(reason) {
        await iterator.return();
      }
    },
    0
  );
}
function isFormDataLike(object) {
  return object && typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && object[Symbol.toStringTag] === "FormData";
}
function throwIfAborted(signal) {
  if (!signal) {
    return;
  }
  if (typeof signal.throwIfAborted === "function") {
    signal.throwIfAborted();
  } else {
    if (signal.aborted) {
      const err = new Error("The operation was aborted");
      err.name = "AbortError";
      throw err;
    }
  }
}
const hasToWellFormed = !!String.prototype.toWellFormed;
function toUSVString$2(val) {
  if (hasToWellFormed) {
    return `${val}`.toWellFormed();
  } else if (nodeUtil.toUSVString) {
    return nodeUtil.toUSVString(val);
  }
  return `${val}`;
}
const kEnumerableProperty = /* @__PURE__ */ Object.create(null);
kEnumerableProperty.enumerable = true;
var util$j = {
  kEnumerableProperty,
  nop: nop$1,
  isDisturbed,
  isErrored,
  isReadable,
  toUSVString: toUSVString$2,
  isReadableAborted,
  isBlobLike,
  parseOrigin,
  parseURL,
  getServerName,
  isStream,
  isIterable,
  isAsyncIterable,
  isDestroyed,
  parseRawHeaders,
  parseHeaders,
  parseKeepAliveTimeout,
  destroy,
  bodyLength,
  deepClone,
  ReadableStreamFrom: ReadableStreamFrom$1,
  isBuffer,
  validateHandler,
  getSocketInfo,
  isFormDataLike,
  buildURL: buildURL$2,
  throwIfAborted,
  nodeMajor,
  nodeMinor,
  nodeHasAutoSelectFamily: nodeMajor > 18 || nodeMajor === 18 && nodeMinor >= 13
};
let fastNow = Date.now();
let fastNowTimeout;
const fastTimers = [];
function onTimeout() {
  fastNow = Date.now();
  let len = fastTimers.length;
  let idx = 0;
  while (idx < len) {
    const timer = fastTimers[idx];
    if (timer.state === 0) {
      timer.state = fastNow + timer.delay;
    } else if (timer.state > 0 && fastNow >= timer.state) {
      timer.state = -1;
      timer.callback(timer.opaque);
    }
    if (timer.state === -1) {
      timer.state = -2;
      if (idx !== len - 1) {
        fastTimers[idx] = fastTimers.pop();
      } else {
        fastTimers.pop();
      }
      len -= 1;
    } else {
      idx += 1;
    }
  }
  if (fastTimers.length > 0) {
    refreshTimeout();
  }
}
function refreshTimeout() {
  if (fastNowTimeout && fastNowTimeout.refresh) {
    fastNowTimeout.refresh();
  } else {
    clearTimeout(fastNowTimeout);
    fastNowTimeout = setTimeout(onTimeout, 1e3);
    if (fastNowTimeout.unref) {
      fastNowTimeout.unref();
    }
  }
}
class Timeout {
  constructor(callback, delay, opaque) {
    this.callback = callback;
    this.delay = delay;
    this.opaque = opaque;
    this.state = -2;
    this.refresh();
  }
  refresh() {
    if (this.state === -2) {
      fastTimers.push(this);
      if (!fastNowTimeout || fastTimers.length === 1) {
        refreshTimeout();
      }
    }
    this.state = 0;
  }
  clear() {
    this.state = -1;
  }
}
var timers$1 = {
  setTimeout(callback, delay, opaque) {
    return delay < 1e3 ? setTimeout(callback, delay, opaque) : new Timeout(callback, delay, opaque);
  },
  clearTimeout(timeout) {
    if (timeout instanceof Timeout) {
      timeout.clear();
    } else {
      clearTimeout(timeout);
    }
  }
};
var utils$1;
var hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1)
    return utils$1;
  hasRequiredUtils$1 = 1;
  function parseContentType(str) {
    if (str.length === 0)
      return;
    const params = /* @__PURE__ */ Object.create(null);
    let i = 0;
    for (; i < str.length; ++i) {
      const code = str.charCodeAt(i);
      if (TOKEN[code] !== 1) {
        if (code !== 47 || i === 0)
          return;
        break;
      }
    }
    if (i === str.length)
      return;
    const type = str.slice(0, i).toLowerCase();
    const subtypeStart = ++i;
    for (; i < str.length; ++i) {
      const code = str.charCodeAt(i);
      if (TOKEN[code] !== 1) {
        if (i === subtypeStart)
          return;
        if (parseContentTypeParams(str, i, params) === void 0)
          return;
        break;
      }
    }
    if (i === subtypeStart)
      return;
    const subtype = str.slice(subtypeStart, i).toLowerCase();
    return { type, subtype, params };
  }
  function parseContentTypeParams(str, i, params) {
    while (i < str.length) {
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (code !== 32 && code !== 9)
          break;
      }
      if (i === str.length)
        break;
      if (str.charCodeAt(i++) !== 59)
        return;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (code !== 32 && code !== 9)
          break;
      }
      if (i === str.length)
        return;
      let name;
      const nameStart = i;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (code !== 61)
            return;
          break;
        }
      }
      if (i === str.length)
        return;
      name = str.slice(nameStart, i);
      ++i;
      if (i === str.length)
        return;
      let value = "";
      let valueStart;
      if (str.charCodeAt(i) === 34) {
        valueStart = ++i;
        let escaping = false;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code === 92) {
            if (escaping) {
              valueStart = i;
              escaping = false;
            } else {
              value += str.slice(valueStart, i);
              escaping = true;
            }
            continue;
          }
          if (code === 34) {
            if (escaping) {
              valueStart = i;
              escaping = false;
              continue;
            }
            value += str.slice(valueStart, i);
            break;
          }
          if (escaping) {
            valueStart = i - 1;
            escaping = false;
          }
          if (QDTEXT[code] !== 1)
            return;
        }
        if (i === str.length)
          return;
        ++i;
      } else {
        valueStart = i;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (TOKEN[code] !== 1) {
            if (i === valueStart)
              return;
            break;
          }
        }
        value = str.slice(valueStart, i);
      }
      name = name.toLowerCase();
      if (params[name] === void 0)
        params[name] = value;
    }
    return params;
  }
  function parseDisposition(str, defDecoder) {
    if (str.length === 0)
      return;
    const params = /* @__PURE__ */ Object.create(null);
    let i = 0;
    for (; i < str.length; ++i) {
      const code = str.charCodeAt(i);
      if (TOKEN[code] !== 1) {
        if (parseDispositionParams(str, i, params, defDecoder) === void 0)
          return;
        break;
      }
    }
    const type = str.slice(0, i).toLowerCase();
    return { type, params };
  }
  function parseDispositionParams(str, i, params, defDecoder) {
    while (i < str.length) {
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (code !== 32 && code !== 9)
          break;
      }
      if (i === str.length)
        break;
      if (str.charCodeAt(i++) !== 59)
        return;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (code !== 32 && code !== 9)
          break;
      }
      if (i === str.length)
        return;
      let name;
      const nameStart = i;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (code === 61)
            break;
          return;
        }
      }
      if (i === str.length)
        return;
      let value = "";
      let valueStart;
      let charset;
      name = str.slice(nameStart, i);
      if (name.charCodeAt(name.length - 1) === 42) {
        const charsetStart = ++i;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (CHARSET[code] !== 1) {
            if (code !== 39)
              return;
            break;
          }
        }
        if (i === str.length)
          return;
        charset = str.slice(charsetStart, i);
        ++i;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code === 39)
            break;
        }
        if (i === str.length)
          return;
        ++i;
        if (i === str.length)
          return;
        valueStart = i;
        let encode = 0;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (EXTENDED_VALUE[code] !== 1) {
            if (code === 37) {
              let hexUpper;
              let hexLower;
              if (i + 2 < str.length && (hexUpper = HEX_VALUES[str.charCodeAt(i + 1)]) !== -1 && (hexLower = HEX_VALUES[str.charCodeAt(i + 2)]) !== -1) {
                const byteVal = (hexUpper << 4) + hexLower;
                value += str.slice(valueStart, i);
                value += String.fromCharCode(byteVal);
                i += 2;
                valueStart = i + 1;
                if (byteVal >= 128)
                  encode = 2;
                else if (encode === 0)
                  encode = 1;
                continue;
              }
              return;
            }
            break;
          }
        }
        value += str.slice(valueStart, i);
        value = convertToUTF8(value, charset, encode);
        if (value === void 0)
          return;
      } else {
        ++i;
        if (i === str.length)
          return;
        if (str.charCodeAt(i) === 34) {
          valueStart = ++i;
          let escaping = false;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (code === 92) {
              if (escaping) {
                valueStart = i;
                escaping = false;
              } else {
                value += str.slice(valueStart, i);
                escaping = true;
              }
              continue;
            }
            if (code === 34) {
              if (escaping) {
                valueStart = i;
                escaping = false;
                continue;
              }
              value += str.slice(valueStart, i);
              break;
            }
            if (escaping) {
              valueStart = i - 1;
              escaping = false;
            }
            if (QDTEXT[code] !== 1)
              return;
          }
          if (i === str.length)
            return;
          ++i;
        } else {
          valueStart = i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (TOKEN[code] !== 1) {
              if (i === valueStart)
                return;
              break;
            }
          }
          value = str.slice(valueStart, i);
        }
        value = defDecoder(value, 2);
        if (value === void 0)
          return;
      }
      name = name.toLowerCase();
      if (params[name] === void 0)
        params[name] = value;
    }
    return params;
  }
  function getDecoder(charset) {
    let lc;
    while (true) {
      switch (charset) {
        case "utf-8":
        case "utf8":
          return decoders.utf8;
        case "latin1":
        case "ascii":
        case "us-ascii":
        case "iso-8859-1":
        case "iso8859-1":
        case "iso88591":
        case "iso_8859-1":
        case "windows-1252":
        case "iso_8859-1:1987":
        case "cp1252":
        case "x-cp1252":
          return decoders.latin1;
        case "utf16le":
        case "utf-16le":
        case "ucs2":
        case "ucs-2":
          return decoders.utf16le;
        case "base64":
          return decoders.base64;
        default:
          if (lc === void 0) {
            lc = true;
            charset = charset.toLowerCase();
            continue;
          }
          return decoders.other.bind(charset);
      }
    }
  }
  const decoders = {
    utf8: (data, hint) => {
      if (data.length === 0)
        return "";
      if (typeof data === "string") {
        if (hint < 2)
          return data;
        data = Buffer.from(data, "latin1");
      }
      return data.utf8Slice(0, data.length);
    },
    latin1: (data, hint) => {
      if (data.length === 0)
        return "";
      if (typeof data === "string")
        return data;
      return data.latin1Slice(0, data.length);
    },
    utf16le: (data, hint) => {
      if (data.length === 0)
        return "";
      if (typeof data === "string")
        data = Buffer.from(data, "latin1");
      return data.ucs2Slice(0, data.length);
    },
    base64: (data, hint) => {
      if (data.length === 0)
        return "";
      if (typeof data === "string")
        data = Buffer.from(data, "latin1");
      return data.base64Slice(0, data.length);
    },
    other: (data, hint) => {
      if (data.length === 0)
        return "";
      if (typeof data === "string")
        data = Buffer.from(data, "latin1");
      try {
        const decoder = new TextDecoder(this);
        return decoder.decode(data);
      } catch {
      }
    }
  };
  function convertToUTF8(data, charset, hint) {
    const decode = getDecoder(charset);
    if (decode)
      return decode(data, hint);
  }
  function basename2(path) {
    if (typeof path !== "string")
      return "";
    for (let i = path.length - 1; i >= 0; --i) {
      switch (path.charCodeAt(i)) {
        case 47:
        case 92:
          path = path.slice(i + 1);
          return path === ".." || path === "." ? "" : path;
      }
    }
    return path === ".." || path === "." ? "" : path;
  }
  const TOKEN = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  const QDTEXT = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ];
  const CHARSET = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  const EXTENDED_VALUE = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  const HEX_VALUES = [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
  ];
  utils$1 = {
    basename: basename2,
    convertToUTF8,
    getDecoder,
    parseContentType,
    parseDisposition
  };
  return utils$1;
}
var sbmh;
var hasRequiredSbmh;
function requireSbmh() {
  if (hasRequiredSbmh)
    return sbmh;
  hasRequiredSbmh = 1;
  function memcmp(buf1, pos1, buf2, pos2, num) {
    for (let i = 0; i < num; ++i) {
      if (buf1[pos1 + i] !== buf2[pos2 + i])
        return false;
    }
    return true;
  }
  class SBMH {
    constructor(needle, cb) {
      if (typeof cb !== "function")
        throw new Error("Missing match callback");
      if (typeof needle === "string")
        needle = Buffer.from(needle);
      else if (!Buffer.isBuffer(needle))
        throw new Error(`Expected Buffer for needle, got ${typeof needle}`);
      const needleLen = needle.length;
      this.maxMatches = Infinity;
      this.matches = 0;
      this._cb = cb;
      this._lookbehindSize = 0;
      this._needle = needle;
      this._bufPos = 0;
      this._lookbehind = Buffer.allocUnsafe(needleLen);
      this._occ = [
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen,
        needleLen
      ];
      if (needleLen > 1) {
        for (let i = 0; i < needleLen - 1; ++i)
          this._occ[needle[i]] = needleLen - 1 - i;
      }
    }
    reset() {
      this.matches = 0;
      this._lookbehindSize = 0;
      this._bufPos = 0;
    }
    push(chunk, pos) {
      let result;
      if (!Buffer.isBuffer(chunk))
        chunk = Buffer.from(chunk, "latin1");
      const chunkLen = chunk.length;
      this._bufPos = pos || 0;
      while (result !== chunkLen && this.matches < this.maxMatches)
        result = feed(this, chunk);
      return result;
    }
    destroy() {
      const lbSize = this._lookbehindSize;
      if (lbSize)
        this._cb(false, this._lookbehind, 0, lbSize, false);
      this.reset();
    }
  }
  function feed(self2, data) {
    const len = data.length;
    const needle = self2._needle;
    const needleLen = needle.length;
    let pos = -self2._lookbehindSize;
    const lastNeedleCharPos = needleLen - 1;
    const lastNeedleChar = needle[lastNeedleCharPos];
    const end = len - needleLen;
    const occ = self2._occ;
    const lookbehind = self2._lookbehind;
    if (pos < 0) {
      while (pos < 0 && pos <= end) {
        const nextPos = pos + lastNeedleCharPos;
        const ch = nextPos < 0 ? lookbehind[self2._lookbehindSize + nextPos] : data[nextPos];
        if (ch === lastNeedleChar && matchNeedle(self2, data, pos, lastNeedleCharPos)) {
          self2._lookbehindSize = 0;
          ++self2.matches;
          if (pos > -self2._lookbehindSize)
            self2._cb(true, lookbehind, 0, self2._lookbehindSize + pos, false);
          else
            self2._cb(true, void 0, 0, 0, true);
          return self2._bufPos = pos + needleLen;
        }
        pos += occ[ch];
      }
      while (pos < 0 && !matchNeedle(self2, data, pos, len - pos))
        ++pos;
      if (pos < 0) {
        const bytesToCutOff = self2._lookbehindSize + pos;
        if (bytesToCutOff > 0) {
          self2._cb(false, lookbehind, 0, bytesToCutOff, false);
        }
        self2._lookbehindSize -= bytesToCutOff;
        lookbehind.copy(lookbehind, 0, bytesToCutOff, self2._lookbehindSize);
        lookbehind.set(data, self2._lookbehindSize);
        self2._lookbehindSize += len;
        self2._bufPos = len;
        return len;
      }
      self2._cb(false, lookbehind, 0, self2._lookbehindSize, false);
      self2._lookbehindSize = 0;
    }
    pos += self2._bufPos;
    const firstNeedleChar = needle[0];
    while (pos <= end) {
      const ch = data[pos + lastNeedleCharPos];
      if (ch === lastNeedleChar && data[pos] === firstNeedleChar && memcmp(needle, 0, data, pos, lastNeedleCharPos)) {
        ++self2.matches;
        if (pos > 0)
          self2._cb(true, data, self2._bufPos, pos, true);
        else
          self2._cb(true, void 0, 0, 0, true);
        return self2._bufPos = pos + needleLen;
      }
      pos += occ[ch];
    }
    while (pos < len) {
      if (data[pos] !== firstNeedleChar || !memcmp(data, pos, needle, 0, len - pos)) {
        ++pos;
        continue;
      }
      data.copy(lookbehind, 0, pos, len);
      self2._lookbehindSize = len - pos;
      break;
    }
    if (pos > 0)
      self2._cb(false, data, self2._bufPos, pos < len ? pos : len, true);
    self2._bufPos = len;
    return len;
  }
  function matchNeedle(self2, data, pos, len) {
    const lb = self2._lookbehind;
    const lbSize = self2._lookbehindSize;
    const needle = self2._needle;
    for (let i = 0; i < len; ++i, ++pos) {
      const ch = pos < 0 ? lb[lbSize + pos] : data[pos];
      if (ch !== needle[i])
        return false;
    }
    return true;
  }
  sbmh = SBMH;
  return sbmh;
}
var multipart;
var hasRequiredMultipart;
function requireMultipart() {
  if (hasRequiredMultipart)
    return multipart;
  hasRequiredMultipart = 1;
  const { Readable: Readable2, Writable } = require$$0$3;
  const StreamSearch = requireSbmh();
  const {
    basename: basename2,
    convertToUTF8,
    getDecoder,
    parseContentType,
    parseDisposition
  } = requireUtils$1();
  const BUF_CRLF = Buffer.from("\r\n");
  const BUF_CR = Buffer.from("\r");
  const BUF_DASH = Buffer.from("-");
  function noop() {
  }
  const MAX_HEADER_PAIRS = 2e3;
  const MAX_HEADER_SIZE = 16 * 1024;
  const HPARSER_NAME = 0;
  const HPARSER_PRE_OWS = 1;
  const HPARSER_VALUE = 2;
  class HeaderParser {
    constructor(cb) {
      this.header = /* @__PURE__ */ Object.create(null);
      this.pairCount = 0;
      this.byteCount = 0;
      this.state = HPARSER_NAME;
      this.name = "";
      this.value = "";
      this.crlf = 0;
      this.cb = cb;
    }
    reset() {
      this.header = /* @__PURE__ */ Object.create(null);
      this.pairCount = 0;
      this.byteCount = 0;
      this.state = HPARSER_NAME;
      this.name = "";
      this.value = "";
      this.crlf = 0;
    }
    push(chunk, pos, end) {
      let start = pos;
      while (pos < end) {
        switch (this.state) {
          case HPARSER_NAME: {
            let done = false;
            for (; pos < end; ++pos) {
              if (this.byteCount === MAX_HEADER_SIZE)
                return -1;
              ++this.byteCount;
              const code = chunk[pos];
              if (TOKEN[code] !== 1) {
                if (code !== 58)
                  return -1;
                this.name += chunk.latin1Slice(start, pos);
                if (this.name.length === 0)
                  return -1;
                ++pos;
                done = true;
                this.state = HPARSER_PRE_OWS;
                break;
              }
            }
            if (!done) {
              this.name += chunk.latin1Slice(start, pos);
              break;
            }
          }
          case HPARSER_PRE_OWS: {
            let done = false;
            for (; pos < end; ++pos) {
              if (this.byteCount === MAX_HEADER_SIZE)
                return -1;
              ++this.byteCount;
              const code = chunk[pos];
              if (code !== 32 && code !== 9) {
                start = pos;
                done = true;
                this.state = HPARSER_VALUE;
                break;
              }
            }
            if (!done)
              break;
          }
          case HPARSER_VALUE:
            switch (this.crlf) {
              case 0:
                for (; pos < end; ++pos) {
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  const code = chunk[pos];
                  if (FIELD_VCHAR[code] !== 1) {
                    if (code !== 13)
                      return -1;
                    ++this.crlf;
                    break;
                  }
                }
                this.value += chunk.latin1Slice(start, pos++);
                break;
              case 1:
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                if (chunk[pos++] !== 10)
                  return -1;
                ++this.crlf;
                break;
              case 2: {
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                const code = chunk[pos];
                if (code === 32 || code === 9) {
                  start = pos;
                  this.crlf = 0;
                } else {
                  if (++this.pairCount < MAX_HEADER_PAIRS) {
                    this.name = this.name.toLowerCase();
                    if (this.header[this.name] === void 0)
                      this.header[this.name] = [this.value];
                    else
                      this.header[this.name].push(this.value);
                  }
                  if (code === 13) {
                    ++this.crlf;
                    ++pos;
                  } else {
                    start = pos;
                    this.crlf = 0;
                    this.state = HPARSER_NAME;
                    this.name = "";
                    this.value = "";
                  }
                }
                break;
              }
              case 3: {
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                if (chunk[pos++] !== 10)
                  return -1;
                const header = this.header;
                this.reset();
                this.cb(header);
                return pos;
              }
            }
            break;
        }
      }
      return pos;
    }
  }
  class FileStream extends Readable2 {
    constructor(opts, owner) {
      super(opts);
      this.truncated = false;
      this._readcb = null;
      this.once("end", () => {
        this._read();
        if (--owner._fileEndsLeft === 0 && owner._finalcb) {
          const cb = owner._finalcb;
          owner._finalcb = null;
          process.nextTick(cb);
        }
      });
    }
    _read(n) {
      const cb = this._readcb;
      if (cb) {
        this._readcb = null;
        cb();
      }
    }
  }
  const ignoreData = {
    push: (chunk, pos) => {
    },
    destroy: () => {
    }
  };
  function callAndUnsetCb(self2, err) {
    const cb = self2._writecb;
    self2._writecb = null;
    if (err)
      self2.destroy(err);
    else if (cb)
      cb();
  }
  function nullDecoder(val, hint) {
    return val;
  }
  class Multipart extends Writable {
    constructor(cfg) {
      const streamOpts = {
        autoDestroy: true,
        emitClose: true,
        highWaterMark: typeof cfg.highWaterMark === "number" ? cfg.highWaterMark : void 0
      };
      super(streamOpts);
      if (!cfg.conType.params || typeof cfg.conType.params.boundary !== "string")
        throw new Error("Multipart: Boundary not found");
      const boundary = cfg.conType.params.boundary;
      const paramDecoder = typeof cfg.defParamCharset === "string" && cfg.defParamCharset ? getDecoder(cfg.defParamCharset) : nullDecoder;
      const defCharset = cfg.defCharset || "utf8";
      const preservePath = cfg.preservePath;
      const fileOpts = {
        autoDestroy: true,
        emitClose: true,
        highWaterMark: typeof cfg.fileHwm === "number" ? cfg.fileHwm : void 0
      };
      const limits = cfg.limits;
      const fieldSizeLimit = limits && typeof limits.fieldSize === "number" ? limits.fieldSize : 1 * 1024 * 1024;
      const fileSizeLimit = limits && typeof limits.fileSize === "number" ? limits.fileSize : Infinity;
      const filesLimit = limits && typeof limits.files === "number" ? limits.files : Infinity;
      const fieldsLimit = limits && typeof limits.fields === "number" ? limits.fields : Infinity;
      const partsLimit = limits && typeof limits.parts === "number" ? limits.parts : Infinity;
      let parts = -1;
      let fields = 0;
      let files = 0;
      let skipPart = false;
      this._fileEndsLeft = 0;
      this._fileStream = void 0;
      this._complete = false;
      let fileSize = 0;
      let field;
      let fieldSize = 0;
      let partCharset;
      let partEncoding;
      let partType;
      let partName;
      let partTruncated = false;
      let hitFilesLimit = false;
      let hitFieldsLimit = false;
      this._hparser = null;
      const hparser = new HeaderParser((header) => {
        this._hparser = null;
        skipPart = false;
        partType = "text/plain";
        partCharset = defCharset;
        partEncoding = "7bit";
        partName = void 0;
        partTruncated = false;
        let filename;
        if (!header["content-disposition"]) {
          skipPart = true;
          return;
        }
        const disp = parseDisposition(
          header["content-disposition"][0],
          paramDecoder
        );
        if (!disp || disp.type !== "form-data") {
          skipPart = true;
          return;
        }
        if (disp.params) {
          if (disp.params.name)
            partName = disp.params.name;
          if (disp.params["filename*"])
            filename = disp.params["filename*"];
          else if (disp.params.filename)
            filename = disp.params.filename;
          if (filename !== void 0 && !preservePath)
            filename = basename2(filename);
        }
        if (header["content-type"]) {
          const conType = parseContentType(header["content-type"][0]);
          if (conType) {
            partType = `${conType.type}/${conType.subtype}`;
            if (conType.params && typeof conType.params.charset === "string")
              partCharset = conType.params.charset.toLowerCase();
          }
        }
        if (header["content-transfer-encoding"])
          partEncoding = header["content-transfer-encoding"][0].toLowerCase();
        if (partType === "application/octet-stream" || filename !== void 0) {
          if (files === filesLimit) {
            if (!hitFilesLimit) {
              hitFilesLimit = true;
              this.emit("filesLimit");
            }
            skipPart = true;
            return;
          }
          ++files;
          if (this.listenerCount("file") === 0) {
            skipPart = true;
            return;
          }
          fileSize = 0;
          this._fileStream = new FileStream(fileOpts, this);
          ++this._fileEndsLeft;
          this.emit(
            "file",
            partName,
            this._fileStream,
            {
              filename,
              encoding: partEncoding,
              mimeType: partType
            }
          );
        } else {
          if (fields === fieldsLimit) {
            if (!hitFieldsLimit) {
              hitFieldsLimit = true;
              this.emit("fieldsLimit");
            }
            skipPart = true;
            return;
          }
          ++fields;
          if (this.listenerCount("field") === 0) {
            skipPart = true;
            return;
          }
          field = [];
          fieldSize = 0;
        }
      });
      let matchPostBoundary = 0;
      const ssCb = (isMatch, data, start, end, isDataSafe) => {
        retrydata:
          while (data) {
            if (this._hparser !== null) {
              const ret = this._hparser.push(data, start, end);
              if (ret === -1) {
                this._hparser = null;
                hparser.reset();
                this.emit("error", new Error("Malformed part header"));
                break;
              }
              start = ret;
            }
            if (start === end)
              break;
            if (matchPostBoundary !== 0) {
              if (matchPostBoundary === 1) {
                switch (data[start]) {
                  case 45:
                    matchPostBoundary = 2;
                    ++start;
                    break;
                  case 13:
                    matchPostBoundary = 3;
                    ++start;
                    break;
                  default:
                    matchPostBoundary = 0;
                }
                if (start === end)
                  return;
              }
              if (matchPostBoundary === 2) {
                matchPostBoundary = 0;
                if (data[start] === 45) {
                  this._complete = true;
                  this._bparser = ignoreData;
                  return;
                }
                const writecb = this._writecb;
                this._writecb = noop;
                ssCb(false, BUF_DASH, 0, 1, false);
                this._writecb = writecb;
              } else if (matchPostBoundary === 3) {
                matchPostBoundary = 0;
                if (data[start] === 10) {
                  ++start;
                  if (parts >= partsLimit)
                    break;
                  this._hparser = hparser;
                  if (start === end)
                    break;
                  continue retrydata;
                } else {
                  const writecb = this._writecb;
                  this._writecb = noop;
                  ssCb(false, BUF_CR, 0, 1, false);
                  this._writecb = writecb;
                }
              }
            }
            if (!skipPart) {
              if (this._fileStream) {
                let chunk;
                const actualLen = Math.min(end - start, fileSizeLimit - fileSize);
                if (!isDataSafe) {
                  chunk = Buffer.allocUnsafe(actualLen);
                  data.copy(chunk, 0, start, start + actualLen);
                } else {
                  chunk = data.slice(start, start + actualLen);
                }
                fileSize += chunk.length;
                if (fileSize === fileSizeLimit) {
                  if (chunk.length > 0)
                    this._fileStream.push(chunk);
                  this._fileStream.emit("limit");
                  this._fileStream.truncated = true;
                  skipPart = true;
                } else if (!this._fileStream.push(chunk)) {
                  if (this._writecb)
                    this._fileStream._readcb = this._writecb;
                  this._writecb = null;
                }
              } else if (field !== void 0) {
                let chunk;
                const actualLen = Math.min(
                  end - start,
                  fieldSizeLimit - fieldSize
                );
                if (!isDataSafe) {
                  chunk = Buffer.allocUnsafe(actualLen);
                  data.copy(chunk, 0, start, start + actualLen);
                } else {
                  chunk = data.slice(start, start + actualLen);
                }
                fieldSize += actualLen;
                field.push(chunk);
                if (fieldSize === fieldSizeLimit) {
                  skipPart = true;
                  partTruncated = true;
                }
              }
            }
            break;
          }
        if (isMatch) {
          matchPostBoundary = 1;
          if (this._fileStream) {
            this._fileStream.push(null);
            this._fileStream = null;
          } else if (field !== void 0) {
            let data2;
            switch (field.length) {
              case 0:
                data2 = "";
                break;
              case 1:
                data2 = convertToUTF8(field[0], partCharset, 0);
                break;
              default:
                data2 = convertToUTF8(
                  Buffer.concat(field, fieldSize),
                  partCharset,
                  0
                );
            }
            field = void 0;
            fieldSize = 0;
            this.emit(
              "field",
              partName,
              data2,
              {
                nameTruncated: false,
                valueTruncated: partTruncated,
                encoding: partEncoding,
                mimeType: partType
              }
            );
          }
          if (++parts === partsLimit)
            this.emit("partsLimit");
        }
      };
      this._bparser = new StreamSearch(`\r
--${boundary}`, ssCb);
      this._writecb = null;
      this._finalcb = null;
      this.write(BUF_CRLF);
    }
    static detect(conType) {
      return conType.type === "multipart" && conType.subtype === "form-data";
    }
    _write(chunk, enc, cb) {
      this._writecb = cb;
      this._bparser.push(chunk, 0);
      if (this._writecb)
        callAndUnsetCb(this);
    }
    _destroy(err, cb) {
      this._hparser = null;
      this._bparser = ignoreData;
      if (!err)
        err = checkEndState(this);
      const fileStream = this._fileStream;
      if (fileStream) {
        this._fileStream = null;
        fileStream.destroy(err);
      }
      cb(err);
    }
    _final(cb) {
      this._bparser.destroy();
      if (!this._complete)
        return cb(new Error("Unexpected end of form"));
      if (this._fileEndsLeft)
        this._finalcb = finalcb.bind(null, this, cb);
      else
        finalcb(this, cb);
    }
  }
  function finalcb(self2, cb, err) {
    if (err)
      return cb(err);
    err = checkEndState(self2);
    cb(err);
  }
  function checkEndState(self2) {
    if (self2._hparser)
      return new Error("Malformed part header");
    const fileStream = self2._fileStream;
    if (fileStream) {
      self2._fileStream = null;
      fileStream.destroy(new Error("Unexpected end of file"));
    }
    if (!self2._complete)
      return new Error("Unexpected end of form");
  }
  const TOKEN = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  const FIELD_VCHAR = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ];
  multipart = Multipart;
  return multipart;
}
var urlencoded;
var hasRequiredUrlencoded;
function requireUrlencoded() {
  if (hasRequiredUrlencoded)
    return urlencoded;
  hasRequiredUrlencoded = 1;
  const { Writable } = require$$0$3;
  const { getDecoder } = requireUtils$1();
  class URLEncoded extends Writable {
    constructor(cfg) {
      const streamOpts = {
        autoDestroy: true,
        emitClose: true,
        highWaterMark: typeof cfg.highWaterMark === "number" ? cfg.highWaterMark : void 0
      };
      super(streamOpts);
      let charset = cfg.defCharset || "utf8";
      if (cfg.conType.params && typeof cfg.conType.params.charset === "string")
        charset = cfg.conType.params.charset;
      this.charset = charset;
      const limits = cfg.limits;
      this.fieldSizeLimit = limits && typeof limits.fieldSize === "number" ? limits.fieldSize : 1 * 1024 * 1024;
      this.fieldsLimit = limits && typeof limits.fields === "number" ? limits.fields : Infinity;
      this.fieldNameSizeLimit = limits && typeof limits.fieldNameSize === "number" ? limits.fieldNameSize : 100;
      this._inKey = true;
      this._keyTrunc = false;
      this._valTrunc = false;
      this._bytesKey = 0;
      this._bytesVal = 0;
      this._fields = 0;
      this._key = "";
      this._val = "";
      this._byte = -2;
      this._lastPos = 0;
      this._encode = 0;
      this._decoder = getDecoder(charset);
    }
    static detect(conType) {
      return conType.type === "application" && conType.subtype === "x-www-form-urlencoded";
    }
    _write(chunk, enc, cb) {
      if (this._fields >= this.fieldsLimit)
        return cb();
      let i = 0;
      const len = chunk.length;
      this._lastPos = 0;
      if (this._byte !== -2) {
        i = readPctEnc(this, chunk, i, len);
        if (i === -1)
          return cb(new Error("Malformed urlencoded form"));
        if (i >= len)
          return cb();
        if (this._inKey)
          ++this._bytesKey;
        else
          ++this._bytesVal;
      }
      main:
        while (i < len) {
          if (this._inKey) {
            i = skipKeyBytes(this, chunk, i, len);
            while (i < len) {
              switch (chunk[i]) {
                case 61:
                  if (this._lastPos < i)
                    this._key += chunk.latin1Slice(this._lastPos, i);
                  this._lastPos = ++i;
                  this._key = this._decoder(this._key, this._encode);
                  this._encode = 0;
                  this._inKey = false;
                  continue main;
                case 38:
                  if (this._lastPos < i)
                    this._key += chunk.latin1Slice(this._lastPos, i);
                  this._lastPos = ++i;
                  this._key = this._decoder(this._key, this._encode);
                  this._encode = 0;
                  if (this._bytesKey > 0) {
                    this.emit(
                      "field",
                      this._key,
                      "",
                      {
                        nameTruncated: this._keyTrunc,
                        valueTruncated: false,
                        encoding: this.charset,
                        mimeType: "text/plain"
                      }
                    );
                  }
                  this._key = "";
                  this._val = "";
                  this._keyTrunc = false;
                  this._valTrunc = false;
                  this._bytesKey = 0;
                  this._bytesVal = 0;
                  if (++this._fields >= this.fieldsLimit) {
                    this.emit("fieldsLimit");
                    return cb();
                  }
                  continue;
                case 43:
                  if (this._lastPos < i)
                    this._key += chunk.latin1Slice(this._lastPos, i);
                  this._key += " ";
                  this._lastPos = i + 1;
                  break;
                case 37:
                  if (this._encode === 0)
                    this._encode = 1;
                  if (this._lastPos < i)
                    this._key += chunk.latin1Slice(this._lastPos, i);
                  this._lastPos = i + 1;
                  this._byte = -1;
                  i = readPctEnc(this, chunk, i + 1, len);
                  if (i === -1)
                    return cb(new Error("Malformed urlencoded form"));
                  if (i >= len)
                    return cb();
                  ++this._bytesKey;
                  i = skipKeyBytes(this, chunk, i, len);
                  continue;
              }
              ++i;
              ++this._bytesKey;
              i = skipKeyBytes(this, chunk, i, len);
            }
            if (this._lastPos < i)
              this._key += chunk.latin1Slice(this._lastPos, i);
          } else {
            i = skipValBytes(this, chunk, i, len);
            while (i < len) {
              switch (chunk[i]) {
                case 38:
                  if (this._lastPos < i)
                    this._val += chunk.latin1Slice(this._lastPos, i);
                  this._lastPos = ++i;
                  this._inKey = true;
                  this._val = this._decoder(this._val, this._encode);
                  this._encode = 0;
                  if (this._bytesKey > 0 || this._bytesVal > 0) {
                    this.emit(
                      "field",
                      this._key,
                      this._val,
                      {
                        nameTruncated: this._keyTrunc,
                        valueTruncated: this._valTrunc,
                        encoding: this.charset,
                        mimeType: "text/plain"
                      }
                    );
                  }
                  this._key = "";
                  this._val = "";
                  this._keyTrunc = false;
                  this._valTrunc = false;
                  this._bytesKey = 0;
                  this._bytesVal = 0;
                  if (++this._fields >= this.fieldsLimit) {
                    this.emit("fieldsLimit");
                    return cb();
                  }
                  continue main;
                case 43:
                  if (this._lastPos < i)
                    this._val += chunk.latin1Slice(this._lastPos, i);
                  this._val += " ";
                  this._lastPos = i + 1;
                  break;
                case 37:
                  if (this._encode === 0)
                    this._encode = 1;
                  if (this._lastPos < i)
                    this._val += chunk.latin1Slice(this._lastPos, i);
                  this._lastPos = i + 1;
                  this._byte = -1;
                  i = readPctEnc(this, chunk, i + 1, len);
                  if (i === -1)
                    return cb(new Error("Malformed urlencoded form"));
                  if (i >= len)
                    return cb();
                  ++this._bytesVal;
                  i = skipValBytes(this, chunk, i, len);
                  continue;
              }
              ++i;
              ++this._bytesVal;
              i = skipValBytes(this, chunk, i, len);
            }
            if (this._lastPos < i)
              this._val += chunk.latin1Slice(this._lastPos, i);
          }
        }
      cb();
    }
    _final(cb) {
      if (this._byte !== -2)
        return cb(new Error("Malformed urlencoded form"));
      if (!this._inKey || this._bytesKey > 0 || this._bytesVal > 0) {
        if (this._inKey)
          this._key = this._decoder(this._key, this._encode);
        else
          this._val = this._decoder(this._val, this._encode);
        this.emit(
          "field",
          this._key,
          this._val,
          {
            nameTruncated: this._keyTrunc,
            valueTruncated: this._valTrunc,
            encoding: this.charset,
            mimeType: "text/plain"
          }
        );
      }
      cb();
    }
  }
  function readPctEnc(self2, chunk, pos, len) {
    if (pos >= len)
      return len;
    if (self2._byte === -1) {
      const hexUpper = HEX_VALUES[chunk[pos++]];
      if (hexUpper === -1)
        return -1;
      if (hexUpper >= 8)
        self2._encode = 2;
      if (pos < len) {
        const hexLower = HEX_VALUES[chunk[pos++]];
        if (hexLower === -1)
          return -1;
        if (self2._inKey)
          self2._key += String.fromCharCode((hexUpper << 4) + hexLower);
        else
          self2._val += String.fromCharCode((hexUpper << 4) + hexLower);
        self2._byte = -2;
        self2._lastPos = pos;
      } else {
        self2._byte = hexUpper;
      }
    } else {
      const hexLower = HEX_VALUES[chunk[pos++]];
      if (hexLower === -1)
        return -1;
      if (self2._inKey)
        self2._key += String.fromCharCode((self2._byte << 4) + hexLower);
      else
        self2._val += String.fromCharCode((self2._byte << 4) + hexLower);
      self2._byte = -2;
      self2._lastPos = pos;
    }
    return pos;
  }
  function skipKeyBytes(self2, chunk, pos, len) {
    if (self2._bytesKey > self2.fieldNameSizeLimit) {
      if (!self2._keyTrunc) {
        if (self2._lastPos < pos)
          self2._key += chunk.latin1Slice(self2._lastPos, pos - 1);
      }
      self2._keyTrunc = true;
      for (; pos < len; ++pos) {
        const code = chunk[pos];
        if (code === 61 || code === 38)
          break;
        ++self2._bytesKey;
      }
      self2._lastPos = pos;
    }
    return pos;
  }
  function skipValBytes(self2, chunk, pos, len) {
    if (self2._bytesVal > self2.fieldSizeLimit) {
      if (!self2._valTrunc) {
        if (self2._lastPos < pos)
          self2._val += chunk.latin1Slice(self2._lastPos, pos - 1);
      }
      self2._valTrunc = true;
      for (; pos < len; ++pos) {
        if (chunk[pos] === 38)
          break;
        ++self2._bytesVal;
      }
      self2._lastPos = pos;
    }
    return pos;
  }
  const HEX_VALUES = [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
  ];
  urlencoded = URLEncoded;
  return urlencoded;
}
var lib;
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib)
    return lib;
  hasRequiredLib = 1;
  const { parseContentType } = requireUtils$1();
  function getInstance(cfg) {
    const headers2 = cfg.headers;
    const conType = parseContentType(headers2["content-type"]);
    if (!conType)
      throw new Error("Malformed content type");
    for (const type of TYPES) {
      const matched = type.detect(conType);
      if (!matched)
        continue;
      const instanceCfg = {
        limits: cfg.limits,
        headers: headers2,
        conType,
        highWaterMark: void 0,
        fileHwm: void 0,
        defCharset: void 0,
        defParamCharset: void 0,
        preservePath: false
      };
      if (cfg.highWaterMark)
        instanceCfg.highWaterMark = cfg.highWaterMark;
      if (cfg.fileHwm)
        instanceCfg.fileHwm = cfg.fileHwm;
      instanceCfg.defCharset = cfg.defCharset;
      instanceCfg.defParamCharset = cfg.defParamCharset;
      instanceCfg.preservePath = cfg.preservePath;
      return new type(instanceCfg);
    }
    throw new Error(`Unsupported content type: ${headers2["content-type"]}`);
  }
  const TYPES = [
    requireMultipart(),
    requireUrlencoded()
  ].filter(function(typemod) {
    return typeof typemod.detect === "function";
  });
  lib = (cfg) => {
    if (typeof cfg !== "object" || cfg === null)
      cfg = {};
    if (typeof cfg.headers !== "object" || cfg.headers === null || typeof cfg.headers["content-type"] !== "string") {
      throw new Error("Missing Content-Type");
    }
    return getInstance(cfg);
  };
  return lib;
}
var constants$4;
var hasRequiredConstants$3;
function requireConstants$3() {
  if (hasRequiredConstants$3)
    return constants$4;
  hasRequiredConstants$3 = 1;
  const { MessageChannel, receiveMessageOnPort } = require$$0$5;
  const corsSafeListedMethods = ["GET", "HEAD", "POST"];
  const nullBodyStatus = [101, 204, 205, 304];
  const redirectStatus = [301, 302, 303, 307, 308];
  const badPorts = [
    "1",
    "7",
    "9",
    "11",
    "13",
    "15",
    "17",
    "19",
    "20",
    "21",
    "22",
    "23",
    "25",
    "37",
    "42",
    "43",
    "53",
    "69",
    "77",
    "79",
    "87",
    "95",
    "101",
    "102",
    "103",
    "104",
    "109",
    "110",
    "111",
    "113",
    "115",
    "117",
    "119",
    "123",
    "135",
    "137",
    "139",
    "143",
    "161",
    "179",
    "389",
    "427",
    "465",
    "512",
    "513",
    "514",
    "515",
    "526",
    "530",
    "531",
    "532",
    "540",
    "548",
    "554",
    "556",
    "563",
    "587",
    "601",
    "636",
    "989",
    "990",
    "993",
    "995",
    "1719",
    "1720",
    "1723",
    "2049",
    "3659",
    "4045",
    "5060",
    "5061",
    "6000",
    "6566",
    "6665",
    "6666",
    "6667",
    "6668",
    "6669",
    "6697",
    "10080"
  ];
  const referrerPolicy = [
    "",
    "no-referrer",
    "no-referrer-when-downgrade",
    "same-origin",
    "origin",
    "strict-origin",
    "origin-when-cross-origin",
    "strict-origin-when-cross-origin",
    "unsafe-url"
  ];
  const requestRedirect = ["follow", "manual", "error"];
  const safeMethods = ["GET", "HEAD", "OPTIONS", "TRACE"];
  const requestMode = ["navigate", "same-origin", "no-cors", "cors"];
  const requestCredentials = ["omit", "same-origin", "include"];
  const requestCache = [
    "default",
    "no-store",
    "reload",
    "no-cache",
    "force-cache",
    "only-if-cached"
  ];
  const requestBodyHeader = [
    "content-encoding",
    "content-language",
    "content-location",
    "content-type",
    // See https://github.com/nodejs/undici/issues/2021
    // 'Content-Length' is a forbidden header name, which is typically
    // removed in the Headers implementation. However, undici doesn't
    // filter out headers, so we add it here.
    "content-length"
  ];
  const requestDuplex = [
    "half"
  ];
  const forbiddenMethods = ["CONNECT", "TRACE", "TRACK"];
  const subresource = [
    "audio",
    "audioworklet",
    "font",
    "image",
    "manifest",
    "paintworklet",
    "script",
    "style",
    "track",
    "video",
    "xslt",
    ""
  ];
  const DOMException2 = globalThis.DOMException ?? (() => {
    try {
      atob("~");
    } catch (err) {
      return Object.getPrototypeOf(err).constructor;
    }
  })();
  let channel;
  const structuredClone = globalThis.structuredClone ?? // https://github.com/nodejs/node/blob/b27ae24dcc4251bad726d9d84baf678d1f707fed/lib/internal/structured_clone.js
  // structuredClone was added in v17.0.0, but fetch supports v16.8
  function structuredClone2(value, options = void 0) {
    if (arguments.length === 0) {
      throw new TypeError("missing argument");
    }
    if (!channel) {
      channel = new MessageChannel();
    }
    channel.port1.unref();
    channel.port2.unref();
    channel.port1.postMessage(value, options == null ? void 0 : options.transfer);
    return receiveMessageOnPort(channel.port2).message;
  };
  constants$4 = {
    DOMException: DOMException2,
    structuredClone,
    subresource,
    forbiddenMethods,
    requestBodyHeader,
    referrerPolicy,
    requestRedirect,
    requestMode,
    requestCredentials,
    requestCache,
    redirectStatus,
    corsSafeListedMethods,
    nullBodyStatus,
    safeMethods,
    badPorts,
    requestDuplex
  };
  return constants$4;
}
var global$2;
var hasRequiredGlobal;
function requireGlobal() {
  if (hasRequiredGlobal)
    return global$2;
  hasRequiredGlobal = 1;
  const globalOrigin = Symbol.for("undici.globalOrigin.1");
  function getGlobalOrigin() {
    return globalThis[globalOrigin];
  }
  function setGlobalOrigin(newOrigin) {
    if (newOrigin !== void 0 && typeof newOrigin !== "string" && !(newOrigin instanceof URL)) {
      throw new Error("Invalid base url");
    }
    if (newOrigin === void 0) {
      Object.defineProperty(globalThis, globalOrigin, {
        value: void 0,
        writable: true,
        enumerable: false,
        configurable: false
      });
      return;
    }
    const parsedURL = new URL(newOrigin);
    if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
      throw new TypeError(`Only http & https urls are allowed, received ${parsedURL.protocol}`);
    }
    Object.defineProperty(globalThis, globalOrigin, {
      value: parsedURL,
      writable: true,
      enumerable: false,
      configurable: false
    });
  }
  global$2 = {
    getGlobalOrigin,
    setGlobalOrigin
  };
  return global$2;
}
var util$i;
var hasRequiredUtil$4;
function requireUtil$4() {
  if (hasRequiredUtil$4)
    return util$i;
  hasRequiredUtil$4 = 1;
  const { redirectStatus, badPorts, referrerPolicy: referrerPolicyTokens } = requireConstants$3();
  const { getGlobalOrigin } = requireGlobal();
  const { performance: performance2 } = require$$2;
  const { isBlobLike: isBlobLike2, toUSVString: toUSVString2, ReadableStreamFrom: ReadableStreamFrom2 } = util$j;
  const assert2 = require$$0$1;
  const { isUint8Array } = require$$5;
  let crypto;
  try {
    crypto = require("crypto");
  } catch {
  }
  function responseURL(response2) {
    const urlList = response2.urlList;
    const length = urlList.length;
    return length === 0 ? null : urlList[length - 1].toString();
  }
  function responseLocationURL(response2, requestFragment) {
    if (!redirectStatus.includes(response2.status)) {
      return null;
    }
    let location = response2.headersList.get("location");
    if (location !== null && isValidHeaderValue(location)) {
      location = new URL(location, responseURL(response2));
    }
    if (location && !location.hash) {
      location.hash = requestFragment;
    }
    return location;
  }
  function requestCurrentURL(request2) {
    return request2.urlList[request2.urlList.length - 1];
  }
  function requestBadPort(request2) {
    const url2 = requestCurrentURL(request2);
    if (urlIsHttpHttpsScheme(url2) && badPorts.includes(url2.port)) {
      return "blocked";
    }
    return "allowed";
  }
  function isErrorLike(object) {
    var _a2, _b2;
    return object instanceof Error || (((_a2 = object == null ? void 0 : object.constructor) == null ? void 0 : _a2.name) === "Error" || ((_b2 = object == null ? void 0 : object.constructor) == null ? void 0 : _b2.name) === "DOMException");
  }
  function isValidReasonPhrase(statusText) {
    for (let i = 0; i < statusText.length; ++i) {
      const c = statusText.charCodeAt(i);
      if (!(c === 9 || // HTAB
      c >= 32 && c <= 126 || // SP / VCHAR
      c >= 128 && c <= 255)) {
        return false;
      }
    }
    return true;
  }
  function isTokenChar(c) {
    return !(c >= 127 || c <= 32 || c === "(" || c === ")" || c === "<" || c === ">" || c === "@" || c === "," || c === ";" || c === ":" || c === "\\" || c === '"' || c === "/" || c === "[" || c === "]" || c === "?" || c === "=" || c === "{" || c === "}");
  }
  function isValidHTTPToken(characters) {
    if (!characters || typeof characters !== "string") {
      return false;
    }
    for (let i = 0; i < characters.length; ++i) {
      const c = characters.charCodeAt(i);
      if (c > 127 || !isTokenChar(c)) {
        return false;
      }
    }
    return true;
  }
  function isValidHeaderName(potentialValue) {
    if (potentialValue.length === 0) {
      return false;
    }
    return isValidHTTPToken(potentialValue);
  }
  function isValidHeaderValue(potentialValue) {
    if (potentialValue.startsWith("	") || potentialValue.startsWith(" ") || potentialValue.endsWith("	") || potentialValue.endsWith(" ")) {
      return false;
    }
    if (potentialValue.includes("\0") || potentialValue.includes("\r") || potentialValue.includes("\n")) {
      return false;
    }
    return true;
  }
  function setRequestReferrerPolicyOnRedirect(request2, actualResponse) {
    const { headersList } = actualResponse;
    const policyHeader = (headersList.get("referrer-policy") ?? "").split(",");
    let policy = "";
    if (policyHeader.length > 0) {
      for (let i = policyHeader.length; i !== 0; i--) {
        const token = policyHeader[i - 1].trim();
        if (referrerPolicyTokens.includes(token)) {
          policy = token;
          break;
        }
      }
    }
    if (policy !== "") {
      request2.referrerPolicy = policy;
    }
  }
  function crossOriginResourcePolicyCheck() {
    return "allowed";
  }
  function corsCheck() {
    return "success";
  }
  function TAOCheck() {
    return "success";
  }
  function appendFetchMetadata(httpRequest) {
    let header = null;
    header = httpRequest.mode;
    httpRequest.headersList.set("sec-fetch-mode", header);
  }
  function appendRequestOriginHeader(request2) {
    let serializedOrigin = request2.origin;
    if (request2.responseTainting === "cors" || request2.mode === "websocket") {
      if (serializedOrigin) {
        request2.headersList.append("origin", serializedOrigin);
      }
    } else if (request2.method !== "GET" && request2.method !== "HEAD") {
      switch (request2.referrerPolicy) {
        case "no-referrer":
          serializedOrigin = null;
          break;
        case "no-referrer-when-downgrade":
        case "strict-origin":
        case "strict-origin-when-cross-origin":
          if (request2.origin && urlHasHttpsScheme(request2.origin) && !urlHasHttpsScheme(requestCurrentURL(request2))) {
            serializedOrigin = null;
          }
          break;
        case "same-origin":
          if (!sameOrigin(request2, requestCurrentURL(request2))) {
            serializedOrigin = null;
          }
          break;
      }
      if (serializedOrigin) {
        request2.headersList.append("origin", serializedOrigin);
      }
    }
  }
  function coarsenedSharedCurrentTime(crossOriginIsolatedCapability) {
    return performance2.now();
  }
  function createOpaqueTimingInfo(timingInfo) {
    return {
      startTime: timingInfo.startTime ?? 0,
      redirectStartTime: 0,
      redirectEndTime: 0,
      postRedirectStartTime: timingInfo.startTime ?? 0,
      finalServiceWorkerStartTime: 0,
      finalNetworkResponseStartTime: 0,
      finalNetworkRequestStartTime: 0,
      endTime: 0,
      encodedBodySize: 0,
      decodedBodySize: 0,
      finalConnectionTimingInfo: null
    };
  }
  function makePolicyContainer() {
    return {
      referrerPolicy: "strict-origin-when-cross-origin"
    };
  }
  function clonePolicyContainer(policyContainer) {
    return {
      referrerPolicy: policyContainer.referrerPolicy
    };
  }
  function determineRequestsReferrer(request2) {
    const policy = request2.referrerPolicy;
    assert2(policy);
    let referrerSource = null;
    if (request2.referrer === "client") {
      const globalOrigin = getGlobalOrigin();
      if (!globalOrigin || globalOrigin.origin === "null") {
        return "no-referrer";
      }
      referrerSource = new URL(globalOrigin);
    } else if (request2.referrer instanceof URL) {
      referrerSource = request2.referrer;
    }
    let referrerURL = stripURLForReferrer(referrerSource);
    const referrerOrigin = stripURLForReferrer(referrerSource, true);
    if (referrerURL.toString().length > 4096) {
      referrerURL = referrerOrigin;
    }
    const areSameOrigin = sameOrigin(request2, referrerURL);
    const isNonPotentiallyTrustWorthy = isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(request2.url);
    switch (policy) {
      case "origin":
        return referrerOrigin != null ? referrerOrigin : stripURLForReferrer(referrerSource, true);
      case "unsafe-url":
        return referrerURL;
      case "same-origin":
        return areSameOrigin ? referrerOrigin : "no-referrer";
      case "origin-when-cross-origin":
        return areSameOrigin ? referrerURL : referrerOrigin;
      case "strict-origin-when-cross-origin": {
        const currentURL = requestCurrentURL(request2);
        if (sameOrigin(referrerURL, currentURL)) {
          return referrerURL;
        }
        if (isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(currentURL)) {
          return "no-referrer";
        }
        return referrerOrigin;
      }
      case "strict-origin":
      case "no-referrer-when-downgrade":
      default:
        return isNonPotentiallyTrustWorthy ? "no-referrer" : referrerOrigin;
    }
  }
  function stripURLForReferrer(url2, originOnly) {
    assert2(url2 instanceof URL);
    if (url2.protocol === "file:" || url2.protocol === "about:" || url2.protocol === "blank:") {
      return "no-referrer";
    }
    url2.username = "";
    url2.password = "";
    url2.hash = "";
    if (originOnly) {
      url2.pathname = "";
      url2.search = "";
    }
    return url2;
  }
  function isURLPotentiallyTrustworthy(url2) {
    if (!(url2 instanceof URL)) {
      return false;
    }
    if (url2.href === "about:blank" || url2.href === "about:srcdoc") {
      return true;
    }
    if (url2.protocol === "data:")
      return true;
    if (url2.protocol === "file:")
      return true;
    return isOriginPotentiallyTrustworthy(url2.origin);
    function isOriginPotentiallyTrustworthy(origin) {
      if (origin == null || origin === "null")
        return false;
      const originAsURL = new URL(origin);
      if (originAsURL.protocol === "https:" || originAsURL.protocol === "wss:") {
        return true;
      }
      if (/^127(?:\.[0-9]+){0,2}\.[0-9]+$|^\[(?:0*:)*?:?0*1\]$/.test(originAsURL.hostname) || (originAsURL.hostname === "localhost" || originAsURL.hostname.includes("localhost.")) || originAsURL.hostname.endsWith(".localhost")) {
        return true;
      }
      return false;
    }
  }
  function bytesMatch(bytes, metadataList) {
    if (crypto === void 0) {
      return true;
    }
    const parsedMetadata = parseMetadata(metadataList);
    if (parsedMetadata === "no metadata") {
      return true;
    }
    if (parsedMetadata.length === 0) {
      return true;
    }
    const list = parsedMetadata.sort((c, d) => d.algo.localeCompare(c.algo));
    const strongest = list[0].algo;
    const metadata = list.filter((item) => item.algo === strongest);
    for (const item of metadata) {
      const algorithm = item.algo;
      const expectedValue = item.hash;
      const actualValue = crypto.createHash(algorithm).update(bytes).digest("base64");
      if (actualValue === expectedValue) {
        return true;
      }
    }
    return false;
  }
  const parseHashWithOptions = /((?<algo>sha256|sha384|sha512)-(?<hash>[A-z0-9+/]{1}.*={0,2}))( +[\x21-\x7e]?)?/i;
  function parseMetadata(metadata) {
    const result = [];
    let empty = true;
    const supportedHashes = crypto.getHashes();
    for (const token of metadata.split(" ")) {
      empty = false;
      const parsedToken = parseHashWithOptions.exec(token);
      if (parsedToken === null || parsedToken.groups === void 0) {
        continue;
      }
      const algorithm = parsedToken.groups.algo;
      if (supportedHashes.includes(algorithm.toLowerCase())) {
        result.push(parsedToken.groups);
      }
    }
    if (empty === true) {
      return "no metadata";
    }
    return result;
  }
  function tryUpgradeRequestToAPotentiallyTrustworthyURL(request2) {
  }
  function sameOrigin(A, B) {
    if (A.origin === B.origin && A.origin === "null") {
      return true;
    }
    if (A.protocol === B.protocol && A.hostname === B.hostname && A.port === B.port) {
      return true;
    }
    return false;
  }
  function createDeferredPromise() {
    let res;
    let rej;
    const promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    return { promise, resolve: res, reject: rej };
  }
  function isAborted(fetchParams) {
    return fetchParams.controller.state === "aborted";
  }
  function isCancelled(fetchParams) {
    return fetchParams.controller.state === "aborted" || fetchParams.controller.state === "terminated";
  }
  function normalizeMethod(method) {
    return /^(DELETE|GET|HEAD|OPTIONS|POST|PUT)$/i.test(method) ? method.toUpperCase() : method;
  }
  function serializeJavascriptValueToJSONString(value) {
    const result = JSON.stringify(value);
    if (result === void 0) {
      throw new TypeError("Value is not JSON serializable");
    }
    assert2(typeof result === "string");
    return result;
  }
  const esIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
  function makeIterator(iterator, name, kind) {
    const object = {
      index: 0,
      kind,
      target: iterator
    };
    const i = {
      next() {
        if (Object.getPrototypeOf(this) !== i) {
          throw new TypeError(
            `'next' called on an object that does not implement interface ${name} Iterator.`
          );
        }
        const { index, kind: kind2, target } = object;
        const values = target();
        const len = values.length;
        if (index >= len) {
          return { value: void 0, done: true };
        }
        const pair = values[index];
        object.index = index + 1;
        return iteratorResult(pair, kind2);
      },
      // The class string of an iterator prototype object for a given interface is the
      // result of concatenating the identifier of the interface and the string " Iterator".
      [Symbol.toStringTag]: `${name} Iterator`
    };
    Object.setPrototypeOf(i, esIteratorPrototype);
    return Object.setPrototypeOf({}, i);
  }
  function iteratorResult(pair, kind) {
    let result;
    switch (kind) {
      case "key": {
        result = pair[0];
        break;
      }
      case "value": {
        result = pair[1];
        break;
      }
      case "key+value": {
        result = pair;
        break;
      }
    }
    return { value: result, done: false };
  }
  function fullyReadBody(body2, processBody, processBodyError) {
    const successSteps = (bytes) => queueMicrotask(() => processBody(bytes));
    const errorSteps = (error) => queueMicrotask(() => processBodyError(error));
    let reader;
    try {
      reader = body2.stream.getReader();
    } catch (e) {
      errorSteps(e);
      return;
    }
    readAllBytes(reader, successSteps, errorSteps);
  }
  let ReadableStream2 = globalThis.ReadableStream;
  function isReadableStreamLike(stream2) {
    if (!ReadableStream2) {
      ReadableStream2 = require$$13.ReadableStream;
    }
    return stream2 instanceof ReadableStream2 || stream2[Symbol.toStringTag] === "ReadableStream" && typeof stream2.tee === "function";
  }
  const MAXIMUM_ARGUMENT_LENGTH = 65535;
  function isomorphicDecode(input) {
    if (input.length < MAXIMUM_ARGUMENT_LENGTH) {
      return String.fromCharCode(...input);
    }
    return input.reduce((previous, current) => previous + String.fromCharCode(current), "");
  }
  function readableStreamClose(controller) {
    try {
      controller.close();
    } catch (err) {
      if (!err.message.includes("Controller is already closed")) {
        throw err;
      }
    }
  }
  function isomorphicEncode(input) {
    for (let i = 0; i < input.length; i++) {
      assert2(input.charCodeAt(i) <= 255);
    }
    return input;
  }
  async function readAllBytes(reader, successSteps, failureSteps) {
    const bytes = [];
    let byteLength = 0;
    while (true) {
      let done;
      let chunk;
      try {
        ({ done, value: chunk } = await reader.read());
      } catch (e) {
        failureSteps(e);
        return;
      }
      if (done) {
        successSteps(Buffer.concat(bytes, byteLength));
        return;
      }
      if (!isUint8Array(chunk)) {
        failureSteps(new TypeError("Received non-Uint8Array chunk"));
        return;
      }
      bytes.push(chunk);
      byteLength += chunk.length;
    }
  }
  function urlIsLocal(url2) {
    assert2("protocol" in url2);
    const protocol = url2.protocol;
    return protocol === "about:" || protocol === "blob:" || protocol === "data:";
  }
  function urlHasHttpsScheme(url2) {
    if (typeof url2 === "string") {
      return url2.startsWith("https:");
    }
    return url2.protocol === "https:";
  }
  function urlIsHttpHttpsScheme(url2) {
    assert2("protocol" in url2);
    const protocol = url2.protocol;
    return protocol === "http:" || protocol === "https:";
  }
  const hasOwn = Object.hasOwn || ((dict, key) => Object.prototype.hasOwnProperty.call(dict, key));
  util$i = {
    isAborted,
    isCancelled,
    createDeferredPromise,
    ReadableStreamFrom: ReadableStreamFrom2,
    toUSVString: toUSVString2,
    tryUpgradeRequestToAPotentiallyTrustworthyURL,
    coarsenedSharedCurrentTime,
    determineRequestsReferrer,
    makePolicyContainer,
    clonePolicyContainer,
    appendFetchMetadata,
    appendRequestOriginHeader,
    TAOCheck,
    corsCheck,
    crossOriginResourcePolicyCheck,
    createOpaqueTimingInfo,
    setRequestReferrerPolicyOnRedirect,
    isValidHTTPToken,
    requestBadPort,
    requestCurrentURL,
    responseURL,
    responseLocationURL,
    isBlobLike: isBlobLike2,
    isURLPotentiallyTrustworthy,
    isValidReasonPhrase,
    sameOrigin,
    normalizeMethod,
    serializeJavascriptValueToJSONString,
    makeIterator,
    isValidHeaderName,
    isValidHeaderValue,
    hasOwn,
    isErrorLike,
    fullyReadBody,
    bytesMatch,
    isReadableStreamLike,
    readableStreamClose,
    isomorphicEncode,
    isomorphicDecode,
    urlIsLocal,
    urlHasHttpsScheme,
    urlIsHttpHttpsScheme,
    readAllBytes
  };
  return util$i;
}
var symbols$3;
var hasRequiredSymbols$3;
function requireSymbols$3() {
  if (hasRequiredSymbols$3)
    return symbols$3;
  hasRequiredSymbols$3 = 1;
  symbols$3 = {
    kUrl: Symbol("url"),
    kHeaders: Symbol("headers"),
    kSignal: Symbol("signal"),
    kState: Symbol("state"),
    kGuard: Symbol("guard"),
    kRealm: Symbol("realm")
  };
  return symbols$3;
}
var webidl_1;
var hasRequiredWebidl;
function requireWebidl() {
  if (hasRequiredWebidl)
    return webidl_1;
  hasRequiredWebidl = 1;
  const { types } = require$$0$4;
  const { hasOwn, toUSVString: toUSVString2 } = requireUtil$4();
  const webidl = {};
  webidl.converters = {};
  webidl.util = {};
  webidl.errors = {};
  webidl.errors.exception = function(message) {
    return new TypeError(`${message.header}: ${message.message}`);
  };
  webidl.errors.conversionFailed = function(context) {
    const plural = context.types.length === 1 ? "" : " one of";
    const message = `${context.argument} could not be converted to${plural}: ${context.types.join(", ")}.`;
    return webidl.errors.exception({
      header: context.prefix,
      message
    });
  };
  webidl.errors.invalidArgument = function(context) {
    return webidl.errors.exception({
      header: context.prefix,
      message: `"${context.value}" is an invalid ${context.type}.`
    });
  };
  webidl.brandCheck = function(V, I, opts = void 0) {
    if ((opts == null ? void 0 : opts.strict) !== false && !(V instanceof I)) {
      throw new TypeError("Illegal invocation");
    } else {
      return (V == null ? void 0 : V[Symbol.toStringTag]) === I.prototype[Symbol.toStringTag];
    }
  };
  webidl.argumentLengthCheck = function({ length }, min, ctx) {
    if (length < min) {
      throw webidl.errors.exception({
        message: `${min} argument${min !== 1 ? "s" : ""} required, but${length ? " only" : ""} ${length} found.`,
        ...ctx
      });
    }
  };
  webidl.illegalConstructor = function() {
    throw webidl.errors.exception({
      header: "TypeError",
      message: "Illegal constructor"
    });
  };
  webidl.util.Type = function(V) {
    switch (typeof V) {
      case "undefined":
        return "Undefined";
      case "boolean":
        return "Boolean";
      case "string":
        return "String";
      case "symbol":
        return "Symbol";
      case "number":
        return "Number";
      case "bigint":
        return "BigInt";
      case "function":
      case "object": {
        if (V === null) {
          return "Null";
        }
        return "Object";
      }
    }
  };
  webidl.util.ConvertToInt = function(V, bitLength, signedness, opts = {}) {
    let upperBound;
    let lowerBound;
    if (bitLength === 64) {
      upperBound = Math.pow(2, 53) - 1;
      if (signedness === "unsigned") {
        lowerBound = 0;
      } else {
        lowerBound = Math.pow(-2, 53) + 1;
      }
    } else if (signedness === "unsigned") {
      lowerBound = 0;
      upperBound = Math.pow(2, bitLength) - 1;
    } else {
      lowerBound = Math.pow(-2, bitLength) - 1;
      upperBound = Math.pow(2, bitLength - 1) - 1;
    }
    let x = Number(V);
    if (x === 0) {
      x = 0;
    }
    if (opts.enforceRange === true) {
      if (Number.isNaN(x) || x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) {
        throw webidl.errors.exception({
          header: "Integer conversion",
          message: `Could not convert ${V} to an integer.`
        });
      }
      x = webidl.util.IntegerPart(x);
      if (x < lowerBound || x > upperBound) {
        throw webidl.errors.exception({
          header: "Integer conversion",
          message: `Value must be between ${lowerBound}-${upperBound}, got ${x}.`
        });
      }
      return x;
    }
    if (!Number.isNaN(x) && opts.clamp === true) {
      x = Math.min(Math.max(x, lowerBound), upperBound);
      if (Math.floor(x) % 2 === 0) {
        x = Math.floor(x);
      } else {
        x = Math.ceil(x);
      }
      return x;
    }
    if (Number.isNaN(x) || x === 0 && Object.is(0, x) || x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) {
      return 0;
    }
    x = webidl.util.IntegerPart(x);
    x = x % Math.pow(2, bitLength);
    if (signedness === "signed" && x >= Math.pow(2, bitLength) - 1) {
      return x - Math.pow(2, bitLength);
    }
    return x;
  };
  webidl.util.IntegerPart = function(n) {
    const r = Math.floor(Math.abs(n));
    if (n < 0) {
      return -1 * r;
    }
    return r;
  };
  webidl.sequenceConverter = function(converter) {
    return (V) => {
      var _a2;
      if (webidl.util.Type(V) !== "Object") {
        throw webidl.errors.exception({
          header: "Sequence",
          message: `Value of type ${webidl.util.Type(V)} is not an Object.`
        });
      }
      const method = (_a2 = V == null ? void 0 : V[Symbol.iterator]) == null ? void 0 : _a2.call(V);
      const seq = [];
      if (method === void 0 || typeof method.next !== "function") {
        throw webidl.errors.exception({
          header: "Sequence",
          message: "Object is not an iterator."
        });
      }
      while (true) {
        const { done, value } = method.next();
        if (done) {
          break;
        }
        seq.push(converter(value));
      }
      return seq;
    };
  };
  webidl.recordConverter = function(keyConverter, valueConverter) {
    return (O) => {
      if (webidl.util.Type(O) !== "Object") {
        throw webidl.errors.exception({
          header: "Record",
          message: `Value of type ${webidl.util.Type(O)} is not an Object.`
        });
      }
      const result = {};
      if (!types.isProxy(O)) {
        const keys2 = Object.keys(O);
        for (const key of keys2) {
          const typedKey = keyConverter(key);
          const typedValue = valueConverter(O[key]);
          result[typedKey] = typedValue;
        }
        return result;
      }
      const keys = Reflect.ownKeys(O);
      for (const key of keys) {
        const desc = Reflect.getOwnPropertyDescriptor(O, key);
        if (desc == null ? void 0 : desc.enumerable) {
          const typedKey = keyConverter(key);
          const typedValue = valueConverter(O[key]);
          result[typedKey] = typedValue;
        }
      }
      return result;
    };
  };
  webidl.interfaceConverter = function(i) {
    return (V, opts = {}) => {
      if (opts.strict !== false && !(V instanceof i)) {
        throw webidl.errors.exception({
          header: i.name,
          message: `Expected ${V} to be an instance of ${i.name}.`
        });
      }
      return V;
    };
  };
  webidl.dictionaryConverter = function(converters) {
    return (dictionary) => {
      const type = webidl.util.Type(dictionary);
      const dict = {};
      if (type === "Null" || type === "Undefined") {
        return dict;
      } else if (type !== "Object") {
        throw webidl.errors.exception({
          header: "Dictionary",
          message: `Expected ${dictionary} to be one of: Null, Undefined, Object.`
        });
      }
      for (const options of converters) {
        const { key, defaultValue, required, converter } = options;
        if (required === true) {
          if (!hasOwn(dictionary, key)) {
            throw webidl.errors.exception({
              header: "Dictionary",
              message: `Missing required key "${key}".`
            });
          }
        }
        let value = dictionary[key];
        const hasDefault = hasOwn(options, "defaultValue");
        if (hasDefault && value !== null) {
          value = value ?? defaultValue;
        }
        if (required || hasDefault || value !== void 0) {
          value = converter(value);
          if (options.allowedValues && !options.allowedValues.includes(value)) {
            throw webidl.errors.exception({
              header: "Dictionary",
              message: `${value} is not an accepted type. Expected one of ${options.allowedValues.join(", ")}.`
            });
          }
          dict[key] = value;
        }
      }
      return dict;
    };
  };
  webidl.nullableConverter = function(converter) {
    return (V) => {
      if (V === null) {
        return V;
      }
      return converter(V);
    };
  };
  webidl.converters.DOMString = function(V, opts = {}) {
    if (V === null && opts.legacyNullToEmptyString) {
      return "";
    }
    if (typeof V === "symbol") {
      throw new TypeError("Could not convert argument of type symbol to string.");
    }
    return String(V);
  };
  webidl.converters.ByteString = function(V) {
    const x = webidl.converters.DOMString(V);
    for (let index = 0; index < x.length; index++) {
      const charCode = x.charCodeAt(index);
      if (charCode > 255) {
        throw new TypeError(
          `Cannot convert argument to a ByteString because the character at index ${index} has a value of ${charCode} which is greater than 255.`
        );
      }
    }
    return x;
  };
  webidl.converters.USVString = toUSVString2;
  webidl.converters.boolean = function(V) {
    const x = Boolean(V);
    return x;
  };
  webidl.converters.any = function(V) {
    return V;
  };
  webidl.converters["long long"] = function(V) {
    const x = webidl.util.ConvertToInt(V, 64, "signed");
    return x;
  };
  webidl.converters["unsigned long long"] = function(V) {
    const x = webidl.util.ConvertToInt(V, 64, "unsigned");
    return x;
  };
  webidl.converters["unsigned long"] = function(V) {
    const x = webidl.util.ConvertToInt(V, 32, "unsigned");
    return x;
  };
  webidl.converters["unsigned short"] = function(V, opts) {
    const x = webidl.util.ConvertToInt(V, 16, "unsigned", opts);
    return x;
  };
  webidl.converters.ArrayBuffer = function(V, opts = {}) {
    if (webidl.util.Type(V) !== "Object" || !types.isAnyArrayBuffer(V)) {
      throw webidl.errors.conversionFailed({
        prefix: `${V}`,
        argument: `${V}`,
        types: ["ArrayBuffer"]
      });
    }
    if (opts.allowShared === false && types.isSharedArrayBuffer(V)) {
      throw webidl.errors.exception({
        header: "ArrayBuffer",
        message: "SharedArrayBuffer is not allowed."
      });
    }
    return V;
  };
  webidl.converters.TypedArray = function(V, T, opts = {}) {
    if (webidl.util.Type(V) !== "Object" || !types.isTypedArray(V) || V.constructor.name !== T.name) {
      throw webidl.errors.conversionFailed({
        prefix: `${T.name}`,
        argument: `${V}`,
        types: [T.name]
      });
    }
    if (opts.allowShared === false && types.isSharedArrayBuffer(V.buffer)) {
      throw webidl.errors.exception({
        header: "ArrayBuffer",
        message: "SharedArrayBuffer is not allowed."
      });
    }
    return V;
  };
  webidl.converters.DataView = function(V, opts = {}) {
    if (webidl.util.Type(V) !== "Object" || !types.isDataView(V)) {
      throw webidl.errors.exception({
        header: "DataView",
        message: "Object is not a DataView."
      });
    }
    if (opts.allowShared === false && types.isSharedArrayBuffer(V.buffer)) {
      throw webidl.errors.exception({
        header: "ArrayBuffer",
        message: "SharedArrayBuffer is not allowed."
      });
    }
    return V;
  };
  webidl.converters.BufferSource = function(V, opts = {}) {
    if (types.isAnyArrayBuffer(V)) {
      return webidl.converters.ArrayBuffer(V, opts);
    }
    if (types.isTypedArray(V)) {
      return webidl.converters.TypedArray(V, V.constructor);
    }
    if (types.isDataView(V)) {
      return webidl.converters.DataView(V, opts);
    }
    throw new TypeError(`Could not convert ${V} to a BufferSource.`);
  };
  webidl.converters["sequence<ByteString>"] = webidl.sequenceConverter(
    webidl.converters.ByteString
  );
  webidl.converters["sequence<sequence<ByteString>>"] = webidl.sequenceConverter(
    webidl.converters["sequence<ByteString>"]
  );
  webidl.converters["record<ByteString, ByteString>"] = webidl.recordConverter(
    webidl.converters.ByteString,
    webidl.converters.ByteString
  );
  webidl_1 = {
    webidl
  };
  return webidl_1;
}
var dataURL;
var hasRequiredDataURL;
function requireDataURL() {
  if (hasRequiredDataURL)
    return dataURL;
  hasRequiredDataURL = 1;
  const assert2 = require$$0$1;
  const { atob: atob2 } = require$$7;
  const { isomorphicDecode } = requireUtil$4();
  const encoder2 = new TextEncoder();
  const HTTP_TOKEN_CODEPOINTS = /^[!#$%&'*+-.^_|~A-Za-z0-9]+$/;
  const HTTP_WHITESPACE_REGEX = /(\u000A|\u000D|\u0009|\u0020)/;
  const HTTP_QUOTED_STRING_TOKENS = /[\u0009|\u0020-\u007E|\u0080-\u00FF]/;
  function dataURLProcessor(dataURL2) {
    assert2(dataURL2.protocol === "data:");
    let input = URLSerializer(dataURL2, true);
    input = input.slice(5);
    const position = { position: 0 };
    let mimeType = collectASequenceOfCodePointsFast(
      ",",
      input,
      position
    );
    const mimeTypeLength = mimeType.length;
    mimeType = removeASCIIWhitespace(mimeType, true, true);
    if (position.position >= input.length) {
      return "failure";
    }
    position.position++;
    const encodedBody = input.slice(mimeTypeLength + 1);
    let body2 = stringPercentDecode(encodedBody);
    if (/;(\u0020){0,}base64$/i.test(mimeType)) {
      const stringBody = isomorphicDecode(body2);
      body2 = forgivingBase64(stringBody);
      if (body2 === "failure") {
        return "failure";
      }
      mimeType = mimeType.slice(0, -6);
      mimeType = mimeType.replace(/(\u0020)+$/, "");
      mimeType = mimeType.slice(0, -1);
    }
    if (mimeType.startsWith(";")) {
      mimeType = "text/plain" + mimeType;
    }
    let mimeTypeRecord = parseMIMEType(mimeType);
    if (mimeTypeRecord === "failure") {
      mimeTypeRecord = parseMIMEType("text/plain;charset=US-ASCII");
    }
    return { mimeType: mimeTypeRecord, body: body2 };
  }
  function URLSerializer(url2, excludeFragment = false) {
    const href = url2.href;
    if (!excludeFragment) {
      return href;
    }
    const hash = href.lastIndexOf("#");
    if (hash === -1) {
      return href;
    }
    return href.slice(0, hash);
  }
  function collectASequenceOfCodePoints(condition, input, position) {
    let result = "";
    while (position.position < input.length && condition(input[position.position])) {
      result += input[position.position];
      position.position++;
    }
    return result;
  }
  function collectASequenceOfCodePointsFast(char, input, position) {
    const idx = input.indexOf(char, position.position);
    const start = position.position;
    if (idx === -1) {
      position.position = input.length;
      return input.slice(start);
    }
    position.position = idx;
    return input.slice(start, position.position);
  }
  function stringPercentDecode(input) {
    const bytes = encoder2.encode(input);
    return percentDecode(bytes);
  }
  function percentDecode(input) {
    const output = [];
    for (let i = 0; i < input.length; i++) {
      const byte = input[i];
      if (byte !== 37) {
        output.push(byte);
      } else if (byte === 37 && !/^[0-9A-Fa-f]{2}$/i.test(String.fromCharCode(input[i + 1], input[i + 2]))) {
        output.push(37);
      } else {
        const nextTwoBytes = String.fromCharCode(input[i + 1], input[i + 2]);
        const bytePoint = Number.parseInt(nextTwoBytes, 16);
        output.push(bytePoint);
        i += 2;
      }
    }
    return Uint8Array.from(output);
  }
  function parseMIMEType(input) {
    input = removeHTTPWhitespace(input, true, true);
    const position = { position: 0 };
    const type = collectASequenceOfCodePointsFast(
      "/",
      input,
      position
    );
    if (type.length === 0 || !HTTP_TOKEN_CODEPOINTS.test(type)) {
      return "failure";
    }
    if (position.position > input.length) {
      return "failure";
    }
    position.position++;
    let subtype = collectASequenceOfCodePointsFast(
      ";",
      input,
      position
    );
    subtype = removeHTTPWhitespace(subtype, false, true);
    if (subtype.length === 0 || !HTTP_TOKEN_CODEPOINTS.test(subtype)) {
      return "failure";
    }
    const typeLowercase = type.toLowerCase();
    const subtypeLowercase = subtype.toLowerCase();
    const mimeType = {
      type: typeLowercase,
      subtype: subtypeLowercase,
      /** @type {Map<string, string>} */
      parameters: /* @__PURE__ */ new Map(),
      // https://mimesniff.spec.whatwg.org/#mime-type-essence
      essence: `${typeLowercase}/${subtypeLowercase}`
    };
    while (position.position < input.length) {
      position.position++;
      collectASequenceOfCodePoints(
        // https://fetch.spec.whatwg.org/#http-whitespace
        (char) => HTTP_WHITESPACE_REGEX.test(char),
        input,
        position
      );
      let parameterName = collectASequenceOfCodePoints(
        (char) => char !== ";" && char !== "=",
        input,
        position
      );
      parameterName = parameterName.toLowerCase();
      if (position.position < input.length) {
        if (input[position.position] === ";") {
          continue;
        }
        position.position++;
      }
      if (position.position > input.length) {
        break;
      }
      let parameterValue = null;
      if (input[position.position] === '"') {
        parameterValue = collectAnHTTPQuotedString(input, position, true);
        collectASequenceOfCodePointsFast(
          ";",
          input,
          position
        );
      } else {
        parameterValue = collectASequenceOfCodePointsFast(
          ";",
          input,
          position
        );
        parameterValue = removeHTTPWhitespace(parameterValue, false, true);
        if (parameterValue.length === 0) {
          continue;
        }
      }
      if (parameterName.length !== 0 && HTTP_TOKEN_CODEPOINTS.test(parameterName) && (parameterValue.length === 0 || HTTP_QUOTED_STRING_TOKENS.test(parameterValue)) && !mimeType.parameters.has(parameterName)) {
        mimeType.parameters.set(parameterName, parameterValue);
      }
    }
    return mimeType;
  }
  function forgivingBase64(data) {
    data = data.replace(/[\u0009\u000A\u000C\u000D\u0020]/g, "");
    if (data.length % 4 === 0) {
      data = data.replace(/=?=$/, "");
    }
    if (data.length % 4 === 1) {
      return "failure";
    }
    if (/[^+/0-9A-Za-z]/.test(data)) {
      return "failure";
    }
    const binary = atob2(data);
    const bytes = new Uint8Array(binary.length);
    for (let byte = 0; byte < binary.length; byte++) {
      bytes[byte] = binary.charCodeAt(byte);
    }
    return bytes;
  }
  function collectAnHTTPQuotedString(input, position, extractValue) {
    const positionStart = position.position;
    let value = "";
    assert2(input[position.position] === '"');
    position.position++;
    while (true) {
      value += collectASequenceOfCodePoints(
        (char) => char !== '"' && char !== "\\",
        input,
        position
      );
      if (position.position >= input.length) {
        break;
      }
      const quoteOrBackslash = input[position.position];
      position.position++;
      if (quoteOrBackslash === "\\") {
        if (position.position >= input.length) {
          value += "\\";
          break;
        }
        value += input[position.position];
        position.position++;
      } else {
        assert2(quoteOrBackslash === '"');
        break;
      }
    }
    if (extractValue) {
      return value;
    }
    return input.slice(positionStart, position.position);
  }
  function serializeAMimeType(mimeType) {
    assert2(mimeType !== "failure");
    const { parameters, essence } = mimeType;
    let serialization = essence;
    for (let [name, value] of parameters.entries()) {
      serialization += ";";
      serialization += name;
      serialization += "=";
      if (!HTTP_TOKEN_CODEPOINTS.test(value)) {
        value = value.replace(/(\\|")/g, "\\$1");
        value = '"' + value;
        value += '"';
      }
      serialization += value;
    }
    return serialization;
  }
  function isHTTPWhiteSpace(char) {
    return char === "\r" || char === "\n" || char === "	" || char === " ";
  }
  function removeHTTPWhitespace(str, leading = true, trailing = true) {
    let lead = 0;
    let trail = str.length - 1;
    if (leading) {
      for (; lead < str.length && isHTTPWhiteSpace(str[lead]); lead++)
        ;
    }
    if (trailing) {
      for (; trail > 0 && isHTTPWhiteSpace(str[trail]); trail--)
        ;
    }
    return str.slice(lead, trail + 1);
  }
  function isASCIIWhitespace(char) {
    return char === "\r" || char === "\n" || char === "	" || char === "\f" || char === " ";
  }
  function removeASCIIWhitespace(str, leading = true, trailing = true) {
    let lead = 0;
    let trail = str.length - 1;
    if (leading) {
      for (; lead < str.length && isASCIIWhitespace(str[lead]); lead++)
        ;
    }
    if (trailing) {
      for (; trail > 0 && isASCIIWhitespace(str[trail]); trail--)
        ;
    }
    return str.slice(lead, trail + 1);
  }
  dataURL = {
    dataURLProcessor,
    URLSerializer,
    collectASequenceOfCodePoints,
    collectASequenceOfCodePointsFast,
    stringPercentDecode,
    parseMIMEType,
    collectAnHTTPQuotedString,
    serializeAMimeType
  };
  return dataURL;
}
var file;
var hasRequiredFile;
function requireFile() {
  if (hasRequiredFile)
    return file;
  hasRequiredFile = 1;
  const { Blob: Blob2, File: NativeFile } = require$$7;
  const { types } = require$$0$4;
  const { kState } = requireSymbols$3();
  const { isBlobLike: isBlobLike2 } = requireUtil$4();
  const { webidl } = requireWebidl();
  const { parseMIMEType, serializeAMimeType } = requireDataURL();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$j;
  class File extends Blob2 {
    constructor(fileBits, fileName, options = {}) {
      webidl.argumentLengthCheck(arguments, 2, { header: "File constructor" });
      fileBits = webidl.converters["sequence<BlobPart>"](fileBits);
      fileName = webidl.converters.USVString(fileName);
      options = webidl.converters.FilePropertyBag(options);
      const n = fileName;
      let t = options.type;
      let d;
      substep: {
        if (t) {
          t = parseMIMEType(t);
          if (t === "failure") {
            t = "";
            break substep;
          }
          t = serializeAMimeType(t).toLowerCase();
        }
        d = options.lastModified;
      }
      super(processBlobParts(fileBits, options), { type: t });
      this[kState] = {
        name: n,
        lastModified: d,
        type: t
      };
    }
    get name() {
      webidl.brandCheck(this, File);
      return this[kState].name;
    }
    get lastModified() {
      webidl.brandCheck(this, File);
      return this[kState].lastModified;
    }
    get type() {
      webidl.brandCheck(this, File);
      return this[kState].type;
    }
  }
  class FileLike {
    constructor(blobLike, fileName, options = {}) {
      const n = fileName;
      const t = options.type;
      const d = options.lastModified ?? Date.now();
      this[kState] = {
        blobLike,
        name: n,
        type: t,
        lastModified: d
      };
    }
    stream(...args) {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.stream(...args);
    }
    arrayBuffer(...args) {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.arrayBuffer(...args);
    }
    slice(...args) {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.slice(...args);
    }
    text(...args) {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.text(...args);
    }
    get size() {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.size;
    }
    get type() {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.type;
    }
    get name() {
      webidl.brandCheck(this, FileLike);
      return this[kState].name;
    }
    get lastModified() {
      webidl.brandCheck(this, FileLike);
      return this[kState].lastModified;
    }
    get [Symbol.toStringTag]() {
      return "File";
    }
  }
  Object.defineProperties(File.prototype, {
    [Symbol.toStringTag]: {
      value: "File",
      configurable: true
    },
    name: kEnumerableProperty2,
    lastModified: kEnumerableProperty2
  });
  webidl.converters.Blob = webidl.interfaceConverter(Blob2);
  webidl.converters.BlobPart = function(V, opts) {
    if (webidl.util.Type(V) === "Object") {
      if (isBlobLike2(V)) {
        return webidl.converters.Blob(V, { strict: false });
      }
      if (ArrayBuffer.isView(V) || types.isAnyArrayBuffer(V)) {
        return webidl.converters.BufferSource(V, opts);
      }
    }
    return webidl.converters.USVString(V, opts);
  };
  webidl.converters["sequence<BlobPart>"] = webidl.sequenceConverter(
    webidl.converters.BlobPart
  );
  webidl.converters.FilePropertyBag = webidl.dictionaryConverter([
    {
      key: "lastModified",
      converter: webidl.converters["long long"],
      get defaultValue() {
        return Date.now();
      }
    },
    {
      key: "type",
      converter: webidl.converters.DOMString,
      defaultValue: ""
    },
    {
      key: "endings",
      converter: (value) => {
        value = webidl.converters.DOMString(value);
        value = value.toLowerCase();
        if (value !== "native") {
          value = "transparent";
        }
        return value;
      },
      defaultValue: "transparent"
    }
  ]);
  function processBlobParts(parts, options) {
    const bytes = [];
    for (const element of parts) {
      if (typeof element === "string") {
        let s = element;
        if (options.endings === "native") {
          s = convertLineEndingsNative(s);
        }
        bytes.push(new TextEncoder().encode(s));
      } else if (types.isAnyArrayBuffer(element) || types.isTypedArray(element)) {
        if (!element.buffer) {
          bytes.push(new Uint8Array(element));
        } else {
          bytes.push(
            new Uint8Array(element.buffer, element.byteOffset, element.byteLength)
          );
        }
      } else if (isBlobLike2(element)) {
        bytes.push(element);
      }
    }
    return bytes;
  }
  function convertLineEndingsNative(s) {
    let nativeLineEnding = "\n";
    if (process.platform === "win32") {
      nativeLineEnding = "\r\n";
    }
    return s.replace(/\r?\n/g, nativeLineEnding);
  }
  function isFileLike(object) {
    return NativeFile && object instanceof NativeFile || object instanceof File || object && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && object[Symbol.toStringTag] === "File";
  }
  file = { File, FileLike, isFileLike };
  return file;
}
var formdata;
var hasRequiredFormdata;
function requireFormdata() {
  if (hasRequiredFormdata)
    return formdata;
  hasRequiredFormdata = 1;
  const { isBlobLike: isBlobLike2, toUSVString: toUSVString2, makeIterator } = requireUtil$4();
  const { kState } = requireSymbols$3();
  const { File: UndiciFile, FileLike, isFileLike } = requireFile();
  const { webidl } = requireWebidl();
  const { Blob: Blob2, File: NativeFile } = require$$7;
  const File = NativeFile ?? UndiciFile;
  class FormData2 {
    constructor(form) {
      if (form !== void 0) {
        throw webidl.errors.conversionFailed({
          prefix: "FormData constructor",
          argument: "Argument 1",
          types: ["undefined"]
        });
      }
      this[kState] = [];
    }
    append(name, value, filename = void 0) {
      webidl.brandCheck(this, FormData2);
      webidl.argumentLengthCheck(arguments, 2, { header: "FormData.append" });
      if (arguments.length === 3 && !isBlobLike2(value)) {
        throw new TypeError(
          "Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'"
        );
      }
      name = webidl.converters.USVString(name);
      value = isBlobLike2(value) ? webidl.converters.Blob(value, { strict: false }) : webidl.converters.USVString(value);
      filename = arguments.length === 3 ? webidl.converters.USVString(filename) : void 0;
      const entry = makeEntry(name, value, filename);
      this[kState].push(entry);
    }
    delete(name) {
      webidl.brandCheck(this, FormData2);
      webidl.argumentLengthCheck(arguments, 1, { header: "FormData.delete" });
      name = webidl.converters.USVString(name);
      this[kState] = this[kState].filter((entry) => entry.name !== name);
    }
    get(name) {
      webidl.brandCheck(this, FormData2);
      webidl.argumentLengthCheck(arguments, 1, { header: "FormData.get" });
      name = webidl.converters.USVString(name);
      const idx = this[kState].findIndex((entry) => entry.name === name);
      if (idx === -1) {
        return null;
      }
      return this[kState][idx].value;
    }
    getAll(name) {
      webidl.brandCheck(this, FormData2);
      webidl.argumentLengthCheck(arguments, 1, { header: "FormData.getAll" });
      name = webidl.converters.USVString(name);
      return this[kState].filter((entry) => entry.name === name).map((entry) => entry.value);
    }
    has(name) {
      webidl.brandCheck(this, FormData2);
      webidl.argumentLengthCheck(arguments, 1, { header: "FormData.has" });
      name = webidl.converters.USVString(name);
      return this[kState].findIndex((entry) => entry.name === name) !== -1;
    }
    set(name, value, filename = void 0) {
      webidl.brandCheck(this, FormData2);
      webidl.argumentLengthCheck(arguments, 2, { header: "FormData.set" });
      if (arguments.length === 3 && !isBlobLike2(value)) {
        throw new TypeError(
          "Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'"
        );
      }
      name = webidl.converters.USVString(name);
      value = isBlobLike2(value) ? webidl.converters.Blob(value, { strict: false }) : webidl.converters.USVString(value);
      filename = arguments.length === 3 ? toUSVString2(filename) : void 0;
      const entry = makeEntry(name, value, filename);
      const idx = this[kState].findIndex((entry2) => entry2.name === name);
      if (idx !== -1) {
        this[kState] = [
          ...this[kState].slice(0, idx),
          entry,
          ...this[kState].slice(idx + 1).filter((entry2) => entry2.name !== name)
        ];
      } else {
        this[kState].push(entry);
      }
    }
    entries() {
      webidl.brandCheck(this, FormData2);
      return makeIterator(
        () => this[kState].map((pair) => [pair.name, pair.value]),
        "FormData",
        "key+value"
      );
    }
    keys() {
      webidl.brandCheck(this, FormData2);
      return makeIterator(
        () => this[kState].map((pair) => [pair.name, pair.value]),
        "FormData",
        "key"
      );
    }
    values() {
      webidl.brandCheck(this, FormData2);
      return makeIterator(
        () => this[kState].map((pair) => [pair.name, pair.value]),
        "FormData",
        "value"
      );
    }
    /**
     * @param {(value: string, key: string, self: FormData) => void} callbackFn
     * @param {unknown} thisArg
     */
    forEach(callbackFn, thisArg = globalThis) {
      webidl.brandCheck(this, FormData2);
      webidl.argumentLengthCheck(arguments, 1, { header: "FormData.forEach" });
      if (typeof callbackFn !== "function") {
        throw new TypeError(
          "Failed to execute 'forEach' on 'FormData': parameter 1 is not of type 'Function'."
        );
      }
      for (const [key, value] of this) {
        callbackFn.apply(thisArg, [value, key, this]);
      }
    }
  }
  FormData2.prototype[Symbol.iterator] = FormData2.prototype.entries;
  Object.defineProperties(FormData2.prototype, {
    [Symbol.toStringTag]: {
      value: "FormData",
      configurable: true
    }
  });
  function makeEntry(name, value, filename) {
    name = Buffer.from(name).toString("utf8");
    if (typeof value === "string") {
      value = Buffer.from(value).toString("utf8");
    } else {
      if (!isFileLike(value)) {
        value = value instanceof Blob2 ? new File([value], "blob", { type: value.type }) : new FileLike(value, "blob", { type: value.type });
      }
      if (filename !== void 0) {
        const options = {
          type: value.type,
          lastModified: value.lastModified
        };
        value = NativeFile && value instanceof NativeFile || value instanceof UndiciFile ? new File([value], filename, options) : new FileLike(value, filename, options);
      }
    }
    return { name, value };
  }
  formdata = { FormData: FormData2 };
  return formdata;
}
var body;
var hasRequiredBody;
function requireBody() {
  if (hasRequiredBody)
    return body;
  hasRequiredBody = 1;
  const Busboy = requireLib();
  const util2 = util$j;
  const {
    ReadableStreamFrom: ReadableStreamFrom2,
    isBlobLike: isBlobLike2,
    isReadableStreamLike,
    readableStreamClose,
    createDeferredPromise,
    fullyReadBody
  } = requireUtil$4();
  const { FormData: FormData2 } = requireFormdata();
  const { kState } = requireSymbols$3();
  const { webidl } = requireWebidl();
  const { DOMException: DOMException2, structuredClone } = requireConstants$3();
  const { Blob: Blob2, File: NativeFile } = require$$7;
  const { kBodyUsed: kBodyUsed2 } = symbols$4;
  const assert2 = require$$0$1;
  const { isErrored: isErrored2 } = util$j;
  const { isUint8Array, isArrayBuffer: isArrayBuffer2 } = require$$5;
  const { File: UndiciFile } = requireFile();
  const { parseMIMEType, serializeAMimeType } = requireDataURL();
  let ReadableStream2 = globalThis.ReadableStream;
  const File = NativeFile ?? UndiciFile;
  function extractBody2(object, keepalive = false) {
    if (!ReadableStream2) {
      ReadableStream2 = require$$13.ReadableStream;
    }
    let stream2 = null;
    if (object instanceof ReadableStream2) {
      stream2 = object;
    } else if (isBlobLike2(object)) {
      stream2 = object.stream();
    } else {
      stream2 = new ReadableStream2({
        async pull(controller) {
          controller.enqueue(
            typeof source === "string" ? new TextEncoder().encode(source) : source
          );
          queueMicrotask(() => readableStreamClose(controller));
        },
        start() {
        },
        type: void 0
      });
    }
    assert2(isReadableStreamLike(stream2));
    let action = null;
    let source = null;
    let length = null;
    let type = null;
    if (typeof object === "string") {
      source = object;
      type = "text/plain;charset=UTF-8";
    } else if (object instanceof URLSearchParams) {
      source = object.toString();
      type = "application/x-www-form-urlencoded;charset=UTF-8";
    } else if (isArrayBuffer2(object)) {
      source = new Uint8Array(object.slice());
    } else if (ArrayBuffer.isView(object)) {
      source = new Uint8Array(object.buffer.slice(object.byteOffset, object.byteOffset + object.byteLength));
    } else if (util2.isFormDataLike(object)) {
      const boundary = `----formdata-undici-${Math.random()}`.replace(".", "").slice(0, 32);
      const prefix = `--${boundary}\r
Content-Disposition: form-data`;
      /*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
      const escape = (str) => str.replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
      const normalizeLinefeeds = (value) => value.replace(/\r?\n|\r/g, "\r\n");
      const enc = new TextEncoder();
      const blobParts = [];
      const rn = new Uint8Array([13, 10]);
      length = 0;
      let hasUnknownSizeValue = false;
      for (const [name, value] of object) {
        if (typeof value === "string") {
          const chunk2 = enc.encode(prefix + `; name="${escape(normalizeLinefeeds(name))}"\r
\r
${normalizeLinefeeds(value)}\r
`);
          blobParts.push(chunk2);
          length += chunk2.byteLength;
        } else {
          const chunk2 = enc.encode(`${prefix}; name="${escape(normalizeLinefeeds(name))}"` + (value.name ? `; filename="${escape(value.name)}"` : "") + `\r
Content-Type: ${value.type || "application/octet-stream"}\r
\r
`);
          blobParts.push(chunk2, value, rn);
          if (typeof value.size === "number") {
            length += chunk2.byteLength + value.size + rn.byteLength;
          } else {
            hasUnknownSizeValue = true;
          }
        }
      }
      const chunk = enc.encode(`--${boundary}--`);
      blobParts.push(chunk);
      length += chunk.byteLength;
      if (hasUnknownSizeValue) {
        length = null;
      }
      source = object;
      action = async function* () {
        for (const part of blobParts) {
          if (part.stream) {
            yield* part.stream();
          } else {
            yield part;
          }
        }
      };
      type = "multipart/form-data; boundary=" + boundary;
    } else if (isBlobLike2(object)) {
      source = object;
      length = object.size;
      if (object.type) {
        type = object.type;
      }
    } else if (typeof object[Symbol.asyncIterator] === "function") {
      if (keepalive) {
        throw new TypeError("keepalive");
      }
      if (util2.isDisturbed(object) || object.locked) {
        throw new TypeError(
          "Response body object should not be disturbed or locked"
        );
      }
      stream2 = object instanceof ReadableStream2 ? object : ReadableStreamFrom2(object);
    }
    if (typeof source === "string" || util2.isBuffer(source)) {
      length = Buffer.byteLength(source);
    }
    if (action != null) {
      let iterator;
      stream2 = new ReadableStream2({
        async start() {
          iterator = action(object)[Symbol.asyncIterator]();
        },
        async pull(controller) {
          const { value, done } = await iterator.next();
          if (done) {
            queueMicrotask(() => {
              controller.close();
            });
          } else {
            if (!isErrored2(stream2)) {
              controller.enqueue(new Uint8Array(value));
            }
          }
          return controller.desiredSize > 0;
        },
        async cancel(reason) {
          await iterator.return();
        },
        type: void 0
      });
    }
    const body2 = { stream: stream2, source, length };
    return [body2, type];
  }
  function safelyExtractBody(object, keepalive = false) {
    if (!ReadableStream2) {
      ReadableStream2 = require$$13.ReadableStream;
    }
    if (object instanceof ReadableStream2) {
      assert2(!util2.isDisturbed(object), "The body has already been consumed.");
      assert2(!object.locked, "The stream is locked.");
    }
    return extractBody2(object, keepalive);
  }
  function cloneBody(body2) {
    const [out1, out2] = body2.stream.tee();
    const out2Clone = structuredClone(out2, { transfer: [out2] });
    const [, finalClone] = out2Clone.tee();
    body2.stream = out1;
    return {
      stream: finalClone,
      length: body2.length,
      source: body2.source
    };
  }
  async function* consumeBody(body2) {
    if (body2) {
      if (isUint8Array(body2)) {
        yield body2;
      } else {
        const stream2 = body2.stream;
        if (util2.isDisturbed(stream2)) {
          throw new TypeError("The body has already been consumed.");
        }
        if (stream2.locked) {
          throw new TypeError("The stream is locked.");
        }
        stream2[kBodyUsed2] = true;
        yield* stream2;
      }
    }
  }
  function throwIfAborted2(state) {
    if (state.aborted) {
      throw new DOMException2("The operation was aborted.", "AbortError");
    }
  }
  function bodyMixinMethods(instance) {
    const methods = {
      blob() {
        return specConsumeBody(this, (bytes) => {
          let mimeType = bodyMimeType(this);
          if (mimeType === "failure") {
            mimeType = "";
          } else if (mimeType) {
            mimeType = serializeAMimeType(mimeType);
          }
          return new Blob2([bytes], { type: mimeType });
        }, instance);
      },
      arrayBuffer() {
        return specConsumeBody(this, (bytes) => {
          return new Uint8Array(bytes).buffer;
        }, instance);
      },
      text() {
        return specConsumeBody(this, utf8DecodeBytes, instance);
      },
      json() {
        return specConsumeBody(this, parseJSONFromBytes, instance);
      },
      async formData() {
        webidl.brandCheck(this, instance);
        throwIfAborted2(this[kState]);
        const contentType = this.headers.get("Content-Type");
        if (/multipart\/form-data/.test(contentType)) {
          const headers2 = {};
          for (const [key, value] of this.headers)
            headers2[key.toLowerCase()] = value;
          const responseFormData = new FormData2();
          let busboy;
          try {
            busboy = Busboy({
              headers: headers2,
              defParamCharset: "utf8"
            });
          } catch (err) {
            throw new DOMException2(`${err}`, "AbortError");
          }
          busboy.on("field", (name, value) => {
            responseFormData.append(name, value);
          });
          busboy.on("file", (name, value, info) => {
            const { filename, encoding: encoding2, mimeType } = info;
            const chunks = [];
            if (encoding2 === "base64" || encoding2.toLowerCase() === "base64") {
              let base64chunk = "";
              value.on("data", (chunk) => {
                base64chunk += chunk.toString().replace(/[\r\n]/gm, "");
                const end = base64chunk.length - base64chunk.length % 4;
                chunks.push(Buffer.from(base64chunk.slice(0, end), "base64"));
                base64chunk = base64chunk.slice(end);
              });
              value.on("end", () => {
                chunks.push(Buffer.from(base64chunk, "base64"));
                responseFormData.append(name, new File(chunks, filename, { type: mimeType }));
              });
            } else {
              value.on("data", (chunk) => {
                chunks.push(chunk);
              });
              value.on("end", () => {
                responseFormData.append(name, new File(chunks, filename, { type: mimeType }));
              });
            }
          });
          const busboyResolve = new Promise((resolve, reject) => {
            busboy.on("finish", resolve);
            busboy.on("error", (err) => reject(new TypeError(err)));
          });
          if (this.body !== null)
            for await (const chunk of consumeBody(this[kState].body))
              busboy.write(chunk);
          busboy.end();
          await busboyResolve;
          return responseFormData;
        } else if (/application\/x-www-form-urlencoded/.test(contentType)) {
          let entries;
          try {
            let text = "";
            const textDecoder = new TextDecoder("utf-8", { ignoreBOM: true });
            for await (const chunk of consumeBody(this[kState].body)) {
              if (!isUint8Array(chunk)) {
                throw new TypeError("Expected Uint8Array chunk");
              }
              text += textDecoder.decode(chunk, { stream: true });
            }
            text += textDecoder.decode();
            entries = new URLSearchParams(text);
          } catch (err) {
            throw Object.assign(new TypeError(), { cause: err });
          }
          const formData = new FormData2();
          for (const [name, value] of entries) {
            formData.append(name, value);
          }
          return formData;
        } else {
          await Promise.resolve();
          throwIfAborted2(this[kState]);
          throw webidl.errors.exception({
            header: `${instance.name}.formData`,
            message: "Could not parse content as FormData."
          });
        }
      }
    };
    return methods;
  }
  function mixinBody(prototype) {
    Object.assign(prototype.prototype, bodyMixinMethods(prototype));
  }
  async function specConsumeBody(object, convertBytesToJSValue, instance) {
    webidl.brandCheck(object, instance);
    throwIfAborted2(object[kState]);
    if (bodyUnusable(object[kState].body)) {
      throw new TypeError("Body is unusable");
    }
    const promise = createDeferredPromise();
    const errorSteps = (error) => promise.reject(error);
    const successSteps = (data) => {
      try {
        promise.resolve(convertBytesToJSValue(data));
      } catch (e) {
        errorSteps(e);
      }
    };
    if (object[kState].body == null) {
      successSteps(new Uint8Array());
      return promise.promise;
    }
    fullyReadBody(object[kState].body, successSteps, errorSteps);
    return promise.promise;
  }
  function bodyUnusable(body2) {
    return body2 != null && (body2.stream.locked || util2.isDisturbed(body2.stream));
  }
  function utf8DecodeBytes(buffer) {
    if (buffer.length === 0) {
      return "";
    }
    if (buffer[0] === 239 && buffer[1] === 187 && buffer[2] === 191) {
      buffer = buffer.subarray(3);
    }
    const output = new TextDecoder().decode(buffer);
    return output;
  }
  function parseJSONFromBytes(bytes) {
    return JSON.parse(utf8DecodeBytes(bytes));
  }
  function bodyMimeType(object) {
    const { headersList } = object[kState];
    const contentType = headersList.get("content-type");
    if (contentType === null) {
      return "failure";
    }
    return parseMIMEType(contentType);
  }
  body = {
    extractBody: extractBody2,
    safelyExtractBody,
    cloneBody,
    mixinBody
  };
  return body;
}
const {
  InvalidArgumentError: InvalidArgumentError$h,
  NotSupportedError: NotSupportedError$1
} = errors$1;
const assert$7 = require$$0$1;
const util$h = util$j;
const tokenRegExp = /^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/;
const headerCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
const invalidPathRegex = /[^\u0021-\u00ff]/;
const kHandler = Symbol("handler");
const channels$1 = {};
let extractBody;
try {
  const diagnosticsChannel = require("diagnostics_channel");
  channels$1.create = diagnosticsChannel.channel("undici:request:create");
  channels$1.bodySent = diagnosticsChannel.channel("undici:request:bodySent");
  channels$1.headers = diagnosticsChannel.channel("undici:request:headers");
  channels$1.trailers = diagnosticsChannel.channel("undici:request:trailers");
  channels$1.error = diagnosticsChannel.channel("undici:request:error");
} catch {
  channels$1.create = { hasSubscribers: false };
  channels$1.bodySent = { hasSubscribers: false };
  channels$1.headers = { hasSubscribers: false };
  channels$1.trailers = { hasSubscribers: false };
  channels$1.error = { hasSubscribers: false };
}
let Request$5 = class Request2 {
  constructor(origin, {
    path,
    method,
    body: body2,
    headers: headers2,
    query,
    idempotent,
    blocking,
    upgrade: upgrade2,
    headersTimeout,
    bodyTimeout,
    reset,
    throwOnError
  }, handler) {
    if (typeof path !== "string") {
      throw new InvalidArgumentError$h("path must be a string");
    } else if (path[0] !== "/" && !(path.startsWith("http://") || path.startsWith("https://")) && method !== "CONNECT") {
      throw new InvalidArgumentError$h("path must be an absolute URL or start with a slash");
    } else if (invalidPathRegex.exec(path) !== null) {
      throw new InvalidArgumentError$h("invalid request path");
    }
    if (typeof method !== "string") {
      throw new InvalidArgumentError$h("method must be a string");
    } else if (tokenRegExp.exec(method) === null) {
      throw new InvalidArgumentError$h("invalid request method");
    }
    if (upgrade2 && typeof upgrade2 !== "string") {
      throw new InvalidArgumentError$h("upgrade must be a string");
    }
    if (headersTimeout != null && (!Number.isFinite(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError$h("invalid headersTimeout");
    }
    if (bodyTimeout != null && (!Number.isFinite(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError$h("invalid bodyTimeout");
    }
    if (reset != null && typeof reset !== "boolean") {
      throw new InvalidArgumentError$h("invalid reset");
    }
    this.headersTimeout = headersTimeout;
    this.bodyTimeout = bodyTimeout;
    this.throwOnError = throwOnError === true;
    this.method = method;
    if (body2 == null) {
      this.body = null;
    } else if (util$h.isStream(body2)) {
      this.body = body2;
    } else if (util$h.isBuffer(body2)) {
      this.body = body2.byteLength ? body2 : null;
    } else if (ArrayBuffer.isView(body2)) {
      this.body = body2.buffer.byteLength ? Buffer.from(body2.buffer, body2.byteOffset, body2.byteLength) : null;
    } else if (body2 instanceof ArrayBuffer) {
      this.body = body2.byteLength ? Buffer.from(body2) : null;
    } else if (typeof body2 === "string") {
      this.body = body2.length ? Buffer.from(body2) : null;
    } else if (util$h.isFormDataLike(body2) || util$h.isIterable(body2) || util$h.isBlobLike(body2)) {
      this.body = body2;
    } else {
      throw new InvalidArgumentError$h("body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable");
    }
    this.completed = false;
    this.aborted = false;
    this.upgrade = upgrade2 || null;
    this.path = query ? util$h.buildURL(path, query) : path;
    this.origin = origin;
    this.idempotent = idempotent == null ? method === "HEAD" || method === "GET" : idempotent;
    this.blocking = blocking == null ? false : blocking;
    this.reset = reset == null ? null : reset;
    this.host = null;
    this.contentLength = null;
    this.contentType = null;
    this.headers = "";
    if (Array.isArray(headers2)) {
      if (headers2.length % 2 !== 0) {
        throw new InvalidArgumentError$h("headers array must be even");
      }
      for (let i = 0; i < headers2.length; i += 2) {
        processHeader(this, headers2[i], headers2[i + 1]);
      }
    } else if (headers2 && typeof headers2 === "object") {
      const keys = Object.keys(headers2);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        processHeader(this, key, headers2[key]);
      }
    } else if (headers2 != null) {
      throw new InvalidArgumentError$h("headers must be an object or an array");
    }
    if (util$h.isFormDataLike(this.body)) {
      if (util$h.nodeMajor < 16 || util$h.nodeMajor === 16 && util$h.nodeMinor < 8) {
        throw new InvalidArgumentError$h("Form-Data bodies are only supported in node v16.8 and newer.");
      }
      if (!extractBody) {
        extractBody = requireBody().extractBody;
      }
      const [bodyStream, contentType] = extractBody(body2);
      if (this.contentType == null) {
        this.contentType = contentType;
        this.headers += `content-type: ${contentType}\r
`;
      }
      this.body = bodyStream.stream;
      this.contentLength = bodyStream.length;
    } else if (util$h.isBlobLike(body2) && this.contentType == null && body2.type) {
      this.contentType = body2.type;
      this.headers += `content-type: ${body2.type}\r
`;
    }
    util$h.validateHandler(handler, method, upgrade2);
    this.servername = util$h.getServerName(this.host);
    this[kHandler] = handler;
    if (channels$1.create.hasSubscribers) {
      channels$1.create.publish({ request: this });
    }
  }
  onBodySent(chunk) {
    if (this[kHandler].onBodySent) {
      try {
        this[kHandler].onBodySent(chunk);
      } catch (err) {
        this.onError(err);
      }
    }
  }
  onRequestSent() {
    if (channels$1.bodySent.hasSubscribers) {
      channels$1.bodySent.publish({ request: this });
    }
  }
  onConnect(abort2) {
    assert$7(!this.aborted);
    assert$7(!this.completed);
    return this[kHandler].onConnect(abort2);
  }
  onHeaders(statusCode, headers2, resume2, statusText) {
    assert$7(!this.aborted);
    assert$7(!this.completed);
    if (channels$1.headers.hasSubscribers) {
      channels$1.headers.publish({ request: this, response: { statusCode, headers: headers2, statusText } });
    }
    return this[kHandler].onHeaders(statusCode, headers2, resume2, statusText);
  }
  onData(chunk) {
    assert$7(!this.aborted);
    assert$7(!this.completed);
    return this[kHandler].onData(chunk);
  }
  onUpgrade(statusCode, headers2, socket) {
    assert$7(!this.aborted);
    assert$7(!this.completed);
    return this[kHandler].onUpgrade(statusCode, headers2, socket);
  }
  onComplete(trailers) {
    assert$7(!this.aborted);
    this.completed = true;
    if (channels$1.trailers.hasSubscribers) {
      channels$1.trailers.publish({ request: this, trailers });
    }
    return this[kHandler].onComplete(trailers);
  }
  onError(error) {
    if (channels$1.error.hasSubscribers) {
      channels$1.error.publish({ request: this, error });
    }
    if (this.aborted) {
      return;
    }
    this.aborted = true;
    return this[kHandler].onError(error);
  }
  addHeader(key, value) {
    processHeader(this, key, value);
    return this;
  }
};
function processHeaderValue(key, val) {
  if (val && typeof val === "object") {
    throw new InvalidArgumentError$h(`invalid ${key} header`);
  }
  val = val != null ? `${val}` : "";
  if (headerCharRegex.exec(val) !== null) {
    throw new InvalidArgumentError$h(`invalid ${key} header`);
  }
  return `${key}: ${val}\r
`;
}
function processHeader(request2, key, val) {
  if (val && (typeof val === "object" && !Array.isArray(val))) {
    throw new InvalidArgumentError$h(`invalid ${key} header`);
  } else if (val === void 0) {
    return;
  }
  if (request2.host === null && key.length === 4 && key.toLowerCase() === "host") {
    if (headerCharRegex.exec(val) !== null) {
      throw new InvalidArgumentError$h(`invalid ${key} header`);
    }
    request2.host = val;
  } else if (request2.contentLength === null && key.length === 14 && key.toLowerCase() === "content-length") {
    request2.contentLength = parseInt(val, 10);
    if (!Number.isFinite(request2.contentLength)) {
      throw new InvalidArgumentError$h("invalid content-length header");
    }
  } else if (request2.contentType === null && key.length === 12 && key.toLowerCase() === "content-type") {
    request2.contentType = val;
    request2.headers += processHeaderValue(key, val);
  } else if (key.length === 17 && key.toLowerCase() === "transfer-encoding") {
    throw new InvalidArgumentError$h("invalid transfer-encoding header");
  } else if (key.length === 10 && key.toLowerCase() === "connection") {
    const value = typeof val === "string" ? val.toLowerCase() : null;
    if (value !== "close" && value !== "keep-alive") {
      throw new InvalidArgumentError$h("invalid connection header");
    } else if (value === "close") {
      request2.reset = true;
    }
  } else if (key.length === 10 && key.toLowerCase() === "keep-alive") {
    throw new InvalidArgumentError$h("invalid keep-alive header");
  } else if (key.length === 7 && key.toLowerCase() === "upgrade") {
    throw new InvalidArgumentError$h("invalid upgrade header");
  } else if (key.length === 6 && key.toLowerCase() === "expect") {
    throw new NotSupportedError$1("expect header not supported");
  } else if (tokenRegExp.exec(key) === null) {
    throw new InvalidArgumentError$h("invalid header key");
  } else {
    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        request2.headers += processHeaderValue(key, val[i]);
      }
    } else {
      request2.headers += processHeaderValue(key, val);
    }
  }
}
var request$3 = Request$5;
const EventEmitter = require$$0$6;
let Dispatcher$2 = class Dispatcher extends EventEmitter {
  dispatch() {
    throw new Error("not implemented");
  }
  close() {
    throw new Error("not implemented");
  }
  destroy() {
    throw new Error("not implemented");
  }
};
var dispatcher = Dispatcher$2;
const Dispatcher$1 = dispatcher;
const {
  ClientDestroyedError: ClientDestroyedError$1,
  ClientClosedError: ClientClosedError2,
  InvalidArgumentError: InvalidArgumentError$g
} = errors$1;
const { kDestroy: kDestroy$3, kClose: kClose$5, kDispatch: kDispatch$3, kInterceptors: kInterceptors$3 } = symbols$4;
const kDestroyed = Symbol("destroyed");
const kClosed = Symbol("closed");
const kOnDestroyed = Symbol("onDestroyed");
const kOnClosed = Symbol("onClosed");
const kInterceptedDispatch = Symbol("Intercepted Dispatch");
let DispatcherBase$3 = class DispatcherBase extends Dispatcher$1 {
  constructor() {
    super();
    this[kDestroyed] = false;
    this[kOnDestroyed] = null;
    this[kClosed] = false;
    this[kOnClosed] = [];
  }
  get destroyed() {
    return this[kDestroyed];
  }
  get closed() {
    return this[kClosed];
  }
  get interceptors() {
    return this[kInterceptors$3];
  }
  set interceptors(newInterceptors) {
    if (newInterceptors) {
      for (let i = newInterceptors.length - 1; i >= 0; i--) {
        const interceptor = this[kInterceptors$3][i];
        if (typeof interceptor !== "function") {
          throw new InvalidArgumentError$g("interceptor must be an function");
        }
      }
    }
    this[kInterceptors$3] = newInterceptors;
  }
  close(callback) {
    if (callback === void 0) {
      return new Promise((resolve, reject) => {
        this.close((err, data) => {
          return err ? reject(err) : resolve(data);
        });
      });
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$g("invalid callback");
    }
    if (this[kDestroyed]) {
      queueMicrotask(() => callback(new ClientDestroyedError$1(), null));
      return;
    }
    if (this[kClosed]) {
      if (this[kOnClosed]) {
        this[kOnClosed].push(callback);
      } else {
        queueMicrotask(() => callback(null, null));
      }
      return;
    }
    this[kClosed] = true;
    this[kOnClosed].push(callback);
    const onClosed = () => {
      const callbacks = this[kOnClosed];
      this[kOnClosed] = null;
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](null, null);
      }
    };
    this[kClose$5]().then(() => this.destroy()).then(() => {
      queueMicrotask(onClosed);
    });
  }
  destroy(err, callback) {
    if (typeof err === "function") {
      callback = err;
      err = null;
    }
    if (callback === void 0) {
      return new Promise((resolve, reject) => {
        this.destroy(err, (err2, data) => {
          return err2 ? (
            /* istanbul ignore next: should never error */
            reject(err2)
          ) : resolve(data);
        });
      });
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$g("invalid callback");
    }
    if (this[kDestroyed]) {
      if (this[kOnDestroyed]) {
        this[kOnDestroyed].push(callback);
      } else {
        queueMicrotask(() => callback(null, null));
      }
      return;
    }
    if (!err) {
      err = new ClientDestroyedError$1();
    }
    this[kDestroyed] = true;
    this[kOnDestroyed] = this[kOnDestroyed] || [];
    this[kOnDestroyed].push(callback);
    const onDestroyed = () => {
      const callbacks = this[kOnDestroyed];
      this[kOnDestroyed] = null;
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](null, null);
      }
    };
    this[kDestroy$3](err).then(() => {
      queueMicrotask(onDestroyed);
    });
  }
  [kInterceptedDispatch](opts, handler) {
    if (!this[kInterceptors$3] || this[kInterceptors$3].length === 0) {
      this[kInterceptedDispatch] = this[kDispatch$3];
      return this[kDispatch$3](opts, handler);
    }
    let dispatch = this[kDispatch$3].bind(this);
    for (let i = this[kInterceptors$3].length - 1; i >= 0; i--) {
      dispatch = this[kInterceptors$3][i](dispatch);
    }
    this[kInterceptedDispatch] = dispatch;
    return dispatch(opts, handler);
  }
  dispatch(opts, handler) {
    if (!handler || typeof handler !== "object") {
      throw new InvalidArgumentError$g("handler must be an object");
    }
    try {
      if (!opts || typeof opts !== "object") {
        throw new InvalidArgumentError$g("opts must be an object.");
      }
      if (this[kDestroyed] || this[kOnDestroyed]) {
        throw new ClientDestroyedError$1();
      }
      if (this[kClosed]) {
        throw new ClientClosedError2();
      }
      return this[kInterceptedDispatch](opts, handler);
    } catch (err) {
      if (typeof handler.onError !== "function") {
        throw new InvalidArgumentError$g("invalid onError method");
      }
      handler.onError(err);
      return false;
    }
  }
};
var dispatcherBase = DispatcherBase$3;
const net$1 = require$$4;
const assert$6 = require$$0$1;
const util$g = util$j;
const { InvalidArgumentError: InvalidArgumentError$f, ConnectTimeoutError: ConnectTimeoutError2 } = errors$1;
let tls;
let SessionCache;
if (commonjsGlobal.FinalizationRegistry) {
  SessionCache = class WeakSessionCache {
    constructor(maxCachedSessions) {
      this._maxCachedSessions = maxCachedSessions;
      this._sessionCache = /* @__PURE__ */ new Map();
      this._sessionRegistry = new commonjsGlobal.FinalizationRegistry((key) => {
        if (this._sessionCache.size < this._maxCachedSessions) {
          return;
        }
        const ref = this._sessionCache.get(key);
        if (ref !== void 0 && ref.deref() === void 0) {
          this._sessionCache.delete(key);
        }
      });
    }
    get(sessionKey) {
      const ref = this._sessionCache.get(sessionKey);
      return ref ? ref.deref() : null;
    }
    set(sessionKey, session) {
      if (this._maxCachedSessions === 0) {
        return;
      }
      this._sessionCache.set(sessionKey, new WeakRef(session));
      this._sessionRegistry.register(session, sessionKey);
    }
  };
} else {
  SessionCache = class SimpleSessionCache {
    constructor(maxCachedSessions) {
      this._maxCachedSessions = maxCachedSessions;
      this._sessionCache = /* @__PURE__ */ new Map();
    }
    get(sessionKey) {
      return this._sessionCache.get(sessionKey);
    }
    set(sessionKey, session) {
      if (this._maxCachedSessions === 0) {
        return;
      }
      if (this._sessionCache.size >= this._maxCachedSessions) {
        const { value: oldestKey } = this._sessionCache.keys().next();
        this._sessionCache.delete(oldestKey);
      }
      this._sessionCache.set(sessionKey, session);
    }
  };
}
function buildConnector$2({ maxCachedSessions, socketPath, timeout, ...opts }) {
  if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) {
    throw new InvalidArgumentError$f("maxCachedSessions must be a positive integer or zero");
  }
  const options = { path: socketPath, ...opts };
  const sessionCache = new SessionCache(maxCachedSessions == null ? 100 : maxCachedSessions);
  timeout = timeout == null ? 1e4 : timeout;
  return function connect2({ hostname, host, protocol, port, servername, localAddress, httpSocket }, callback) {
    let socket;
    if (protocol === "https:") {
      if (!tls) {
        tls = require$$4$1;
      }
      servername = servername || options.servername || util$g.getServerName(host) || null;
      const sessionKey = servername || hostname;
      const session = sessionCache.get(sessionKey) || null;
      assert$6(sessionKey);
      socket = tls.connect({
        highWaterMark: 16384,
        // TLS in node can't have bigger HWM anyway...
        ...options,
        servername,
        session,
        localAddress,
        socket: httpSocket,
        // upgrade socket connection
        port: port || 443,
        host: hostname
      });
      socket.on("session", function(session2) {
        sessionCache.set(sessionKey, session2);
      });
    } else {
      assert$6(!httpSocket, "httpSocket can only be sent on TLS update");
      socket = net$1.connect({
        highWaterMark: 64 * 1024,
        // Same as nodejs fs streams.
        ...options,
        localAddress,
        port: port || 80,
        host: hostname
      });
    }
    if (options.keepAlive == null || options.keepAlive) {
      const keepAliveInitialDelay = options.keepAliveInitialDelay === void 0 ? 6e4 : options.keepAliveInitialDelay;
      socket.setKeepAlive(true, keepAliveInitialDelay);
    }
    const cancelTimeout = setupTimeout(() => onConnectTimeout(socket), timeout);
    socket.setNoDelay(true).once(protocol === "https:" ? "secureConnect" : "connect", function() {
      cancelTimeout();
      if (callback) {
        const cb = callback;
        callback = null;
        cb(null, this);
      }
    }).on("error", function(err) {
      cancelTimeout();
      if (callback) {
        const cb = callback;
        callback = null;
        cb(err);
      }
    });
    return socket;
  };
}
function setupTimeout(onConnectTimeout2, timeout) {
  if (!timeout) {
    return () => {
    };
  }
  let s1 = null;
  let s2 = null;
  const timeoutId = setTimeout(() => {
    s1 = setImmediate(() => {
      if (process.platform === "win32") {
        s2 = setImmediate(() => onConnectTimeout2());
      } else {
        onConnectTimeout2();
      }
    });
  }, timeout);
  return () => {
    clearTimeout(timeoutId);
    clearImmediate(s1);
    clearImmediate(s2);
  };
}
function onConnectTimeout(socket) {
  util$g.destroy(socket, new ConnectTimeoutError2());
}
var connect$2 = buildConnector$2;
var constants$3 = {};
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils)
    return utils;
  hasRequiredUtils = 1;
  Object.defineProperty(utils, "__esModule", { value: true });
  utils.enumToMap = void 0;
  function enumToMap(obj) {
    const res = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (typeof value === "number") {
        res[key] = value;
      }
    });
    return res;
  }
  utils.enumToMap = enumToMap;
  return utils;
}
var hasRequiredConstants$2;
function requireConstants$2() {
  if (hasRequiredConstants$2)
    return constants$3;
  hasRequiredConstants$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SPECIAL_HEADERS = exports.HEADER_STATE = exports.MINOR = exports.MAJOR = exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS = exports.TOKEN = exports.STRICT_TOKEN = exports.HEX = exports.URL_CHAR = exports.STRICT_URL_CHAR = exports.USERINFO_CHARS = exports.MARK = exports.ALPHANUM = exports.NUM = exports.HEX_MAP = exports.NUM_MAP = exports.ALPHA = exports.FINISH = exports.H_METHOD_MAP = exports.METHOD_MAP = exports.METHODS_RTSP = exports.METHODS_ICE = exports.METHODS_HTTP = exports.METHODS = exports.LENIENT_FLAGS = exports.FLAGS = exports.TYPE = exports.ERROR = void 0;
    const utils_1 = requireUtils();
    (function(ERROR) {
      ERROR[ERROR["OK"] = 0] = "OK";
      ERROR[ERROR["INTERNAL"] = 1] = "INTERNAL";
      ERROR[ERROR["STRICT"] = 2] = "STRICT";
      ERROR[ERROR["LF_EXPECTED"] = 3] = "LF_EXPECTED";
      ERROR[ERROR["UNEXPECTED_CONTENT_LENGTH"] = 4] = "UNEXPECTED_CONTENT_LENGTH";
      ERROR[ERROR["CLOSED_CONNECTION"] = 5] = "CLOSED_CONNECTION";
      ERROR[ERROR["INVALID_METHOD"] = 6] = "INVALID_METHOD";
      ERROR[ERROR["INVALID_URL"] = 7] = "INVALID_URL";
      ERROR[ERROR["INVALID_CONSTANT"] = 8] = "INVALID_CONSTANT";
      ERROR[ERROR["INVALID_VERSION"] = 9] = "INVALID_VERSION";
      ERROR[ERROR["INVALID_HEADER_TOKEN"] = 10] = "INVALID_HEADER_TOKEN";
      ERROR[ERROR["INVALID_CONTENT_LENGTH"] = 11] = "INVALID_CONTENT_LENGTH";
      ERROR[ERROR["INVALID_CHUNK_SIZE"] = 12] = "INVALID_CHUNK_SIZE";
      ERROR[ERROR["INVALID_STATUS"] = 13] = "INVALID_STATUS";
      ERROR[ERROR["INVALID_EOF_STATE"] = 14] = "INVALID_EOF_STATE";
      ERROR[ERROR["INVALID_TRANSFER_ENCODING"] = 15] = "INVALID_TRANSFER_ENCODING";
      ERROR[ERROR["CB_MESSAGE_BEGIN"] = 16] = "CB_MESSAGE_BEGIN";
      ERROR[ERROR["CB_HEADERS_COMPLETE"] = 17] = "CB_HEADERS_COMPLETE";
      ERROR[ERROR["CB_MESSAGE_COMPLETE"] = 18] = "CB_MESSAGE_COMPLETE";
      ERROR[ERROR["CB_CHUNK_HEADER"] = 19] = "CB_CHUNK_HEADER";
      ERROR[ERROR["CB_CHUNK_COMPLETE"] = 20] = "CB_CHUNK_COMPLETE";
      ERROR[ERROR["PAUSED"] = 21] = "PAUSED";
      ERROR[ERROR["PAUSED_UPGRADE"] = 22] = "PAUSED_UPGRADE";
      ERROR[ERROR["PAUSED_H2_UPGRADE"] = 23] = "PAUSED_H2_UPGRADE";
      ERROR[ERROR["USER"] = 24] = "USER";
    })(exports.ERROR || (exports.ERROR = {}));
    (function(TYPE) {
      TYPE[TYPE["BOTH"] = 0] = "BOTH";
      TYPE[TYPE["REQUEST"] = 1] = "REQUEST";
      TYPE[TYPE["RESPONSE"] = 2] = "RESPONSE";
    })(exports.TYPE || (exports.TYPE = {}));
    (function(FLAGS) {
      FLAGS[FLAGS["CONNECTION_KEEP_ALIVE"] = 1] = "CONNECTION_KEEP_ALIVE";
      FLAGS[FLAGS["CONNECTION_CLOSE"] = 2] = "CONNECTION_CLOSE";
      FLAGS[FLAGS["CONNECTION_UPGRADE"] = 4] = "CONNECTION_UPGRADE";
      FLAGS[FLAGS["CHUNKED"] = 8] = "CHUNKED";
      FLAGS[FLAGS["UPGRADE"] = 16] = "UPGRADE";
      FLAGS[FLAGS["CONTENT_LENGTH"] = 32] = "CONTENT_LENGTH";
      FLAGS[FLAGS["SKIPBODY"] = 64] = "SKIPBODY";
      FLAGS[FLAGS["TRAILING"] = 128] = "TRAILING";
      FLAGS[FLAGS["TRANSFER_ENCODING"] = 512] = "TRANSFER_ENCODING";
    })(exports.FLAGS || (exports.FLAGS = {}));
    (function(LENIENT_FLAGS) {
      LENIENT_FLAGS[LENIENT_FLAGS["HEADERS"] = 1] = "HEADERS";
      LENIENT_FLAGS[LENIENT_FLAGS["CHUNKED_LENGTH"] = 2] = "CHUNKED_LENGTH";
      LENIENT_FLAGS[LENIENT_FLAGS["KEEP_ALIVE"] = 4] = "KEEP_ALIVE";
    })(exports.LENIENT_FLAGS || (exports.LENIENT_FLAGS = {}));
    var METHODS;
    (function(METHODS2) {
      METHODS2[METHODS2["DELETE"] = 0] = "DELETE";
      METHODS2[METHODS2["GET"] = 1] = "GET";
      METHODS2[METHODS2["HEAD"] = 2] = "HEAD";
      METHODS2[METHODS2["POST"] = 3] = "POST";
      METHODS2[METHODS2["PUT"] = 4] = "PUT";
      METHODS2[METHODS2["CONNECT"] = 5] = "CONNECT";
      METHODS2[METHODS2["OPTIONS"] = 6] = "OPTIONS";
      METHODS2[METHODS2["TRACE"] = 7] = "TRACE";
      METHODS2[METHODS2["COPY"] = 8] = "COPY";
      METHODS2[METHODS2["LOCK"] = 9] = "LOCK";
      METHODS2[METHODS2["MKCOL"] = 10] = "MKCOL";
      METHODS2[METHODS2["MOVE"] = 11] = "MOVE";
      METHODS2[METHODS2["PROPFIND"] = 12] = "PROPFIND";
      METHODS2[METHODS2["PROPPATCH"] = 13] = "PROPPATCH";
      METHODS2[METHODS2["SEARCH"] = 14] = "SEARCH";
      METHODS2[METHODS2["UNLOCK"] = 15] = "UNLOCK";
      METHODS2[METHODS2["BIND"] = 16] = "BIND";
      METHODS2[METHODS2["REBIND"] = 17] = "REBIND";
      METHODS2[METHODS2["UNBIND"] = 18] = "UNBIND";
      METHODS2[METHODS2["ACL"] = 19] = "ACL";
      METHODS2[METHODS2["REPORT"] = 20] = "REPORT";
      METHODS2[METHODS2["MKACTIVITY"] = 21] = "MKACTIVITY";
      METHODS2[METHODS2["CHECKOUT"] = 22] = "CHECKOUT";
      METHODS2[METHODS2["MERGE"] = 23] = "MERGE";
      METHODS2[METHODS2["M-SEARCH"] = 24] = "M-SEARCH";
      METHODS2[METHODS2["NOTIFY"] = 25] = "NOTIFY";
      METHODS2[METHODS2["SUBSCRIBE"] = 26] = "SUBSCRIBE";
      METHODS2[METHODS2["UNSUBSCRIBE"] = 27] = "UNSUBSCRIBE";
      METHODS2[METHODS2["PATCH"] = 28] = "PATCH";
      METHODS2[METHODS2["PURGE"] = 29] = "PURGE";
      METHODS2[METHODS2["MKCALENDAR"] = 30] = "MKCALENDAR";
      METHODS2[METHODS2["LINK"] = 31] = "LINK";
      METHODS2[METHODS2["UNLINK"] = 32] = "UNLINK";
      METHODS2[METHODS2["SOURCE"] = 33] = "SOURCE";
      METHODS2[METHODS2["PRI"] = 34] = "PRI";
      METHODS2[METHODS2["DESCRIBE"] = 35] = "DESCRIBE";
      METHODS2[METHODS2["ANNOUNCE"] = 36] = "ANNOUNCE";
      METHODS2[METHODS2["SETUP"] = 37] = "SETUP";
      METHODS2[METHODS2["PLAY"] = 38] = "PLAY";
      METHODS2[METHODS2["PAUSE"] = 39] = "PAUSE";
      METHODS2[METHODS2["TEARDOWN"] = 40] = "TEARDOWN";
      METHODS2[METHODS2["GET_PARAMETER"] = 41] = "GET_PARAMETER";
      METHODS2[METHODS2["SET_PARAMETER"] = 42] = "SET_PARAMETER";
      METHODS2[METHODS2["REDIRECT"] = 43] = "REDIRECT";
      METHODS2[METHODS2["RECORD"] = 44] = "RECORD";
      METHODS2[METHODS2["FLUSH"] = 45] = "FLUSH";
    })(METHODS = exports.METHODS || (exports.METHODS = {}));
    exports.METHODS_HTTP = [
      METHODS.DELETE,
      METHODS.GET,
      METHODS.HEAD,
      METHODS.POST,
      METHODS.PUT,
      METHODS.CONNECT,
      METHODS.OPTIONS,
      METHODS.TRACE,
      METHODS.COPY,
      METHODS.LOCK,
      METHODS.MKCOL,
      METHODS.MOVE,
      METHODS.PROPFIND,
      METHODS.PROPPATCH,
      METHODS.SEARCH,
      METHODS.UNLOCK,
      METHODS.BIND,
      METHODS.REBIND,
      METHODS.UNBIND,
      METHODS.ACL,
      METHODS.REPORT,
      METHODS.MKACTIVITY,
      METHODS.CHECKOUT,
      METHODS.MERGE,
      METHODS["M-SEARCH"],
      METHODS.NOTIFY,
      METHODS.SUBSCRIBE,
      METHODS.UNSUBSCRIBE,
      METHODS.PATCH,
      METHODS.PURGE,
      METHODS.MKCALENDAR,
      METHODS.LINK,
      METHODS.UNLINK,
      METHODS.PRI,
      // TODO(indutny): should we allow it with HTTP?
      METHODS.SOURCE
    ];
    exports.METHODS_ICE = [
      METHODS.SOURCE
    ];
    exports.METHODS_RTSP = [
      METHODS.OPTIONS,
      METHODS.DESCRIBE,
      METHODS.ANNOUNCE,
      METHODS.SETUP,
      METHODS.PLAY,
      METHODS.PAUSE,
      METHODS.TEARDOWN,
      METHODS.GET_PARAMETER,
      METHODS.SET_PARAMETER,
      METHODS.REDIRECT,
      METHODS.RECORD,
      METHODS.FLUSH,
      // For AirPlay
      METHODS.GET,
      METHODS.POST
    ];
    exports.METHOD_MAP = utils_1.enumToMap(METHODS);
    exports.H_METHOD_MAP = {};
    Object.keys(exports.METHOD_MAP).forEach((key) => {
      if (/^H/.test(key)) {
        exports.H_METHOD_MAP[key] = exports.METHOD_MAP[key];
      }
    });
    (function(FINISH) {
      FINISH[FINISH["SAFE"] = 0] = "SAFE";
      FINISH[FINISH["SAFE_WITH_CB"] = 1] = "SAFE_WITH_CB";
      FINISH[FINISH["UNSAFE"] = 2] = "UNSAFE";
    })(exports.FINISH || (exports.FINISH = {}));
    exports.ALPHA = [];
    for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
      exports.ALPHA.push(String.fromCharCode(i));
      exports.ALPHA.push(String.fromCharCode(i + 32));
    }
    exports.NUM_MAP = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9
    };
    exports.HEX_MAP = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      a: 10,
      b: 11,
      c: 12,
      d: 13,
      e: 14,
      f: 15
    };
    exports.NUM = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ];
    exports.ALPHANUM = exports.ALPHA.concat(exports.NUM);
    exports.MARK = ["-", "_", ".", "!", "~", "*", "'", "(", ")"];
    exports.USERINFO_CHARS = exports.ALPHANUM.concat(exports.MARK).concat(["%", ";", ":", "&", "=", "+", "$", ","]);
    exports.STRICT_URL_CHAR = [
      "!",
      '"',
      "$",
      "%",
      "&",
      "'",
      "(",
      ")",
      "*",
      "+",
      ",",
      "-",
      ".",
      "/",
      ":",
      ";",
      "<",
      "=",
      ">",
      "@",
      "[",
      "\\",
      "]",
      "^",
      "_",
      "`",
      "{",
      "|",
      "}",
      "~"
    ].concat(exports.ALPHANUM);
    exports.URL_CHAR = exports.STRICT_URL_CHAR.concat(["	", "\f"]);
    for (let i = 128; i <= 255; i++) {
      exports.URL_CHAR.push(i);
    }
    exports.HEX = exports.NUM.concat(["a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
    exports.STRICT_TOKEN = [
      "!",
      "#",
      "$",
      "%",
      "&",
      "'",
      "*",
      "+",
      "-",
      ".",
      "^",
      "_",
      "`",
      "|",
      "~"
    ].concat(exports.ALPHANUM);
    exports.TOKEN = exports.STRICT_TOKEN.concat([" "]);
    exports.HEADER_CHARS = ["	"];
    for (let i = 32; i <= 255; i++) {
      if (i !== 127) {
        exports.HEADER_CHARS.push(i);
      }
    }
    exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS.filter((c) => c !== 44);
    exports.MAJOR = exports.NUM_MAP;
    exports.MINOR = exports.MAJOR;
    var HEADER_STATE;
    (function(HEADER_STATE2) {
      HEADER_STATE2[HEADER_STATE2["GENERAL"] = 0] = "GENERAL";
      HEADER_STATE2[HEADER_STATE2["CONNECTION"] = 1] = "CONNECTION";
      HEADER_STATE2[HEADER_STATE2["CONTENT_LENGTH"] = 2] = "CONTENT_LENGTH";
      HEADER_STATE2[HEADER_STATE2["TRANSFER_ENCODING"] = 3] = "TRANSFER_ENCODING";
      HEADER_STATE2[HEADER_STATE2["UPGRADE"] = 4] = "UPGRADE";
      HEADER_STATE2[HEADER_STATE2["CONNECTION_KEEP_ALIVE"] = 5] = "CONNECTION_KEEP_ALIVE";
      HEADER_STATE2[HEADER_STATE2["CONNECTION_CLOSE"] = 6] = "CONNECTION_CLOSE";
      HEADER_STATE2[HEADER_STATE2["CONNECTION_UPGRADE"] = 7] = "CONNECTION_UPGRADE";
      HEADER_STATE2[HEADER_STATE2["TRANSFER_ENCODING_CHUNKED"] = 8] = "TRANSFER_ENCODING_CHUNKED";
    })(HEADER_STATE = exports.HEADER_STATE || (exports.HEADER_STATE = {}));
    exports.SPECIAL_HEADERS = {
      "connection": HEADER_STATE.CONNECTION,
      "content-length": HEADER_STATE.CONTENT_LENGTH,
      "proxy-connection": HEADER_STATE.CONNECTION,
      "transfer-encoding": HEADER_STATE.TRANSFER_ENCODING,
      "upgrade": HEADER_STATE.UPGRADE
    };
  })(constants$3);
  return constants$3;
}
const util$f = util$j;
const { kBodyUsed } = symbols$4;
const assert$5 = require$$0$1;
const { InvalidArgumentError: InvalidArgumentError$e } = errors$1;
const EE = require$$0$6;
const redirectableStatusCodes = [300, 301, 302, 303, 307, 308];
const kBody$1 = Symbol("body");
class BodyAsyncIterable {
  constructor(body2) {
    this[kBody$1] = body2;
    this[kBodyUsed] = false;
  }
  async *[Symbol.asyncIterator]() {
    assert$5(!this[kBodyUsed], "disturbed");
    this[kBodyUsed] = true;
    yield* this[kBody$1];
  }
}
let RedirectHandler$1 = class RedirectHandler {
  constructor(dispatch, maxRedirections, opts, handler) {
    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError$e("maxRedirections must be a positive number");
    }
    util$f.validateHandler(handler, opts.method, opts.upgrade);
    this.dispatch = dispatch;
    this.location = null;
    this.abort = null;
    this.opts = { ...opts, maxRedirections: 0 };
    this.maxRedirections = maxRedirections;
    this.handler = handler;
    this.history = [];
    if (util$f.isStream(this.opts.body)) {
      if (util$f.bodyLength(this.opts.body) === 0) {
        this.opts.body.on("data", function() {
          assert$5(false);
        });
      }
      if (typeof this.opts.body.readableDidRead !== "boolean") {
        this.opts.body[kBodyUsed] = false;
        EE.prototype.on.call(this.opts.body, "data", function() {
          this[kBodyUsed] = true;
        });
      }
    } else if (this.opts.body && typeof this.opts.body.pipeTo === "function") {
      this.opts.body = new BodyAsyncIterable(this.opts.body);
    } else if (this.opts.body && typeof this.opts.body !== "string" && !ArrayBuffer.isView(this.opts.body) && util$f.isIterable(this.opts.body)) {
      this.opts.body = new BodyAsyncIterable(this.opts.body);
    }
  }
  onConnect(abort2) {
    this.abort = abort2;
    this.handler.onConnect(abort2, { history: this.history });
  }
  onUpgrade(statusCode, headers2, socket) {
    this.handler.onUpgrade(statusCode, headers2, socket);
  }
  onError(error) {
    this.handler.onError(error);
  }
  onHeaders(statusCode, headers2, resume2, statusText) {
    this.location = this.history.length >= this.maxRedirections || util$f.isDisturbed(this.opts.body) ? null : parseLocation(statusCode, headers2);
    if (this.opts.origin) {
      this.history.push(new URL(this.opts.path, this.opts.origin));
    }
    if (!this.location) {
      return this.handler.onHeaders(statusCode, headers2, resume2, statusText);
    }
    const { origin, pathname, search } = util$f.parseURL(new URL(this.location, this.opts.origin && new URL(this.opts.path, this.opts.origin)));
    const path = search ? `${pathname}${search}` : pathname;
    this.opts.headers = cleanRequestHeaders(this.opts.headers, statusCode === 303, this.opts.origin !== origin);
    this.opts.path = path;
    this.opts.origin = origin;
    this.opts.maxRedirections = 0;
    this.opts.query = null;
    if (statusCode === 303 && this.opts.method !== "HEAD") {
      this.opts.method = "GET";
      this.opts.body = null;
    }
  }
  onData(chunk) {
    if (this.location)
      ;
    else {
      return this.handler.onData(chunk);
    }
  }
  onComplete(trailers) {
    if (this.location) {
      this.location = null;
      this.abort = null;
      this.dispatch(this.opts, this);
    } else {
      this.handler.onComplete(trailers);
    }
  }
  onBodySent(chunk) {
    if (this.handler.onBodySent) {
      this.handler.onBodySent(chunk);
    }
  }
};
function parseLocation(statusCode, headers2) {
  if (redirectableStatusCodes.indexOf(statusCode) === -1) {
    return null;
  }
  for (let i = 0; i < headers2.length; i += 2) {
    if (headers2[i].toString().toLowerCase() === "location") {
      return headers2[i + 1];
    }
  }
}
function shouldRemoveHeader(header, removeContent, unknownOrigin) {
  return header.length === 4 && header.toString().toLowerCase() === "host" || removeContent && header.toString().toLowerCase().indexOf("content-") === 0 || unknownOrigin && header.length === 13 && header.toString().toLowerCase() === "authorization" || unknownOrigin && header.length === 6 && header.toString().toLowerCase() === "cookie";
}
function cleanRequestHeaders(headers2, removeContent, unknownOrigin) {
  const ret = [];
  if (Array.isArray(headers2)) {
    for (let i = 0; i < headers2.length; i += 2) {
      if (!shouldRemoveHeader(headers2[i], removeContent, unknownOrigin)) {
        ret.push(headers2[i], headers2[i + 1]);
      }
    }
  } else if (headers2 && typeof headers2 === "object") {
    for (const key of Object.keys(headers2)) {
      if (!shouldRemoveHeader(key, removeContent, unknownOrigin)) {
        ret.push(key, headers2[key]);
      }
    }
  } else {
    assert$5(headers2 == null, "headers must be an object or an array");
  }
  return ret;
}
var RedirectHandler_1 = RedirectHandler$1;
const RedirectHandler2 = RedirectHandler_1;
function createRedirectInterceptor$2({ maxRedirections: defaultMaxRedirections }) {
  return (dispatch) => {
    return function Intercept(opts, handler) {
      const { maxRedirections = defaultMaxRedirections } = opts;
      if (!maxRedirections) {
        return dispatch(opts, handler);
      }
      const redirectHandler = new RedirectHandler2(dispatch, maxRedirections, opts, handler);
      opts = { ...opts, maxRedirections: 0 };
      return dispatch(opts, redirectHandler);
    };
  };
}
var redirectInterceptor = createRedirectInterceptor$2;
var llhttpWasm;
var hasRequiredLlhttpWasm;
function requireLlhttpWasm() {
  if (hasRequiredLlhttpWasm)
    return llhttpWasm;
  hasRequiredLlhttpWasm = 1;
  llhttpWasm = "AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAA0ZFAwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAAGBgYGAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAAMBBAUBcAESEgUDAQACBggBfwFBgNQECwfRBSIGbWVtb3J5AgALX2luaXRpYWxpemUACRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALbGxodHRwX2luaXQAChhsbGh0dHBfc2hvdWxkX2tlZXBfYWxpdmUAQQxsbGh0dHBfYWxsb2MADAZtYWxsb2MARgtsbGh0dHBfZnJlZQANBGZyZWUASA9sbGh0dHBfZ2V0X3R5cGUADhVsbGh0dHBfZ2V0X2h0dHBfbWFqb3IADxVsbGh0dHBfZ2V0X2h0dHBfbWlub3IAEBFsbGh0dHBfZ2V0X21ldGhvZAARFmxsaHR0cF9nZXRfc3RhdHVzX2NvZGUAEhJsbGh0dHBfZ2V0X3VwZ3JhZGUAEwxsbGh0dHBfcmVzZXQAFA5sbGh0dHBfZXhlY3V0ZQAVFGxsaHR0cF9zZXR0aW5nc19pbml0ABYNbGxodHRwX2ZpbmlzaAAXDGxsaHR0cF9wYXVzZQAYDWxsaHR0cF9yZXN1bWUAGRtsbGh0dHBfcmVzdW1lX2FmdGVyX3VwZ3JhZGUAGhBsbGh0dHBfZ2V0X2Vycm5vABsXbGxodHRwX2dldF9lcnJvcl9yZWFzb24AHBdsbGh0dHBfc2V0X2Vycm9yX3JlYXNvbgAdFGxsaHR0cF9nZXRfZXJyb3JfcG9zAB4RbGxodHRwX2Vycm5vX25hbWUAHxJsbGh0dHBfbWV0aG9kX25hbWUAIBJs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EGpCADcDACAAQQhqQgA3AwAgAEHdATYCHEEAC3sBAX8CQCAAKAIMIgMNAAJAIAAoAgRFDQAgACABNgIECwJAIAAgASACEMSAgIAAIgMNACAAKAIMDwsgACADNgIcQQAhAyAAKAIEIgFFDQAgACABIAIgACgCCBGBgICAAAAiAUUNACAAIAI2AhQgACABNgIMIAEhAwsgAwvc9wEDKH8DfgV/I4CAgIAAQRBrIgMkgICAgAAgASEEIAEhBSABIQYgASEHIAEhCCABIQkgASEKIAEhCyABIQwgASENIAEhDiABIQ8gASEQIAEhESABIRIgASETIAEhFCABIRUgASEWIAEhFyABIRggASEZIAEhGiABIRsgASEcIAEhHSABIR4gASEfIAEhICABISEgASEiIAEhIyABISQgASElIAEhJiABIScgASEoIAEhKQJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAKAIcIipBf2oO3QHaAQHZAQIDBAUGBwgJCgsMDQ7YAQ8Q1wEREtYBExQVFhcYGRob4AHfARwdHtUBHyAhIiMkJdQBJicoKSorLNMB0gEtLtEB0AEvMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUbbAUdISUrPAc4BS80BTMwBTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gAGBAYIBgwGEAYUBhgGHAYgBiQGKAYsBjAGNAY4BjwGQAZEBkgGTAZQBlQGWAZcBmAGZAZoBmwGcAZ0BngGfAaABoQGiAaMBpAGlAaYBpwGoAakBqgGrAawBrQGuAa8BsAGxAbIBswG0AbUBtgG3AcsBygG4AckBuQHIAboBuwG8Ab0BvgG/AcABwQHCAcMBxAHFAcYBANwBC0EAISoMxgELQQ4hKgzFAQtBDSEqDMQBC0EPISoMwwELQRAhKgzCAQtBEyEqDMEBC0EUISoMwAELQRUhKgy/AQtBFiEqDL4BC0EXISoMvQELQRghKgy8AQtBGSEqDLsBC0EaISoMugELQRshKgy5AQtBHCEqDLgBC0EIISoMtwELQR0hKgy2AQtBICEqDLUBC0EfISoMtAELQQchKgyzAQtBISEqDLIBC0EiISoMsQELQR4hKgywAQtBIyEqDK8BC0ESISoMrgELQREhKgytAQtBJCEqDKwBC0ElISoMqwELQSYhKgyqAQtBJyEqDKkBC0HDASEqDKgBC0EpISoMpwELQSshKgymAQtBLCEqDKUBC0EtISoMpAELQS4hKgyjAQtBLyEqDKIBC0HEASEqDKEBC0EwISoMoAELQTQhKgyfAQtBDCEqDJ4BC0ExISoMnQELQTIhKgycAQtBMyEqDJsBC0E5ISoMmgELQTUhKgyZAQtBxQEhKgyYAQtBCyEqDJcBC0E6ISoMlgELQTYhKgyVAQtBCiEqDJQBC0E3ISoMkwELQTghKgySAQtBPCEqDJEBC0E7ISoMkAELQT0hKgyPAQtBCSEqDI4BC0EoISoMjQELQT4hKgyMAQtBPyEqDIsBC0HAACEqDIoBC0HBACEqDIkBC0HCACEqDIgBC0HDACEqDIcBC0HEACEqDIYBC0HFACEqDIUBC0HGACEqDIQBC0EqISoMgwELQccAISoMggELQcgAISoMgQELQckAISoMgAELQcoAISoMfwtBywAhKgx+C0HNACEqDH0LQcwAISoMfAtBzgAhKgx7C0HPACEqDHoLQdAAISoMeQtB0QAhKgx4C0HSACEqDHcLQdMAISoMdgtB1AAhKgx1C0HWACEqDHQLQdUAISoMcwtBBiEqDHILQdcAISoMcQtBBSEqDHALQdgAISoMbwtBBCEqDG4LQdkAISoMbQtB2gAhKgxsC0HbACEqDGsLQdwAISoMagtBAyEqDGkLQd0AISoMaAtB3gAhKgxnC0HfACEqDGYLQeEAISoMZQtB4AAhKgxkC0HiACEqDGMLQeMAISoMYgtBAiEqDGELQeQAISoMYAtB5QAhKgxfC0HmACEqDF4LQecAISoMXQtB6AAhKgxcC0HpACEqDFsLQeoAISoMWgtB6wAhKgxZC0HsACEqDFgLQe0AISoMVwtB7gAhKgxWC0HvACEqDFULQfAAISoMVAtB8QAhKgxTC0HyACEqDFILQfMAISoMUQtB9AAhKgxQC0H1ACEqDE8LQfYAISoMTgtB9wAhKgxNC0H4ACEqDEwLQfkAISoMSwtB+gAhKgxKC0H7ACEqDEkLQfwAISoMSAtB/QAhKgxHC0H+ACEqDEYLQf8AISoMRQtBgAEhKgxEC0GBASEqDEMLQYIBISoMQgtBgwEhKgxBC0GEASEqDEALQYUBISoMPwtBhgEhKgw+C0GHASEqDD0LQYgBISoMPAtBiQEhKgw7C0GKASEqDDoLQYsBISoMOQtBjAEhKgw4C0GNASEqDDcLQY4BISoMNgtBjwEhKgw1C0GQASEqDDQLQZEBISoMMwtBkgEhKgwyC0GTASEqDDELQZQBISoMMAtBlQEhKgwvC0GWASEqDC4LQZcBISoMLQtBmAEhKgwsC0GZASEqDCsLQZoBISoMKgtBmwEhKgwpC0GcASEqDCgLQZ0BISoMJwtBngEhKgwmC0GfASEqDCULQaABISoMJAtBoQEhKgwjC0GiASEqDCILQaMBISoMIQtBpAEhKgwgC0GlASEqDB8LQaYBISoMHgtBpwEhKgwdC0GoASEqDBwLQakBISoMGwtBqgEhKgwaC0GrASEqDBkLQawBISoMGAtBrQEhKgwXC0GuASEqDBYLQQEhKgwVC0GvASEqDBQLQbABISoMEwtBsQEhKgwSC0GzASEqDBELQbIBISoMEAtBtAEhKgwPC0G1ASEqDA4LQbYBISoMDQtBtwEhKgwMC0G4ASEqDAsLQbkBISoMCgtBugEhKgwJC0G7ASEqDAgLQcYBISoMBwtBvAEhKgwGC0G9ASEqDAULQb4BISoMBAtBvwEhKgwDC0HAASEqDAILQcIBISoMAQtBwQEhKgsDQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJA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UGoON+cB5gEBAgMEBQYHCAAAAAAAAAAJCgsMDQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8QERITFAALQR4hKgzEAwtCAiErDOUBC0IDISsM5AELQgQhKwzjAQtCBSErDOIBC0IGISsM4QELQgchKwzgAQtCCCErDN8BC0IJISsM3gELQgohKwzdAQtCCyErDNwBC0IMISsM2wELQg0hKwzaAQtCDiErDNkBC0IPISsM2AELQgohKwzXAQtCCyErDNYBC0IMISsM1QELQg0hKwzUAQtCDiErDNMBC0IPISsM0gELQgAhKwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgKi0AAEFQag435QHkAQABAgMEBQYH5gHmAeYB5gHmAeYB5gEICQoLDA3mAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYBDg8QERIT5gELQgIhKwzkAQtCAyErDOMBC0IEISsM4gELQgUhKwzhAQtCBiErDOABC0IHISsM3wELQgghKwzeAQtCCSErDN0BC0IKISsM3AELQgshKwzbAQtCDCErDNoBC0INISsM2QELQg4hKwzYAQtCDyErDNcBC0IKISsM1gELQgshKwzVAQtCDCErDNQBC0INISsM0wELQg4hKwzSAQtCDyErDNEBCyAAQgAgACkDICIrIAIgASIqa60iLH0iLSAtICtWGzcDICArICxWIi5FDdIBQR8hKgzHAwsCQCABIgEgAkYNACAAQYmAgIAANgIIIAAgATYCBCABIQFBJCEqDK4DC0EgISoMxgMLIAAgASIqIAIQvoCAgABBf2oOBbYBAMsCAdEB0gELQREhKgyrAwsgAEEBOgAvICohAQzCAwsgASIBIAJHDdIBQSQhKgzCAwsgASInIAJHDR5BxgAhKgzBAwsgACABIgEgAhCygICAACIqDdQBIAEhAQy1AQsgASIqIAJHDSZB0AAhKgy/AwsCQCABIgEgAkcNAEEoISoMvwMLIABBADYCBCAAQYyAgIAANgIIIAAgASABELGAgIAAIioN0wEgASEBDNgBCwJAIAEiKiACRw0AQSkhKgy+AwsgKi0AACIBQSBGDRQgAUEJRw3TASAqQQFqIQEMFQsCQCABIgEgAkYNACABQQFq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AUEBaiEBIARBAWoiBCACRw0ACyAAICo2AgBBgwEhKgzoAgtBACEqIABBADYCACAuIDJrQQNqIQEMygELAkAgASIqIAJHDQBBhAEhKgznAgsgAiAqayAAKAIAIi5qITIgKiEEIC4hAQJAA0AgBC0AACABQYPPgIAAai0AAEcNzAEgAUEERg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAyNgIAQYQBISoM5wILIABBADYCACAqIC5rQQVqIQFBIyEqDMkBCwJAIAEiBCACRw0AQYUBISoM5gILAkACQCAELQAAQbR/ag4IAMwBzAHMAcwBzAHMAQHMAQsgBEEBaiEBQe8AISoMzQILIARBAWohAUHwACEqDMwCCwJAIAEiBCACRw0AQYYBISoM5QILIAQtAABBxQBHDckBIARBAWohAQyKAgsCQCABIiogAkcNAEGHASEqDOQCCyACICprIAAoAgAiLmohMiAqIQQgLiEBAkADQCAELQAAIAFBiM+AgABqLQAARw3JASABQQNGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIDI2AgBBhwEhKgzkAgsgAEEANgIAICogLmtBBGohAUEtISoMxgELAkAgASIqIAJHDQBBiAEhKgzjAgsgAiAqayAAKAIAIi5qITIgKiEEIC4hAQJAA0AgBC0AACABQdDPgIAAai0AAEcNyAEgAUEIRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAyNgIAQYgBISoM4wILIABBADYCACAqIC5rQQlqIQFBKSEqDMUBCwJAIAEiASACRw0AQYkBISoM4gILQQEhKiABLQAAQd8ARw3EASABQQFqIQEMiAILAkAgASIqIAJHDQBBigEhKgzhAgsgAiAqayAAKAIAIi5qITIgKiEEIC4hAQNAIAQtAAAgAUGMz4CAAGotAABHDcUBIAFBAUYNtwIgAUEBaiEBIARBAWoiBCACRw0ACyAAIDI2AgBBigEhKgzgAgsCQCABIiogAkcNAEGLASEqDOACCyACICprIAAoAgAiLmohMiAqIQQgLiEBAkADQCAELQAAIAFBjs+AgABqLQAARw3FASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIDI2AgBBiwEhKgzgAgsgAEEANgIAICogLmtBA2ohAUECISoMwgELAkAgASIqIAJHDQBB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AABBt39qDgcBrgGuAa4BrgGuAQCuAQsgBEEBaiEEQY4BISoMrwILIARBAWohAUEiISoMqgELAkAgDiACRw0AQaQBISoMxwILIAIgDmsgACgCACIqaiEuIA4hBCAqIQECQANAIAQtAAAgAUHAz4CAAGotAABHDawBIAFBAUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgLjYCAEGkASEqDMcCCyAAQQA2AgAgDiAqa0ECaiEBQR0hKgypAQsCQCAEIAJHDQBBpQEhKgzGAgsCQAJAIAQtAABBrn9qDgMArAEBrAELIARBAWohDkGQASEqDK0CCyAEQQFqIQFBBCEqDKgBCwJAIAQgAkcNAEGmASEqDMUCCwJAAkACQAJAAkAgBC0AAEG/f2oOFQCuAa4BrgGuAa4BrgGuAa4BrgGuAQGuAa4BAq4BrgEDrgGuAQSuAQsgBEEBaiEEQYgBISoMrwILIARBAWohCkGJASEqDK4CCyAEQQFqIQtBigEhKgytAgsgBEEBaiEEQY8BISoMrAILIARBAWohBEGRASEqDKsCCwJAIA8gAkcNAEGnASEqDMQCCyACIA9rIAAoAgAiKmohLiAPIQQgKiEBAkADQCAELQAAIAFB7c+AgABqLQAARw2pASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIC42AgBBpwEhKgzEAgsgAEEANgIAIA8gKmtBA2ohAUERISoMpgELAkAgECACRw0AQagBISoMwwILIAIgEGsgACgCACIqaiEuIBAhBCAqIQECQANAIAQtAAAgAUHCz4CAAGotAABHDagBIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgLjYCAEGoASEqDMMCCyAAQQA2AgAgECAqa0EDaiEBQSwhKgylAQsCQCARIAJHDQBBqQEhKgzCAgsgAiARayAAKAIAIipqIS4gESEEICohAQJAA0AgBC0AACABQcXPgIAAai0AAEcNpwEgAUEERg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAuNgIAQakBISoMwgILIABBADYCACARICprQQVqIQFBKyEqDKQBCwJAIBIgAkcNAEGqASEqDMECCyACIBJrIAAoAgAiKmohLiASIQQgKiEBAkADQCAELQAAIAFBys+AgABqLQAARw2mASABQQJGDQEgAUEBaiEB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8s+AgABqLQAARw2WASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIC42AgBBugEhKgyxAgsgAEEANgIAIBsgKmtBAmohAUEPISoMkwELAkAgBCACRw0AQbsBISoMsAILAkACQCAELQAAQbd/ag4HAJYBlgGWAZYBlgEBlgELIARBAWohGkGlASEqDJcCCyAEQQFqIRtBpgEhKgyWAgsCQCAcIAJHDQBBvAEhKgyvAgsgAiAcayAAKAIAIipqIS4gHCEEICohAQJAA0AgBC0AACABQfTPgIAAai0AAEcNlAEgAUEHRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAuNgIAQbwBISoMrwILIABBADYCACAcICprQQhqIQFBGyEqDJEBCwJAIAQgAkcNAEG9ASEqDK4CCwJAAkACQCAELQAAQb5/ag4SAJUBlQGVAZUBlQGVAZUBlQGVAQGVAZUBlQGVAZUBlQEClQELIARBAWohGUGkASEqDJYCCyAEQQFqIQRBpwEhKgyVAgsgBEEBaiEcQagBISoMlAILAkAgBCACRw0AQb4BISoMrQILIAQtAABBzgBHDZEBIARBAWohBAzWAQsCQCAEIAJHDQBBvwEhKgysAgsCQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAELQAAQb9/ag4VAAECA6ABBAUGoAGgAaABBwgJCgugAQwNDg+gAQsgBEEBaiEBQegAISoMoQILIARBAWohAUHpACEqDKACCyAEQQFqIQFB7gAhKgyfAgsgBEEBaiEBQfIAISoMngILIARBAWohAUHzACEqDJ0CCyAEQQFqIQFB9gAhKgycAgsgBEEBaiEBQfcAISoMmwILIARBAWohAUH6ACEqDJoCCyAEQQFqIQRBgwEhKgyZAgsgBEEBaiEGQYQBISoMmAILIARBAWohB0GFASEqDJcCCyAEQQFqIQRBkgEhKgyWAgsgBEEBaiEEQZgBISoMlQILIARBAWohBEGgASEqDJQCCyAEQQFqIQRBowEhKgyTAgsgBEEBaiEEQaoBISoMkgILAkAgBCACRg0AIABBkICAgAA2AgggACAENgIEQasBISoMkgILQcABISoMqgILIAAgHSACEKqAgIAAIgENjwEgHSEBDF4LAkAgHiACRg0AIB5BAWohHQyRAQtBwgEhKgyoAgsD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NgIUIABB2o2AgAA2AhAgAEEUNgIMQQAhKgyNAgsgACgCBCEyIABBADYCBCAqICunaiIvIQEgACAyICogLyAuGyIqELWAgIAAIi5FDZMBIABBBzYCHCAAICo2AhQgACAuNgIMQQAhKgyMAgsgACAALwEwQYABcjsBMCABIQELQSohKgzxAQsgKkEVRg3ZASAAQQA2AhwgACABNgIUIABBg4yAgAA2AhAgAEETNgIMQQAhKgyJAgsgKkEVRg3XASAAQQA2AhwgACABNgIUIABBmo+AgAA2AhAgAEEiNgIMQQAhKgyIAgsgACgCBCEqIABBADYCBAJAIAAgKiABELeAgIAAIioNACABQQFqIQEMkwELIABBDDYCHCAAICo2AgwgACABQQFqNgIUQQAhKgyHAgsgKkEVRg3UASAAQQA2AhwgACABNgIUIABBmo+AgAA2AhAgAEEiNgIMQQAhKgyGAgsgACgCBCEqIABBADYCBAJAIAAgKiABELeAgIAAIioNACABQQFqIQEMkgELIABBDTYCHCAAICo2AgwgACABQQFqNgIUQQAhKgyFAgsgKkEVRg3RASAAQQA2AhwgACABNgIUIABBxoyAgAA2AhAgAEEjNgIMQQAhKgyEAgsgACgCBCEqIABBADYCBAJAIAAgKiABELmAgIAAIioNACABQQFqIQEMkQELIABBDjYCHCAAICo2AgwgACABQQFqNgIUQQAhKgyDAgsgAEEANgIcIAAgATYCFCAAQcCVgIAANgIQIABBAjYCDEEAISoMggILICpBFUYNzQEgAEEANgIcIAAgATYCFCAAQcaMgIAANgIQIABBIzYCDEEAISoMgQILIABBEDYCHCAAIAE2AhQgACAqNgIMQQAhKgyAAgsgACgCBCEEIABBADYCBAJAIAAgBCABELmAgIAAIgQNACABQQFqIQEM+AELIABBETYCHCAAIAQ2AgwgACABQQFqNgIUQQAhKgz/AQsgKkEVRg3JASAAQQA2AhwgACABNgIUIABBxoyAgAA2AhAgAEEjNgIMQQAhKgz+AQsgACgCBCEqIABBADYCBAJAIAAgKiABELmAgIAAIioNACABQQFqIQEMjgELIABBEzYCHCAAICo2AgwgACABQQFqNgIUQQAhKgz9AQsgACgCBCEEIABBADYCBAJAIAAgBCABELmAgIAAIgQNACAB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AkAgAC0AKUEjTw0AIAEhAQxcCyAAQQA2AhwgACABNgIUIABB04mAgAA2AhAgAEEINgIMQQAhKgy8AQsgAEEANgIAC0EAISogAEEANgIcIAAgATYCFCAAQZCzgIAANgIQIABBCDYCDAy6AQsgAEEANgIAIDIgL2tBA2ohAQJAIAAtAClBIUcNACABIQEMWQsgAEEANgIcIAAgATYCFCAAQZuKgIAANgIQIABBCDYCDEEAISoMuQELIABBADYCACAyIC9rQQRqIQECQCAALQApIipBXWpBC08NACABIQEMWAsCQCAqQQZLDQBBASAqdEHKAHFFDQAgASEBDFgLQQAhKiAAQQA2AhwgACABNgIUIABB94mAgAA2AhAgAEEINgIMDLgBCyAqQRVGDXUgAEEANgIcIAAgATYCFCAAQbmNgIAANgIQIABBGjYCDEEAISoMtwELIAAoAgQhKiAAQQA2AgQCQCAAICogARCngICAACIqDQAgASEBDFcLIABB5QA2AhwgACABNgIUIAAgKjYCDEEAISoMtgELIAAoAgQhKiAAQQA2AgQCQCAAICogARCngICAACIqDQAgASEBDE8LIABB0gA2AhwgACABNgIUIAAgKjYCDEEAISoMtQELIAAoAgQhKiAAQQA2AgQCQCAAICogARCngICAACIqDQAgASEBDE8LIABB0wA2AhwgACABNgIUIAAgKjYCDEEAISoMtAELIAAoAgQhKiAAQQA2AgQCQCAAICogARCngICAACIqDQAgASEBDFQLIABB5QA2AhwgACABNgIUIAAgKjYCDEEAISoMswELIABBADYCHCAAIAE2AhQgAEHGioCAADYCECAAQQc2AgxBACEqDLIBCyAAKAIEISogAEEANgIEAkAgACAqIAEQp4CAgAAiKg0AIAEhAQxLCyAAQdIANgIcIAAgATYCFCAAICo2AgxBACEqDLEBCyAAKAIEISogAEEANgIEAkAgACAqIAEQp4CAgAAiKg0AIAEhAQxLCyAAQdMANgIcIAAgATYCFCAAICo2AgxBACEqDLABCyAAKAIEISogAEEANgIEAkAgACAqIAEQp4CAgAAiKg0AIAEhAQxQCyAAQeUANgIcIAAgATYCFCAAICo2AgxBACEqDK8BCyAAQQA2AhwgACABNgIUIABB3IiAgAA2AhAgAEEHNgIMQQAhKgyuAQsgKkE/Rw0BIAFBAWohAQtBBSEqDJMBC0EAISogAEEANgIcIAAgATYCFCAAQf2SgIAANgIQIABBBzYCDAyrAQsgACgCBCEqIABBADYCBAJAIAAgKiABEKeAgIAAIioNACABIQEMRAsgAEHSADYCHCAAIAE2AhQgACAqNgIMQQAhKgyqAQsgACgCBCEqIABBADYCBAJAIAAgKiABEKeAgIAAIioNACABIQEMRAsgAEHTADYCHCAAIAE2AhQgACAqNgIMQQAhKgypAQsgACgCBCEqIABBADYCBAJAIAAgKiABEKeAgIAAIioNACABIQEMSQsgAEHlADYCHCAAIAE2AhQgACAqNgIMQQAhKgyoAQsgACgCBCEBIABBADYCBAJAIAAgASAuEKeAgIAAIgENACAuIQEMQQsgAEHSADYCHCAAIC42AhQgACABNgIMQQAhKgynAQsgACgCBCEBIABBADYCBAJAIAAgASAuEKeAgIAAIgENACAuIQEMQQsgAEHTADYCHCAAIC42AhQgACABNgIMQQAhKgymAQsgACgCBCEBIABBADYCBAJAIAAgASAuEKeAgIAAIgENACAuIQEMRgsgAEHlADYCHCAAIC42AhQgACABNgIMQQAhKgylAQsgAEEANgIcIAAgLjYCFCAAQcOPgIAANgIQIABBBzYCDEEAISoMpAELIABBADYCHCAAIAE2AhQgAEHDj4CAADYCECAAQQc2AgxBACEqDKMBC0EAISogAEEANgIcIAAgLjYCFCAAQYycgIAANgIQIABBBzYCDAyiAQsgAEEANgIcIAAgLjYCFCAAQYycgIAANgIQIABBBzYCDEEAISoMoQELIABBADYCHCAAIC42AhQgAEH+kYCAADYCECAAQQc2AgxBACEqDKABCyAAQQA2AhwgACABNgIUIABBjpuAgAA2AhAgAEEGNgIMQQAhKgyfAQsgKkEVRg1bIABBADYCHCAAIAE2AhQgAEHMjoCAADYCECAAQSA2AgxBACEqDJ4BCyAAQQA2AgAgKiAua0EGaiEBQSQhKgsgACAqOgApIAAoAgQhKiAAQQA2AgQgACAqIAEQq4CAgAAiKg1YIAEhAQxBCyAAQQA2AgALQQAhKiAAQQA2AhwgACAENgIUIABB8ZuAgAA2AhAgAEEGNgIMDJoBCyABQRVGDVQgAEEANgIcIAAgHTYC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AgAgKiAua0ECaiEBQfUAISoMEAsgASEBAkAgAC0AKUEFRw0AQeMAISoMEAtB4gAhKgwPC0EAISogAEEANgIcIABB5JGAgAA2AhAgAEEHNgIMIAAgLkEBajYCFAwnCyAAQQA2AgAgMiAva0ECaiEBQcAAISoMDQsgASEBC0E4ISoMCwsCQCABIikgAkYNAANAAkAgKS0AAEGAvoCAAGotAAAiAUEBRg0AIAFBAkcNAyApQQFqIQEMBAsgKUEBaiIpIAJHDQALQT4hKgwkC0E+ISoMIwsgAEEAOgAsICkhAQwBC0ELISoMCAtBOiEqDAcLIAFBAWohAUEtISoMBgtBKCEqDAULIABBADYCACAvIDBrQQRqIQFBBiEqCyAAICo6ACwgASEBQQwhKgwDCyAAQQA2AgAgMiAva0EHaiEBQQohKgwCCyAAQQA2AgALIABBADoALCAnIQFBCSEqDAALC0EAISogAEEANgIcIAAgIzYCFCAAQc2QgIAANgIQIABBCTYCDAwXC0EAISogAEEANgIcIAAgIjYCFCAAQemKgIAANgIQIABBCTYCDAwWC0EAISogAEEANgIcIAAgITYCFCAAQbeQgIAANgIQIABBCTYCDAwVC0EAISogAEEANgIcIAAgIDYCFCAAQZyRgIAANgIQIABBCTYCDAwUC0EAISogAEEANgIcIAAgATYCFCAAQc2QgIAANgIQIABBCTYCDAwTC0EAISogAEEANgIcIAAgATYCFCAAQemKgIAANgIQIABBCTYCDAwSC0EAISogAEEANgIcIAAgATYCFCAAQbeQgIAANgIQIABBCTYCDAwRC0EAISogAEEANgIcIAAgATYCFCAAQZyRgIAANgIQIABBCTYCDAwQC0EAISogAEEANgIcIAAgATYCFCAAQZeVgIAANgIQIABBDzYCDAwPC0EAISogAEEANgIcIAAgATYCFCAAQZeVgIAANgIQIABBDzYCDAwOC0EAISogAEEANgIcIAAgATYCFCAAQcCSgIAANgIQIABBCzYCDAwNC0EAISogAEEANgIcIAAgATYCFCAAQZWJgIAANgIQIABBCzYCDAwMC0EAISogAEEANgIcIAAgATYCFCAAQeGPgIAANgIQIABBCjYCDAwLC0EAISogAEEANgIcIAAgATYCFCAAQfuPgIAANgIQIABBCjYCDAwKC0EAISogAEEANgIcIAAgATYCFCAAQfGZgIAANgIQIABBAjYCDAwJC0EAISogAEEANgIcIAAgATYCFCAAQcSUgIAANgIQIABBAjYCDAwIC0EAISogAEEANgIcIAAgATYCFCAAQfKVgIAANgIQIABBAjYCDAwHCyAAQQI2AhwgACABNgIUIABBnJqAgAA2AhAgAEEWNgIMQQAhKgwGC0EBISoMBQtB1AAhKiABIgEgAkYNBCADQQhqIAAgASACQdjCgIAAQQoQxYCAgAAgAygCDCEBIAMoAggOAwEEAgALEMuAgIAAAAsgAEEANgIcIABBtZqAgAA2AhAgAEEXNgIMIAAgAUEBajYCFEEAISoMAgsgAEEANgIcIAAgATYCFCAAQcqagIAANgIQIABBCTYCDEEAISoMAQsCQCABIgEgAkcNAEEiISoMAQsgAEGJgICAADYCCCAAIAE2AgRBISEqCyADQRBqJICAgIAAICoLrwEBAn8gASgCACEGAkACQCACIANGDQAgBCAGaiEEIAYgA2ogAmshByACIAZBf3MgBWoiBmohBQNAAkAgAi0AACAELQAARg0AQQIhBAwDCwJAIAYNAEEAIQQgBSECDAMLIAZBf2ohBiAEQQFqIQQgAkEBaiICIANHDQALIAchBiADIQILIABBATYCACABIAY2AgAgACACNgIEDwsgAUEANgIAIAAgBDYCACAAIAI2AgQLCgAgABDHgICAAAuVNwELfyOAgICAAEEQayIBJICAgIAAAkBBACgCoNCAgAANAEEAEMqAgIAAQYDUhIAAayICQdkASQ0AQQAhAwJAQQAoAuDTgIAAIgQNAEEAQn83AuzTgIAAQQBCgICEgICAwAA3AuTTgIAAQQAgAUEIakFwcUHYqtWqBXMiBDYC4NOAgABBAEEANgL004CAAEEAQQA2AsTTgIAAC0EAIAI2AszTgIAAQQBBgNSEgAA2AsjTgIAAQQBBgNSEgAA2ApjQgIAAQQAgBDYCrNCAgABBAEF/NgKo0ICAAANAIANBxNCAgABqIANBuNCAgABqIgQ2AgAgBCADQbDQgIAAaiIFNgIAIANBvNCAgABqIAU2AgAgA0HM0ICAAGogA0HA0ICAAGoiBTYCACAFIAQ2AgAgA0HU0ICAAGogA0HI0ICAAGoiBDYCACAEIAU2AgAgA0HQ0ICAAGogBDYCACADQSBqIgNBgAJHDQALQYDUhIAAQXhBgNSEgABrQQ9xQQBBgNSEgABBCGpBD3EbIgNqIgRBBGogAiADa0FIaiIDQQFyNgIAQQBBACgC8NOAgAA2AqTQgIAAQQAgBDYCoNCAgABBACADNgKU0ICAACACQYDUhIAAakFMakE4NgIACwJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQewBSw0AAkBBACgCiNCAgAAiBkEQIABBE2pBcHEgAEELSRsiAkEDdiIEdiIDQQNxRQ0AIANBAXEgBHJBAXMiBUEDdCIAQbjQgIAAaigCACIEQQhqIQMCQAJAIAQoAggiAiAAQbDQgIAAaiIARw0AQQAgBkF+IAV3cTYCiNCAgAAMAQsgACACNgIIIAIgADYCDAsgBCAFQQN0IgVBA3I2AgQgBCAFakEEaiIEIAQoAgBBAXI2AgAMDAsgAkEAKAKQ0ICAACIHTQ0BAkAgA0UNAAJAAkAgAyAEdEECIAR0IgNBACADa3JxIgNBACADa3FBf2oiAyADQQx2QRBxIgN2IgRBBXZBCHEiBSADciAEIAV2IgNBAnZBBHEiBHIgAyAEdiIDQQF2QQJxIgRyIAMgBHYiA0EBdkEBcSIEciADIAR2aiIFQQN0IgBBuNCAgABqKAIAIgQoAggiAyAAQbDQgIAAaiIARw0AQQAgBkF+IAV3cSIGNgKI0ICAAAwBCyAAIAM2AgggAyAANgIMCyAEQQhqIQMgBCACQQNyNgIEIAQgBUEDdCIFaiAFIAJrIgU2AgAgBCACaiIAIAVBAXI2AgQCQCAHRQ0AIAdBA3YiCEEDdEGw0ICAAGohAkEAKAKc0ICAACEEAkACQCAGQQEgCHQiCHENAEEAIAYgCHI2AojQgIAAIAIhCAwBCyACKAIIIQgLIAggBDYCDCACIAQ2AgggBCACNgIMIAQgCDYCCAtBACAANgKc0ICAAEEAIAU2ApDQgIAADAwLQQAoAozQgIAAIglFDQEgCUEAIAlrcUF/aiIDIANBDHZBEHEiA3YiBEEFdkEIcSIFIANyIAQgBXYiA0ECdkEEcSIEciADIAR2IgNBAXZBAnEiBHIgAyAEdiIDQQF2QQFxIgRyIAMgBHZqQQJ0QbjSgIAAaigCACIAKAIEQXhxIAJrIQQgACEFAkADQAJAIAUoAhAiAw0AIAVBFGooAgAiA0UNAgsgAygCBEF4cSACayIFIAQgBSAESSIFGyEEIAMgACAFGyEAIAMhBQwACwsgACgCGCEKAkAgACgCDCIIIABGDQBBACgCmNCAgAAgACgCCCIDSxogCCADNgIIIAMgCDYCDAwLCwJAIABBFGoiBSgCACIDDQAgACgCECIDRQ0DIABBEGohBQsDQCAFIQsgAyIIQRRqIgUoAgAiAw0AIAhBEGohBSAIKAIQIgMNAAsgC0EANgIADAoLQX8hAiAAQb9/Sw0AIABBE2oiA0FwcSECQQAoAozQgIAAIgdFDQBBACELAkAgAkGAAkkNAEEfIQsgAkH///8HSw0AIANBCHYiAyADQYD+P2pBEHZBCHEiA3QiBCAEQYDgH2pBEHZBBHEiBHQiBSAFQYCAD2pBEHZBAnEiBXRBD3YgAyAEciAFcmsiA0EBdCACIANBFWp2QQFxckEcaiELC0EAIAJrIQQCQAJAAkACQCALQQJ0QbjSgIAAaigCACIFDQBBACEDQQAhCAwBC0EAIQMgAkEAQRkgC0EBdmsgC0EfRht0IQBBACEIA0ACQCAFKAIEQXhxIAJrIgYgBE8NACAGIQQgBSEIIAYNAEEAIQQgBSEIIAUhAwwDCyADIAVBFGooAgAiBiAGIAUgAEEddkEEcWpBEGooAgAiBUYbIAMgBhshAyAAQQF0IQAgBQ0ACwsCQCADIAhyDQBBACEIQQIgC3QiA0EAIANrciAHcSIDRQ0DIANBACADa3FBf2oiAyADQQx2QRBxIgN2IgVBBXZBCHEiACADciAFIAB2IgNBAnZBBHEiBXIgAyAFdiIDQQF2QQJxIgVyIAMgBXYiA0EBdkEBcSIFciADIAV2akECdEG40oCAAGooAgAhAwsgA0UNAQsDQCADKAIEQXhxIAJrIgYgBEkhAAJAIAMoAhAiBQ0AIANBFGooAgAhBQsgBiAEIAAbIQQgAyAIIAAbIQggBSEDIAUNAAsLIAhFDQAgBEEAKAKQ0ICAACACa08NACAIKAIYIQsCQCAIKAIMIgAgCEYNAEEAKAKY0ICAACAIKAIIIgNLGiAAIAM2AgggAyAANgIMDAkLAkAgCEEUaiIFKAIAIgMNACAIKAIQIgNFDQMgCEEQaiEFCwNAIAUhBiADIgBBFGoiBSgCACIDDQAgAEEQaiEFIAAoAhAiAw0ACyAGQQA2AgAMCAsCQEEAKAKQ0ICAACIDIAJJDQBBACgCnNCAgAAhBAJAAkAgAyACayIFQRBJDQAgBCACaiIAIAVBAXI2AgRBACAFNgKQ0ICAAEEAIAA2ApzQgIAAIAQgA2ogBTYCACAEIAJBA3I2AgQMAQsgBCADQQNyNgIEIAMgBGpBBGoiAyADKAIAQQFyNgIAQQBBADYCnNCAgABBAEEANgKQ0ICAAAsgBEEIaiEDDAoLAkBBACgClNCAgAAiACACTQ0AQQAoAqDQgIAAIgMgAmoiBCAAIAJrIgVBAXI2AgRBACAFNgKU0ICAAEEAIAQ2AqDQgIAAIAMgAkEDcjYCBCADQQhqIQMMCgsCQAJAQQAoAuDTgIAARQ0AQQAoAujTgIAAIQQMAQtBAEJ/NwLs04CAAEEAQoCAhICAgMAANwLk04CAAEEAIAFBDGpBcHFB2KrVqgVzNgLg04CAAEEAQQA2AvTTgIAAQQBBADYCxNOAgABBgIAEIQQLQQAhAwJAIAQgAkHHAGoiB2oiBkEAIARrIgtxIgggAksNAEEAQTA2AvjTgIAADAoLAkBBACgCwNOAgAAiA0UNAAJAQQAoArjTgIAAIgQgCGoiBSAETQ0AIAUgA00NAQtBACEDQQBBMDYC+NOAgAAMCgtBAC0AxNOAgABBBHENBAJAAkACQEEAKAKg0ICAACIERQ0AQcjTgIAAIQMDQAJAIAMoAgAiBSAESw0AIAUgAygCBGogBEsNAwsgAygCCCIDDQALC0EAEMqAgIAAIgBBf0YNBSAIIQYCQEEAKALk04CAACIDQX9qIgQgAHFFDQAgCCAAayAEIABqQQAgA2txaiEGCyAGIAJNDQUgBkH+////B0sNBQJAQQAoAsDTgIAAIgNFDQBBACgCuNOAgAAiBCAGaiIFIARNDQYgBSADSw0GCyAGEMqAgIAAIgMgAEcNAQwHCyAGIABrIAtxIgZB/v///wdLDQQgBhDKgICAACIAIAMoAgAgAygCBGpGDQMgACEDCwJAIANBf0YNACACQcgAaiAGTQ0AAkAgByAGa0EAKALo04CAACIEakEAIARrcSIEQf7///8HTQ0AIAMhAAwHCwJAIAQQyoCAgABBf0YNACAEIAZqIQYgAyEADAcLQQAgBmsQyoCAgAAaDAQLIAMhACADQX9HDQUMAwtBACEIDAcLQQAhAAwFCyAAQX9HDQILQQBBACgCxNOAgABBBHI2AsTTgIAACyAIQf7///8HSw0BIAgQyoCAgAAhAEEAEMqAgIAAIQMgAEF/Rg0BIANBf0YNASAAIANPDQEgAyAAayIGIAJBOGpNDQELQQBBACgCuNOAgAAgBmoiAzYCuNOAgAACQCADQQAoArzTgIAATQ0AQQAgAzYCvNOAgAALAkACQAJAAkBBACgCoNCAgAAiBEUNAEHI04CAACEDA0AgACADKAIAIgUgAygCBCIIakYNAiADKAIIIgMNAAwDCwsCQAJAQQAoApjQgIAAIgNFDQAgACADTw0BC0EAIAA2ApjQgIAAC0EAIQNBACAGNgLM04CAAEEAIAA2AsjTgIAAQQBBfzYCqNCAgABBAEEAKALg04CAADYCrNCAgABBAEEANgLU04CAAANAIANBxNCAgABqIANBuNCAgABqIgQ2AgAgBCADQbDQgIAAaiIFNgIAIANBvNCAgABqIAU2AgAgA0HM0ICAAGogA0HA0ICAAGoiBTYCACAFIAQ2AgAgA0HU0ICAAGogA0HI0ICAAGoiBDYCACAEIAU2AgAgA0HQ0ICAAGogBDYCACADQSBqIgNBgAJHDQALIABBeCAAa0EPcUEAIABBCGpBD3EbIgNqIgQgBiADa0FIaiIDQQFyNgIEQQBBACgC8NOAgAA2AqTQgIAAQQAgBDYCoNCAgABBACADNgKU0ICAACAGIABqQUxqQTg2AgAMAgsgAy0ADEEIcQ0AIAUgBEsNACAAIARNDQAgBEF4IARrQQ9xQQAgBEEIakEPcRsiBWoiAEEAKAKU0ICAACAGaiILIAVrIgVBAXI2AgQgAyAIIAZqNgIEQQBBACgC8NOAgAA2AqTQgIAAQQAgBTYClNCAgABBACAANgKg0ICAACALIARqQQRqQTg2AgAMAQsCQCAAQQAoApjQgIAAIgtPDQBBACAANgKY0ICAACAAIQsLIAAgBmohCEHI04CAACEDAkACQAJAAkACQAJAAkADQCADKAIAIAhGDQEgAygCCCIDDQAMAgsLIAMtAAxBCHFFDQELQcjTgIAAIQMDQAJAIAMoAgAiBSAESw0AIAUgAygCBGoiBSAESw0DCyADKAIIIQMMAAsLIAMgADYCACADIAMoAgQgBmo2AgQgAEF4IABrQQ9xQQAgAEEIakEPcRtqIgYgAkEDcjYCBCAIQXggCGtBD3FBACAIQQhqQQ9xG2oiCCAGIAJqIgJrIQUCQCAEIAhHDQBBACACNgKg0ICAAEEAQQAoApTQgIAAIAVqIgM2ApTQgIAAIAIgA0EBcjYCBAwDCwJAQQAoApzQgIAAIAhHDQBBACACNgKc0ICAAEEAQQAoApDQgIAAIAVqIgM2ApDQgIAAIAIgA0EBcjYCBCACIANqIAM2AgAMAwsCQCAIKAIEIgNBA3FBAUcNACADQXhxIQcCQAJAIANB/wFLDQAgCCgCCCIEIANBA3YiC0EDdEGw0ICAAGoiAEYaAkAgCCgCDCIDIARHDQBBAEEAKAKI0ICAAEF+IAt3cTYCiNCAgAAMAgsgAyAARhogAyAENgIIIAQgAzYCDAwBCyAIKAIYIQkCQAJAIAgoAgwiACAIRg0AIAsgCCgCCCIDSxogACADNgIIIAMgADYCDAwBCwJAIAhBFGoiAygCACIEDQAgCEEQaiIDKAIAIgQNAEEAIQAMAQsDQCADIQsgBCIAQRRqIgMoAgAiBA0AIABBEGohAyAAKAIQIgQNAAsgC0EANgIACyAJRQ0AAkACQCAIKAIcIgRBAnRBuNKAgABqIgMoAgAgCEcNACADIAA2AgAgAA0BQQBBACgCjNCAgABBfiAEd3E2AozQgIAADAILIAlBEEEUIAkoAhAgCEYbaiAANgIAIABFDQELIAAgCTYCGAJAIAgoAhAiA0UNACAAIAM2AhAgAyAANgIYCyAIKAIUIgNFDQAgAEEUaiADNgIAIAMgADYCGAsgByAFaiEFIAggB2ohCAsgCCAIKAIEQX5xNgIEIAIgBWogBTYCACACIAVBAXI2AgQCQCAFQf8BSw0AIAVBA3YiBEEDdEGw0ICAAGohAwJAAkBBACgCiNCAgAAiBUEBIAR0IgRxDQBBACAFIARyNgKI0ICAACADIQQMAQsgAygCCCEECyAEIAI2AgwgAyACNgIIIAIgAzYCDCACIAQ2AggMAwtBHyEDAkAgBUH///8HSw0AIAVBCHYiAyADQYD+P2pBEHZBCHEiA3QiBCAEQYDgH2pBEHZBBHEiBHQiACAAQYCAD2pBEHZBAnEiAHRBD3YgAyAEciAAcmsiA0EBdCAFIANBFWp2QQFxckEcaiEDCyACIAM2AhwgAkIANwIQIANBAnRBuNKAgABqIQQCQEEAKAKM0ICAACIAQQEgA3QiCHENACAEIAI2AgBBACAAIAhyNgKM0ICAACACIAQ2AhggAiACNgIIIAIgAjYCDAwDCyAFQQBBGSADQQF2ayADQR9GG3QhAyAEKAIAIQADQCAAIgQoAgRBeHEgBUYNAiADQR12IQAgA0EBdCEDIAQgAEEEcWpBEGoiCCgCACIADQALIAggAjYCACACIAQ2AhggAiACNgIMIAIgAjYCCAwCCyAAQXggAGtBD3FBACAAQQhqQQ9xGyIDaiILIAYgA2tBSGoiA0EBcjYCBCAIQUxqQTg2AgAgBCAFQTcgBWtBD3FBACAFQUlqQQ9xG2pBQWoiCCAIIARBEGpJGyIIQSM2AgRBAEEAKALw04CAADYCpNCAgABBACALNgKg0ICAAEEAIAM2ApTQgIAAIAhBEGpBACkC0NOAgAA3AgAgCEEAKQLI04CAADcCCEEAIAhBCGo2AtDTgIAAQQAgBjYCzNOAgABBACAANgLI04CAAEEAQQA2AtTTgIAAIAhBJGohAwNAIANBBzYCACAFIANBBGoiA0sNAAsgCCAERg0DIAggCCgCBEF+cTYCBCAIIAggBGsiBjYCACAEIAZBAXI2AgQCQCAGQf8BSw0AIAZBA3YiBUEDdEGw0ICAAGohAwJAAkBBACgCiNCAgAAiAEEBIAV0IgVxDQBBACAAIAVyNgKI0ICAACADIQUMAQsgAygCCCEFCyAFIAQ2AgwgAyAENgIIIAQgAzYCDCAEIAU2AggMBAtBHyEDAkAgBkH///8HSw0AIAZBCHYiAyADQYD+P2pBEHZBCHEiA3QiBSAFQYDgH2pBEHZBBHEiBXQiACAAQYCAD2pBEHZBAnEiAHRBD3YgAyAFciAAcmsiA0EBdCAGIANBFWp2QQFxckEcaiEDCyAEQgA3AhAgBEEcaiADNgIAIANBAnRBuNKAgABqIQUCQEEAKAKM0ICAACIAQQEgA3QiCHENACAFIAQ2AgBBACAAIAhyNgKM0ICAACAEQRhqIAU2AgAgBCAENgIIIAQgBDYCDAwECyAGQQBBGSADQQF2ayADQR9GG3QhAyAFKAIAIQADQCAAIgUoAgRBeHEgBkYNAyADQR12IQAgA0EBdCEDIAUgAEEEcWpBEGoiCCgCACIADQALIAggBDYCACAEQRhqIAU2AgAgBCAENgIMIAQgBDYCCAwDCyAEKAIIIgMgAjYCDCAEIAI2AgggAkEANgIYIAIgBDYCDCACIAM2AggLIAZBCGohAwwFCyAFKAIIIgMgBDYCDCAFIAQ2AgggBEEYakEANgIAIAQgBTYCDCAEIAM2AggLQQAoApTQgIAAIgMgAk0NAEEAKAKg0ICAACIEIAJqIgUgAyACayIDQQFyNgIEQQAgAzYClNCAgABBACAFNgKg0ICAACAEIAJBA3I2AgQgBEEIaiEDDAMLQQAhA0EAQTA2AvjTgIAADAILAkAgC0UNAAJAAkAgCCAIKAIcIgVBAnRBuNKAgABqIgMoAgBHDQAgAyAANgIAIAANAUEAIAdBfiAFd3EiBzYCjNCAgAAMAgsgC0EQQRQgCygCECAIRhtqIAA2AgAgAEUNAQsgACALNgIYAkAgCCgCECIDRQ0AIAAgAzYCECADIAA2AhgLIAhBFGooAgAiA0UNACAAQRRqIAM2AgAgAyAANgIYCwJAAkAgBEEPSw0AIAggBCACaiIDQQNyNgIEIAMgCGpBBGoiAyADKAIAQQFyNgIADAELIAggAmoiACAEQQFyNgIEIAggAkEDcjYCBCAAIARqIAQ2AgACQCAEQf8BSw0AIARBA3YiBEEDdEGw0ICAAGohAwJAAkBBACgCiNCAgAAiBUEBIAR0IgRxDQBBACAFIARyNgKI0ICAACADIQQMAQsgAygCCCEECyAEIAA2AgwgAyAANgIIIAAgAzYCDCAAIAQ2AggMAQtBHyEDAkAgBEH///8HSw0AIARBCHYiAyADQYD+P2pBEHZBCHEiA3QiBSAFQYDgH2pBEHZBBHEiBXQiAiACQYCAD2pBEHZBAnEiAnRBD3YgAyAFciACcmsiA0EBdCAEIANBFWp2QQFxckEcaiEDCyAAIAM2AhwgAEIANwIQIANBAnRBuNKAgABqIQUCQCAHQQEgA3QiAnENACAFIAA2AgBBACAHIAJyNgKM0ICAACAAIAU2AhggACAANgIIIAAgADYCDAwBCyAEQQBBGSADQQF2ayADQR9GG3QhAyAFKAIAIQICQANAIAIiBSgCBEF4cSAERg0BIANBHXYhAiADQQF0IQMgBSACQQRxakEQaiIGKAIAIgINAAsgBiAANgIAIAAgBTYCGCAAIAA2AgwgACAANgIIDAELIAUoAggiAyAANgIMIAUgADYCCCAAQQA2AhggACAFNgIMIAAgAzYCCAsgCEEIaiEDDAELAkAgCkUNAAJAAkAgACAAKAIcIgVBAnRBuNKAgABqIgMoAgBHDQAgAyAINgIAIAgNAUEAIAlBfiAFd3E2AozQgIAADAILIApBEEEUIAooAhAgAEYbaiAINgIAIAhFDQELIAggCjYCGAJAIAAoAhAiA0UNACAIIAM2AhAgAyAINgIYCyAAQRRqKAIAIgNFDQAgCEEUaiADNgIAIAMgCDYCGAsCQAJAIARBD0sNACAAIAQgAmoiA0EDcjYCBCADIABqQQRqIgMgAygCAEEBcjYCAAwBCyAAIAJqIgUgBEEBcjYCBCAAIAJBA3I2AgQgBSAEaiAENgIAAkAgB0UNACAHQQN2IghBA3RBsNCAgABqIQJBACgCnNCAgAAhAwJAAkBBASAIdCIIIAZxDQBBACAIIAZyNgKI0ICAACACIQgMAQsgAigCCCEICyAIIAM2AgwgAiADNgIIIAMgAjYCDCADIAg2AggLQQAgBTYCnNCAgABBACAENgKQ0ICAAAsgAEEIaiEDCyABQRBqJICAgIAAIAMLCgAgABDJgICAAAvwDQEHfwJAIABFDQAgAEF4aiIBIABBfGooAgAiAkF4cSIAaiEDAkAgAkEBcQ0AIAJBA3FFDQEgASABKAIAIgJrIgFBACgCmNCAgAAiBEkNASACIABqIQACQEEAKAKc0ICAACABRg0AAkAgAkH/AUsNACABKAIIIgQgAkEDdiIFQQN0QbDQgIAAaiIGRhoCQCABKAIMIgIgBEcNAEEAQQAoAojQgIAAQX4gBXdxNgKI0ICAAAwDCyACIAZGGiACIAQ2AgggBCACNgIMDAILIAEoAhghBwJAAkAgASgCDCIGIAFGDQAgBCABKAIIIgJLGiAGIAI2AgggAiAGNgIMDAELAkAgAUEUaiICKAIAIgQNACABQRBqIgIoAgAiBA0AQQAhBgwBCwNAIAIhBSAEIgZBFGoiAigCACIEDQAgBkEQaiECIAYoAhAiBA0ACyAFQQA2AgALIAdFDQECQAJAIAEoAhwiBEECdEG40oCAAGoiAigCACABRw0AIAIgBjYCACAGDQFBAEEAKAKM0ICAAEF+IAR3cTYCjNCAgAAMAwsgB0EQQRQgBygCECABRhtqIAY2AgAgBkUNAgsgBiAHNgIYAkAgASgCECICRQ0AIAYgAjYCECACIAY2AhgLIAEoAhQiAkUNASAGQRRqIAI2AgAgAiAGNgIYDAELIAMoAgQiAkEDcUEDRw0AIAMgAkF+cTYCBEEAIAA2ApDQgIAAIAEgAGogADYCACABIABBAXI2AgQPCyADIAFNDQAgAygCBCICQQFxRQ0AAkACQCACQQJxDQACQEEAKAKg0ICAACADRw0AQQAgATYCoNCAgABBAEEAKAKU0ICAACAAaiIANgKU0ICAACABIABBAXI2AgQgAUEAKAKc0ICAAEcNA0EAQQA2ApDQgIAAQQBBADYCnNCAgAAPCwJAQQAoApzQgIAAIANHDQBBACABNgKc0ICAAEEAQQAoApDQgIAAIABqIgA2ApDQgIAAIAEgAEEBcjYCBCABIABqIAA2AgAPCyACQXhxIABqIQACQAJAIAJB/wFLDQAgAygCCCIEIAJBA3YiBUEDdEGw0ICAAGoiBkYaAkAgAygCDCICIARHDQBBAEEAKAKI0ICAAEF+IAV3cTYCiNCAgAAMAgsgAiAGRhogAiAENgIIIAQgAjYCDAwBCyADKAIYIQcCQAJAIAMoAgwiBiADRg0AQQAoApjQgIAAIAMoAggiAksaIAYgAjYCCCACIAY2AgwMAQsCQCADQRRqIgIoAgAiBA0AIANBEGoiAigCACIEDQBBACEGDAELA0AgAiEFIAQiBkEUaiICKAIAIgQNACAGQRBqIQIgBigCECIEDQALIAVBADYCAAsgB0UNAAJAAkAgAygCHCIEQQJ0QbjSgIAAaiICKAIAIANHDQAgAiAGNgIAIAYNAUEAQQAoAozQgIAAQX4gBHdxNgKM0ICAAAwCCyAHQRBBFCAHKAIQIANGG2ogBjYCACAGRQ0BCyAGIAc2AhgCQCADKAIQIgJFDQAgBiACNgIQIAIgBjYCGAsgAygCFCICRQ0AIAZBFGogAjYCACACIAY2AhgLIAEgAGogADYCACABIABBAXI2AgQgAUEAKAKc0ICAAEcNAUEAIAA2ApDQgIAADwsgAyACQX5xNgIEIAEgAGogADYCACABIABBAXI2AgQLAkAgAEH/AUsNACAAQQN2IgJBA3RBsNCAgABqIQACQAJAQQAoAojQgIAAIgRBASACdCICcQ0AQQAgBCACcjYCiNCAgAAgACECDAELIAAoAgghAgsgAiABNgIMIAAgATYCCCABIAA2AgwgASACNgIIDwtBHyECAkAgAEH///8HSw0AIABBCHYiAiACQYD+P2pBEHZBCHEiAnQiBCAEQYDgH2pBEHZBBHEiBHQiBiAGQYCAD2pBEHZBAnEiBnRBD3YgAiAEciAGcmsiAkEBdCAAIAJBFWp2QQFxckEcaiECCyABQgA3AhAgAUEcaiACNgIAIAJBAnRBuNKAgABqIQQCQAJAQQAoAozQgIAAIgZBASACdCIDcQ0AIAQgATYCAEEAIAYgA3I2AozQgIAAIAFBGGogBDYCACABIAE2AgggASABNgIMDAELIABBAEEZIAJBAXZrIAJBH0YbdCECIAQoAgAhBgJAA0AgBiIEKAIEQXhxIABGDQEgAkEddiEGIAJBAXQhAiAEIAZBBHFqQRBqIgMoAgAiBg0ACyADIAE2AgAgAUEYaiAENgIAIAEgATYCDCABIAE2AggMAQsgBCgCCCIAIAE2AgwgBCABNgIIIAFBGGpBADYCACABIAQ2AgwgASAANgIIC0EAQQAoAqjQgIAAQX9qIgFBfyABGzYCqNCAgAALC04AAkAgAA0APwBBEHQPCwJAIABB//8DcQ0AIABBf0wNAAJAIABBEHZAACIAQX9HDQBBAEEwNgL404CAAEF/DwsgAEEQdA8LEMuAgIAAAAsEAAAAC/sCAgN/AX4CQCACRQ0AIAAgAToAACACIABqIgNBf2ogAToAACACQQNJDQAgACABOgACIAAgAToAASADQX1qIAE6AAAgA0F+aiABOgAAIAJBB0kNACAAIAE6AAMgA0F8aiABOgAAIAJBCUkNACAAQQAgAGtBA3EiBGoiAyABQf8BcUGBgoQIbCIBNgIAIAMgAiAEa0F8cSIEaiICQXxqIAE2AgAgBEEJSQ0AIAMgATYCCCADIAE2AgQgAkF4aiABNgIAIAJBdGogATYCACAEQRlJDQAgAyABNgIYIAMgATYCFCADIAE2AhAgAyABNgIMIAJBcGogATYCACACQWxqIAE2AgAgAkFoaiABNgIAIAJBZGogATYCACAEIANBBHFBGHIiBWsiAkEgSQ0AIAGtQoGAgIAQfiEGIAMgBWohAQNAIAEgBjcDACABQRhqIAY3AwAgAUEQaiAGNwMAIAFBCGogBjcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACwuOSAEAQYAIC4ZIAQAAAAIAAAADAAAAAAAAAAAAAAAEAAAABQAAAAAAAAAAAAAABgAAAAcAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJbnZhbGlkIGNoYXIgaW4gdXJsIHF1ZXJ5AFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fYm9keQBDb250ZW50LUxlbmd0aCBvdmVyZmxvdwBDaHVuayBzaXplIG92ZXJmbG93AFJlc3BvbnNlIG92ZXJmbG93AEludmFsaWQgbWV0aG9kIGZvciBIVFRQL3gueCByZXF1ZXN0AEludmFsaWQgbWV0aG9kIGZvciBSVFNQL3gueCByZXF1ZXN0AEV4cGVjdGVkIFNPVVJDRSBtZXRob2QgZm9yIElDRS94LnggcmVxdWVzdABJbnZhbGlkIGNoYXIgaW4gdXJsIGZyYWdtZW50IHN0YXJ0AEV4cGVjdGVkIGRvdABTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3N0YXR1cwBJbnZhbGlkIHJlc3BvbnNlIHN0YXR1cwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zAFVzZXIgY2FsbGJhY2sgZXJyb3IAYG9uX3Jlc2V0YCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfaGVhZGVyYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9iZWdpbmAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3N0YXR1c19jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3ZlcnNpb25fY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl91cmxfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2hlYWRlcl92YWx1ZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX21lc3NhZ2VfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXRob2RfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9oZWFkZXJfZmllbGRfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19leHRlbnNpb25fbmFtZWAgY2FsbGJhY2sgZXJyb3IAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzZXJ2ZXIASW52YWxpZCBoZWFkZXIgdmFsdWUgY2hhcgBJbnZhbGlkIGhlYWRlciBmaWVsZCBjaGFyAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fdmVyc2lvbgBJbnZhbGlkIG1pbm9yIHZlcnNpb24ASW52YWxpZCBtYWpvciB2ZXJzaW9uAEV4cGVjdGVkIHNwYWNlIGFmdGVyIHZlcnNpb24ARXhwZWN0ZWQgQ1JMRiBhZnRlciB2ZXJzaW9uAEludmFsaWQgSFRUUCB2ZXJzaW9uAEludmFsaWQgaGVhZGVyIHRva2VuAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fdXJsAEludmFsaWQgY2hhcmFjdGVycyBpbiB1cmwAVW5leHBlY3RlZCBzdGFydCBjaGFyIGluIHVybABEb3VibGUgQCBpbiB1cmwARW1wdHkgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyYWN0ZXIgaW4gQ29udGVudC1MZW5ndGgARHVwbGljYXRlIENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhciBpbiB1cmwgcGF0aABDb250ZW50LUxlbmd0aCBjYW4ndCBiZSBwcmVzZW50IHdpdGggVHJhbnNmZXItRW5jb2RpbmcASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgc2l6ZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2hlYWRlcl92YWx1ZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHZhbHVlAE1pc3NpbmcgZXhwZWN0ZWQgTEYgYWZ0ZXIgaGVhZGVyIHZhbHVlAEludmFsaWQgYFRyYW5zZmVyLUVuY29kaW5nYCBoZWFkZXIgdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBxdW90ZSB2YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHF1b3RlZCB2YWx1ZQBQYXVzZWQgYnkgb25faGVhZGVyc19jb21wbGV0ZQBJbnZhbGlkIEVPRiBzdGF0ZQBvbl9yZXNldCBwYXVzZQBvbl9jaHVua19oZWFkZXIgcGF1c2UAb25fbWVzc2FnZV9iZWdpbiBwYXVzZQBvbl9jaHVua19leHRlbnNpb25fdmFsdWUgcGF1c2UAb25fc3RhdHVzX2NvbXBsZXRlIHBhdXNlAG9uX3ZlcnNpb25fY29tcGxldGUgcGF1c2UAb25fdXJsX2NvbXBsZXRlIHBhdXNlAG9uX2NodW5rX2NvbXBsZXRlIHBhdXNlAG9uX2hlYWRlcl92YWx1ZV9jb21wbGV0ZSBwYXVzZQBvbl9tZXNzYWdlX2NvbXBsZXRlIHBhdXNlAG9uX21ldGhvZF9jb21wbGV0ZSBwYXVzZQBvbl9oZWFkZXJfZmllbGRfY29tcGxldGUgcGF1c2UAb25fY2h1bmtfZXh0ZW5zaW9uX25hbWUgcGF1c2UAVW5leHBlY3RlZCBzcGFjZSBhZnRlciBzdGFydCBsaW5lAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fY2h1bmtfZXh0ZW5zaW9uX25hbWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBuYW1lAFBhdXNlIG9uIENPTk5FQ1QvVXBncmFkZQBQYXVzZSBvbiBQUkkvVXBncmFkZQBFeHBlY3RlZCBIVFRQLzIgQ29ubmVjdGlvbiBQcmVmYWNlAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fbWV0aG9kAEV4cGVjdGVkIHNwYWNlIGFmdGVyIG1ldGhvZABTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2hlYWRlcl9maWVsZABQYXVzZWQASW52YWxpZCB3b3JkIGVuY291bnRlcmVkAEludmFsaWQgbWV0aG9kIGVuY291bnRlcmVkAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2NoZW1hAFJlcXVlc3QgaGFzIGludmFsaWQgYFRyYW5zZmVyLUVuY29kaW5nYABTV0lUQ0hfUFJPWFkAVVNFX1BST1hZAE1LQUNUSVZJVFkAVU5QUk9DRVNTQUJMRV9FTlRJVFkAQ09QWQBNT1ZFRF9QRVJNQU5FTlRMWQBUT09fRUFSTFkATk9USUZZAEZBSUxFRF9ERVBFTkRFTkNZAEJBRF9HQVRFV0FZAFBMQVkAUFVUAENIRUNLT1VUAEdBVEVXQVlfVElNRU9VVABSRVFVRVNUX1RJTUVPVVQATkVUV09SS19DT05ORUNUX1RJTUVPVVQAQ09OTkVDVElPTl9USU1FT1VUAExPR0lOX1RJTUVPVVQATkVUV09SS19SRUFEX1RJTUVPVVQAUE9TVABNSVNESVJFQ1RFRF9SRVFVRVNUAENMSUVOVF9DTE9TRURfUkVRVUVTVABDTElFTlRfQ0xPU0VEX0xPQURfQkFMQU5DRURfUkVRVUVTVABCQURfUkVRVUVTVABIVFRQX1JFUVVFU1RfU0VOVF9UT19IVFRQU19QT1JUAFJFUE9SVABJTV9BX1RFQVBPVABSRVNFVF9DT05URU5UAE5PX0NPTlRFTlQAUEFSVElBTF9DT05URU5UAEhQRV9JTlZBTElEX0NPTlNUQU5UAEhQRV9DQl9SRVNFVABHRVQASFBFX1NUUklDVABDT05GTElDVABURU1QT1JBUllfUkVESVJFQ1QAUEVSTUFORU5UX1JFRElSRUNUAENPTk5FQ1QATVVMVElfU1RBVFVTAEhQRV9JTlZBTElEX1NUQVRVUwBUT09fTUFOWV9SRVFVRVNUUwBFQVJMWV9ISU5UUwBVTkFWQUlMQUJMRV9GT1JfTEVHQUxfUkVBU09OUwBPUFRJT05TAFNXSVRDSElOR19QUk9UT0NPTFMAVkFSSUFOVF9BTFNPX05FR09USUFURVMATVVMVElQTEVfQ0hPSUNFUwBJTlRFUk5BTF9TRVJWRVJfRVJST1IAV0VCX1NFUlZFUl9VTktOT1dOX0VSUk9SAFJBSUxHVU5fRVJST1IASURFTlRJVFlfUFJPVklERVJfQVVUSEVOVElDQVRJT05fRVJST1IAU1NMX0NFUlRJRklDQVRFX0VSUk9SAElOVkFMSURfWF9GT1JXQVJERURfRk9SAFNFVF9QQVJBTUVURVIAR0VUX1BBUkFNRVRFUgBIUEVfVVNFUgBTRUVfT1RIRVIASFBFX0NCX0NIVU5LX0hFQURFUgBNS0NBTEVOREFSAFNFVFVQAFdFQl9TRVJWRVJfSVNfRE9XTgBURUFSRE9XTgBIUEVfQ0xPU0VEX0NPTk5FQ1RJT04ASEVVUklTVElDX0VYUElSQVRJT04ARElTQ09OTkVDVEVEX09QRVJBVElPTgBOT05fQVVUSE9SSVRBVElWRV9JTkZPUk1BVElPTgBIUEVfSU5WQUxJRF9WRVJTSU9OAEhQRV9DQl9NRVNTQUdFX0JFR0lOAFNJVEVfSVNfRlJPWkVOAEhQRV9JTlZBTElEX0hFQURFUl9UT0tFTgBJTlZBTElEX1RPS0VOAEZPUkJJRERFTgBFTkhBTkNFX1lPVVJfQ0FMTQBIUEVfSU5WQUxJRF9VUkwAQkxPQ0tFRF9CWV9QQVJFTlRBTF9DT05UUk9MAE1LQ09MAEFDTABIUEVfSU5URVJOQUwAUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRV9VTk9GRklDSUFMAEhQRV9PSwBVTkxJTksAVU5MT0NLAFBSSQBSRVRSWV9XSVRIAEhQRV9JTlZBTElEX0NPTlRFTlRfTEVOR1RIAEhQRV9VTkVYUEVDVEVEX0NPTlRFTlRfTEVOR1RIAEZMVVNIAFBST1BQQVRDSABNLVNFQVJDSABVUklfVE9PX0xPTkcAUFJPQ0VTU0lORwBNSVNDRUxMQU5FT1VTX1BFUlNJU1RFTlRfV0FSTklORwBNSVNDRUxMQU5FT1VTX1dBUk5JTkcASFBFX0lOVkFMSURfVFJBTlNGRVJfRU5DT0RJTkcARXhwZWN0ZWQgQ1JMRgBIUEVfSU5WQUxJRF9DSFVOS19TSVpFAE1PVkUAQ09OVElOVUUASFBFX0NCX1NUQVRVU19DT01QTEVURQBIUEVfQ0JfSEVBREVSU19DT01QTEVURQBIUEVfQ0JfVkVSU0lPTl9DT01QTEVURQBIUEVfQ0JfVVJMX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19DT01QTEVURQBIUEVfQ0JfSEVBREVSX1ZBTFVFX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19FWFRFTlNJT05fVkFMVUVfQ09NUExFVEUASFBFX0NCX0NIVU5LX0VYVEVOU0lPTl9OQU1FX0NPTVBMRVRFAEhQRV9DQl9NRVNTQUdFX0NPTVBMRVRFAEhQRV9DQl9NRVRIT0RfQ09NUExFVEUASFBFX0NCX0hFQURFUl9GSUVMRF9DT01QTEVURQBERUxFVEUASFBFX0lOVkFMSURfRU9GX1NUQVRFAElOVkFMSURfU1NMX0NFUlRJRklDQVRFAFBBVVNFAE5PX1JFU1BPTlNFAFVOU1VQUE9SVEVEX01FRElBX1RZUEUAR09ORQBOT1RfQUNDRVBUQUJMRQBTRVJWSUNFX1VOQVZBSUxBQkxFAFJBTkdFX05PVF9TQVRJU0ZJQUJMRQBPUklHSU5fSVNfVU5SRUFDSEFCTEUAUkVTUE9OU0VfSVNfU1RBTEUAUFVSR0UATUVSR0UAUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRQBSRVFVRVNUX0hFQURFUl9UT09fTEFSR0UAUEFZTE9BRF9UT09fTEFSR0UASU5TVUZGSUNJRU5UX1NUT1JBR0UASFBFX1BBVVNFRF9VUEdSQURFAEhQRV9QQVVTRURfSDJfVVBHUkFERQBTT1VSQ0UAQU5OT1VOQ0UAVFJBQ0UASFBFX1VORVhQRUNURURfU1BBQ0UAREVTQ1JJQkUAVU5TVUJTQ1JJQkUAUkVDT1JEAEhQRV9JTlZBTElEX01FVEhPRABOT1RfRk9VTkQAUFJPUEZJTkQAVU5CSU5EAFJFQklORABVTkFVVEhPUklaRUQATUVUSE9EX05PVF9BTExPV0VEAEhUVFBfVkVSU0lPTl9OT1RfU1VQUE9SVEVEAEFMUkVBRFlfUkVQT1JURUQAQUNDRVBURUQATk9UX0lNUExFTUVOVEVEAExPT1BfREVURUNURUQASFBFX0NSX0VYUEVDVEVEAEhQRV9MRl9FWFBFQ1RFRABDUkVBVEVEAElNX1VTRUQASFBFX1BBVVNFRABUSU1FT1VUX09DQ1VSRUQAUEFZTUVOVF9SRVFVSVJFRABQUkVDT05ESVRJT05fUkVRVUlSRUQAUFJPWFlfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQATkVUV09SS19BVVRIRU5USUNBVElPTl9SRVFVSVJFRABMRU5HVEhfUkVRVUlSRUQAU1NMX0NFUlRJRklDQVRFX1JFUVVJUkVEAFVQR1JBREVfUkVRVUlSRUQAUEFHRV9FWFBJUkVEAFBSRUNPTkRJVElPTl9GQUlMRUQARVhQRUNUQVRJT05fRkFJTEVEAFJFVkFMSURBVElPTl9GQUlMRUQAU1NMX0hBTkRTSEFLRV9GQUlMRUQATE9DS0VEAFRSQU5TRk9STUFUSU9OX0FQUExJRUQATk9UX01PRElGSUVEAE5PVF9FWFRFTkRFRABCQU5EV0lEVEhfTElNSVRfRVhDRUVERUQAU0lURV9JU19PVkVSTE9BREVEAEhFQUQARXhwZWN0ZWQgSFRUUC8AAF4TAAAmEwAAMBAAAPAXAACdEwAAFRIAADkXAADwEgAAChAAAHUSAACtEgAAghMAAE8UAAB/EAAAoBUAACMUAACJEgAAixQAAE0VAADUEQAAzxQAABAYAADJFgAA3BYAAMERAADgFwAAuxQAAHQUAAB8FQAA5RQAAAgXAAAfEAAAZRUAAKMUAAAoFQAAAhUAAJkVAAAsEAAAixkAAE8PAADUDgAAahAAAM4QAAACFwAAiQ4AAG4TAAAcEwAAZhQAAFYXAADBEwAAzRMAAGwTAABoFwAAZhcAAF8XAAAiEwAAzg8AAGkOAADYDgAAYxYAAMsTAACqDgAAKBcAACYXAADFEwAAXRYAAOgRAABnEwAAZRMAAPIWAABzEwAAHRcAAPkWAADzEQAAzw4AAM4VAAAMEgAAsxEAAKURAABhEAAAMhcAALsTAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQECAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAACAwICAgICAAACAgACAgACAgICAgICAgICAAQAAAAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAgACAgICAgAAAgIAAgIAAgICAgICAgICAgADAAQAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGxvc2VlZXAtYWxpdmUAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQECAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAWNodW5rZWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAEBAQEBAAABAQABAQABAQEBAQEBAQEBAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZWN0aW9uZW50LWxlbmd0aG9ucm94eS1jb25uZWN0aW9uAAAAAAAAAAAAAAAAAAAAcmFuc2Zlci1lbmNvZGluZ3BncmFkZQ0KDQoNClNNDQoNClRUUC9DRS9UU1AvAAAAAAAAAAAAAAAAAQIAAQMAAAAAAAAAAAAAAAAAAAAAAAAEAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAECAAEDAAAAAAAAAAAAAAAAAAAAAAAABAEBBQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAEAAAIAAAAAAAAAAAAAAAAAAAAAAAADBAAABAQEBAQEBAQEBAQFBAQEBAQEBAQEBAQEAAQABgcEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAACAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATk9VTkNFRUNLT1VUTkVDVEVURUNSSUJFTFVTSEVURUFEU0VBUkNIUkdFQ1RJVklUWUxFTkRBUlZFT1RJRllQVElPTlNDSFNFQVlTVEFUQ0hHRU9SRElSRUNUT1JUUkNIUEFSQU1FVEVSVVJDRUJTQ1JJQkVBUkRPV05BQ0VJTkROS0NLVUJTQ1JJQkVIVFRQL0FEVFAv";
  return llhttpWasm;
}
var llhttp_simdWasm;
var hasRequiredLlhttp_simdWasm;
function requireLlhttp_simdWasm() {
  if (hasRequiredLlhttp_simdWasm)
    return llhttp_simdWasm;
  hasRequiredLlhttp_simdWasm = 1;
  llhttp_simdWasm = "AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAA0ZFAwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAAGBgYGAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAAMBBAUBcAESEgUDAQACBggBfwFBgNQECwfRBSIGbWVtb3J5AgALX2luaXRpYWxpemUACRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALbGxodHRwX2luaXQAChhsbGh0dHBfc2hvdWxkX2tlZXBfYWxpdmUAQQxsbGh0dHBfYWxsb2MADAZtYWxsb2MARgtsbGh0dHBfZnJlZQANBGZyZWUASA9sbGh0dHBfZ2V0X3R5cGUADhVsbGh0dHBfZ2V0X2h0dHBfbWFqb3IADxVsbGh0dHBfZ2V0X2h0dHBfbWlub3IAEBFsbGh0dHBfZ2V0X21ldGhvZAARFmxsaHR0cF9nZXRfc3RhdHVzX2NvZGUAEhJsbGh0dHBfZ2V0X3VwZ3JhZGUAEwxsbGh0dHBfcmVzZXQAFA5sbGh0dHBfZXhlY3V0ZQAVFGxsaHR0cF9zZXR0aW5nc19pbml0ABYNbGxodHRwX2ZpbmlzaAAXDGxsaHR0cF9wYXVzZQAYDWxsaHR0cF9yZXN1bWUAGRtsbGh0dHBfcmVzdW1lX2FmdGVyX3VwZ3JhZGUAGhBsbGh0dHBfZ2V0X2Vycm5vABsXbGxodHRwX2dldF9lcnJvcl9yZWFzb24AHBdsbGh0dHBfc2V0X2Vycm9yX3JlYXNvbgAdFGxsaHR0cF9nZXRfZXJyb3JfcG9zAB4RbGxodHRwX2Vycm5vX25hbWUAHxJsbGh0dHBfbWV0aG9kX25hbWUAIBJs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ACAAQd0BNgIcQQALewEBfwJAIAAoAgwiAw0AAkAgACgCBEUNACAAIAE2AgQLAkAgACABIAIQxICAgAAiAw0AIAAoAgwPCyAAIAM2AhxBACEDIAAoAgQiAUUNACAAIAEgAiAAKAIIEYGAgIAAACIBRQ0AIAAgAjYCFCAAIAE2AgwgASEDCyADC9z3AQMofwN+BX8jgICAgABBEGsiAySAgICAACABIQQgASEFIAEhBiABIQcgASEIIAEhCSABIQogASELIAEhDCABIQ0gASEOIAEhDyABIRAgASERIAEhEiABIRMgASEUIAEhFSABIRYgASEXIAEhGCABIRkgASEaIAEhGyABIRwgASEdIAEhHiABIR8gASEgIAEhISABISIgASEjIAEhJCABISUgASEmIAEhJyABISggASEpAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAAoAhwiKkF/ag7dAdoBAdkBAgMEBQYHCAkKCwwNDtgBDxDXARES1gETFBUWFxgZGhvgAd8BHB0e1QEfICEiIyQl1AEmJygpKiss0wHSAS0u0QHQAS8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRtsBR0hJSs8BzgFLzQFMzAFNTk9QUVJTVFVW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AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJA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AAAAAAAAAAkKCwwNDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADxAREhMUAAtBHiEqDMQDC0ICISsM5QELQgMhKwzkAQtCBCErDOMBC0IFISsM4gELQgYhKwzhAQtCByErDOABC0IIISsM3wELQgkhKwzeAQtCCiErDN0BC0ILISsM3AELQgwhKwzbAQtCDSErDNoBC0IOISsM2QELQg8hKwzYAQtCCiErDNcBC0ILISsM1gELQgwhKwzVAQtCDSErDNQBC0IOISsM0wELQg8hKwzSAQtCACErAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAqLQAAQVBqDjflAeQBAAECAwQFBgfmAeYB5gHmAeYB5gHmAQgJCgsMDeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gEODxAREhPmAQtCAiErDOQBC0IDISsM4wELQgQhKwziAQtCBSErDOEBC0IGISsM4AELQgchKwzfAQtCCCErDN4BC0IJISsM3QELQgohKwzcAQtCCyErDNsBC0IMISsM2gELQg0hKwzZAQtCDiErDNgBC0IPISsM1wELQgohKwzWAQtCCyErDNUBC0IMISsM1AELQg0hKwzTAQtCDiErDNIBC0IPISsM0QELIABCACAAKQMgIisgAiABIiprrSIsfSItIC0gK1YbNwMgICsgLFYiLkUN0gFBHyEqDMcDCwJAIAEiASACRg0AIABBiYCAgAA2AgggACABNgIEIAEhAUEkISoMrgMLQSAhKgzGAwsgACABIiogAhC+gICAAEF/ag4FtgEAywIB0QHSAQtBESEqDKsDCyAAQQE6AC8gKiEBDMIDCyABIgEgAkcN0gFBJCEqDMIDCyABIicgAkcNHkHGACEqDMEDCyAAIAEiASACELKAgIAAIioN1AEgASEBDLUBCyABIiogAkcNJkHQACEqDL8DCwJAIAEiASACRw0AQSghKgy/AwsgAEEANgIEIABBjICAgAA2AgggACABIAEQsYCAgAAiKg3TASABIQEM2AELAkAgASIqIAJHDQBBKSEqDL4DCyAqLQAAIgFBIEYNFCABQQlHDdMBICpBAWohAQwVCwJAIAEiASACRg0AIAFBAWohAQwXC0EqISoMvAMLAkAg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DQALIAAgKjYCAEGDASEqDOgCC0EAISogAEEANgIAIC4gMmtBA2ohAQzKAQsCQCABIiogAkcNAEGEASEqDOcCCyACICprIAAoAgAiLmohMiAqIQQgLiEBAkADQCAELQAAIAFBg8+AgABqLQAARw3MASABQQRGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIDI2AgBBhAEhKgznAgsgAEEANgIAICogLmtBBWohAUEjISoMyQELAkAgASIEIAJHDQBBhQEhKgzmAgsCQAJAIAQtAABBtH9qDggAzAHMAcwBzAHMAcwBAcwBCyAEQQFqIQFB7wAhKgzNAgsgBEEBaiEBQfAAISoMzAILAkAgASIEIAJHDQBBhgEhKgzlAgsgBC0AAEHFAEcNyQEgBEEBaiEBDIoCCwJAIAEiKiACRw0AQYcBISoM5AILIAIgKmsgACgCACIuaiEyICohBCAuIQECQANAIAQtAAAgAUGIz4CAAGotAABHDckBIAFBA0YNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgMjYCAEGHASEqDOQCCyAAQQA2AgAgKiAua0EEaiEBQS0hKgzGAQsCQCABIiogAkcNAEGIASEqDOMCCyACICprIAAoAgAiLmohMiAqIQQgLiEBAkADQCAELQAAIAFB0M+AgABqLQAARw3IASABQQhGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIDI2AgBBiAEhKgzjAgsgAEEANgIAICogLmtBCWohAUEpISoMxQELAkAgASIBIAJHDQBBiQEhKgziAgtBASEqIAEtAABB3wBHDcQBIAFBAWohAQyIAgsCQCABIiogAkcNAEGKASEqDOECCyACICprIAAoAgAiLmohMiAqIQQgLiEBA0AgBC0AACABQYzPgIAAai0AAEcNxQEgAUEBRg23AiABQQFqIQEgBEEBaiIEIAJHDQALIAAgMjYCAEGKASEqDOACCwJAIAEiKiACRw0AQYsBISoM4AILIAIgKmsgACgCACIuaiEyICohBCAuIQECQANAIAQtAAAgAUGOz4CAAGotAABHDcUBIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgMjYCAEGLASEqDOACCyAAQQA2AgAgKiAua0EDaiEBQQIhKgzCAQsCQCABIiogAkcNAEGMASEqDN8CCyACICprIAAoAgAiLmohMiAqIQQgLiEBAkADQCAELQAAIAFB8M+AgABqLQAARw3EASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIDI2AgBBjAEhKgzfAgsgAEEANgIAICogLmtBAmohAUEfISoMwQELAkAgASIqIAJHDQBBjQEhKgzeAgsgAiAqayAAKAIAIi5qITIgKiEEIC4hAQJAA0AgBC0AACABQfLPgIAAai0AAEcNwwEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAyNgIAQY0BISoM3gILIABBADYCACAqIC5rQQJqIQFBCSEqDMABCwJAIAEiBCACRw0AQY4BISoM3QILAkACQCAELQAAQbd/ag4HAMMBwwHDAcMBwwEBwwELIARBAWohAUH4ACEqDMQCCyAEQQFqIQFB+QAhKgzDAgsCQCABIiogAkcNAEGPASEqDNwCCyACICprIAAoAgAiLmohMiAqIQQgLiEBAkADQCAELQAAIAFBkc+AgABqLQAARw3BASABQQVGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIDI2AgBBjwEhKgzcAgsgAEEANgIAICogLmtBBmohAUEYISoMvgELAkAgASIqIAJHDQBBkAEhKgzbAgsgAiAqayAAKAIAIi5qITIgKiEEIC4hAQJAA0AgBC0AACABQZfPgIAAai0AAEcNwAEgAUECRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAyNgIAQZABISoM2wILIABBADYCACAqIC5rQQNqIQFBFyEqDL0BCwJAIAEiKiACRw0AQZEBISoM2gILIAIgKmsgACgCACIuaiEyICohBCAuIQECQANAIAQtAAAgAUGaz4CAAGotAABHDb8BIAFBBkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgMjYCAEGRASEqDNoCCyAAQQA2AgAgKiAua0EHaiEBQRUhKgy8AQsCQCABIiogAkcNAEGSASEqDNkCCyACICprIAAoAgAiLmohMiAqIQQgLiEBAkADQCAELQAAIAFBoc+AgABqLQAARw2+ASABQQVGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIDI2AgBBkgEhKgzZAgsgAEEANgIAICogLmtBBmohAUEeISoMuwELAkAgASIEIAJHDQBBkwEhKgzYAgsgBC0AAEHMAEcN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LjYCAEGqASEqDMECCyAAQQA2AgAgEiAqa0EDaiEBQRQhKgyjAQsCQCAEIAJHDQBBqwEhKgzAAgsCQAJAAkACQCAELQAAQb5/ag4PAAECqAGoAagBqAGoAagBqAGoAagBqAGoAQOoAQsgBEEBaiEPQZMBISoMqQILIARBAWohEEGUASEqDKgCCyAEQQFqIRFBlQEhKgynAgsgBEEBaiESQZYBISoMpgILAkAgBCACRw0AQawBISoMvwILIAQtAABBxQBHDaMBIARBAWohBAznAQsCQCATIAJHDQBBrQEhKgy+AgsgAiATayAAKAIAIipqIS4gEyEEICohAQJAA0AgBC0AACABQc3PgIAAai0AAEcNowEgAUECRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAuNgIAQa0BISoMvgILIABBADYCACATICprQQNqIQFBDiEqDKABCwJAIAQgAkcNAEGuASEqDL0CCyAELQAAQdAARw2hASAEQQFqIQFBJSEqDJ8BCwJAIBQgAkcNAEGvASEqDLwCCyACIBRrIAAoAgAiKmohLiAUIQQgKiEBAkADQCAELQAAIAFB0M+AgABqLQAARw2hASABQQhGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIC42AgBBrwEhKgy8AgsgAEEANgIAIBQgKmtBCWohAUEqISoMngELAkAgBCACRw0AQbABISoMuwILAkACQCAELQAAQat/ag4LAKEBoQGhAaEBoQGhAaEBoQGhAQGhAQsgBEEBaiEEQZoBISoMogILIARBAWohFEGbASEqDKECCwJAIAQgAkcNAEGxASEqDLoCCwJAAkAgBC0AAEG/f2oOFACgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEBoAELIARBAWohE0GZASEqDKECCyAEQQFqIQRBnAEhKgygAgsCQCAVIAJHDQBBsgEhKgy5AgsgAiAVayAAKAIAIipqIS4gFSEEICohAQJAA0AgBC0AACABQdnPgIAAai0AAEcNngEgAUEDRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAuNgIAQbIBISoMuQILIABBADYCACAVICprQQRqIQFBISEqDJsBCwJAIBYgAkcNAEGzASEqDLgCCyACIBZrIAAoAgAiKmohLiAWIQQgKiEBAkADQCAELQAAIAFB3c+AgABqLQAARw2dASABQQZGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIC42AgBBswEhKgy4AgsgAEEANgIAIBYgKmtBB2ohAUEaISoMmgELAkAgBCACRw0AQbQBISoMtwILAkACQAJAIAQtAABBu39qDhEAngGeAZ4BngGeAZ4BngGeAZ4BAZ4BngGeAZ4BngECngELIARBAWohBEGdASEqDJ8CCyAEQQFqIRVBngEhKgyeAgsgBEEBaiEWQZ8BISoMnQILAkAgFyACRw0AQbUBISoMtgILIAIgF2sgACgCACIqaiEuIBchBCAqIQECQANAIAQtAAAgAUHkz4CAAGotAABHDZsBIAFBBUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgLjYCAEG1ASEqDLYCCyAAQQA2AgAgFyAqa0EGaiEBQSghKgyYAQsCQCAYIAJHDQBBtgEhKgy1AgsgAiAYayAAKAIAIipqIS4gGCEEICohAQJAA0AgBC0AACABQerPgIAAai0AAEcNmgEgAUECRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAuNgIAQbYBISoMtQILIABBADYCACAYICprQQNqIQFBByEqDJcBCwJAIAQgAkcNAEG3ASEqDLQCCwJAAkAgBC0AAEG7f2oODgCaAZoBmgGaAZoBmgGaAZoBmgGaAZoBmgEBmgELIARBAWohF0GhASEqDJsCCyAEQQFqIRhBogEhKgyaAgsCQCAZIAJHDQBBuAEhKgyzAgsgAiAZayAAKAIAIipqIS4gGSEEICohAQJAA0AgBC0AACABQe3PgIAAai0AAEcNmAEgAUECRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAuNgIAQbgBISoMswILIABBADYCACAZICprQQNqIQFBEiEqDJUBCwJAIBogAkcNAEG5ASEqDLICCyACIBprIAAoAgAiKmohLiAaIQQgKiEBAkADQCAELQAAIAFB8M+AgABqLQAARw2XASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIC42AgBBuQEhKgyyAgsgAEEANgIAIBogKmtBAmohAUEgISoMlAELAkAgGyACRw0AQboBISoMsQILIAIgG2sgACgCACIqaiEuIBshBCAqIQECQANAIAQtAAAgAUHyz4CAAGotAABHDZYBIAFB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DM4BCyAAQQA2AhwgACABNgIUIABBoJmAgAA2AhAgAEEeNgIMQQAhKgzNAQsgAUEBaiEBCyAAQYASOwEqIAAgASACEKiAgIAAIioNASABIQELQccAISoMsQELICpBFUcNiQEgAEHRADYCHCAAIAE2AhQgAEHjl4CAADYCECAAQRU2AgxBACEqDMkBCyAAKAIEISogAEEANgIEAkAgACAqIAEQp4CAgAAiKg0AIAEhAQxiCyAAQdIANgIcIAAgATYCFCAAICo2AgxBACEqDMgBCyAAQQA2AhwgACAuNgIUIABBwaiAgAA2AhAgAEEHNgIMIABBADYCAEEAISoMxwELIAAoAgQhKiAAQQA2AgQCQCAAICogARCngICAACIqDQAgASEBDGELIABB0wA2AhwgACABNgIUIAAgKjYCDEEAISoMxgELQQAhKiAAQQA2AhwgACABNgIUIABBgJGAgAA2AhAgAEEJNgIMDMUBCyAqQRVGDYMBIABBADYCHCAAIAE2AhQgAEGUjYCAADYCECAAQSE2AgxBACEqDMQBC0EBIS9BACEyQQAhLkEBISoLIAAgKjoAKyABQQFqIQECQAJAIAAtAC1BEHENAAJAAkACQCAALQAqDgMBAAIECyAvRQ0DDAILIC4NAQwCCyAyRQ0BCyAAKAIEISogAEEANgIEAkAgACAqIAEQrYCAgAAiKg0AIAEhAQxgCyAAQdgANgIcIAAgATYCFCAAICo2AgxBACEqDMMBCyAAKAIEIQQgAEEANgIEAkAgACAEIAEQrYCAgAAiBA0AIAEhAQyyAQsgAEHZADYCHCAAIAE2AhQgACAENgIMQQAhKgzCAQsgACgCBCEEIABBADYCBAJAIAAgBCABEK2AgIAAIgQNACABIQEMsAELIABB2gA2AhwgACABNgIUIAAgBDYCDEEAISoMwQELIAAoAgQhBCAAQQA2AgQCQCAAIAQgARCtgICAACIEDQAgASEBDK4BCyAAQdwANgIcIAAgATYCFCAAIAQ2AgxBACEqDMABC0EBISoLIAAgKjoAKiABQQFqIQEMXAsgACgCBCEEIABBADYCBAJAIAAgBCABEK2AgIAAIgQNACABIQEMqgELIABB3gA2AhwgACABNgIUIAAgBDYCDEEAISoMvQELIABBADYCACAyIC9rQQRqIQECQCAALQApQSNPDQAgASEBDFwLIABBADYCHCAAIAE2AhQgAEHTiYCAADYCECAAQQg2AgxBACEqDLwBCyAAQQA2AgALQQAhKiAAQQA2AhwgACABNgIUIABBkLOAgAA2AhAgAEEINgIMDLoBCyAAQQA2AgAgMiAva0EDaiEBAkAgAC0AKUEhRw0AIAEhAQxZCyAAQQA2AhwgACABNgIUIABBm4qAgAA2AhAgAEEINgIMQQAhKgy5AQsgAEEANgIAIDIgL2tBBGohAQJAIAAtACkiKkFdakELTw0AIAEhAQxYCwJAICpBBksNAEEBICp0QcoAcUUNACABIQEMWAtBACEqIABBADYCHCAAIAE2AhQgAEH3iYCAADYCECAAQQg2AgwMuAELICpBFUYNdSAAQQA2AhwgACABNgIUIABBuY2AgAA2AhAgAEEaNgIMQQAhKgy3AQsgACgCBCEqIABBADYCBAJAIAAgKiABEKeAgIAAIioNACABIQEMVwsgAEHlADYCHCAAIAE2AhQgACAqNgIMQQAhKgy2AQsgACgCBCEqIABBADYCBAJAIAAgKiABEKeAgIAAIioNACABIQEMTwsgAEHSADYCHCAAIAE2AhQgACAqNgIMQQAhKgy1AQsgACgCBCEqIABBADYCBAJAIAAgKiABEKeAgIAAIioNACABIQEMTwsgAEHTADYCHCAAIAE2AhQgACAqNgIMQQAhKgy0AQsgACgCBCEqIABBADYCBAJAIAAgKiABEKeAgIAAIioNACABIQEMVAsgAEHlADYCHCAAIAE2AhQgACAqNgIMQQAhKgyzAQsgAEEANgIcIAAgATYCFCAAQcaKgIAANgIQIABBBzYCDEEAISoMsgELIAAoAgQhKiAAQQA2AgQCQCAAICogARCngICAACIqDQAgASEBDEsLIABB0gA2AhwgACABNgIUIAAgKjYCDEEAISoMsQELIAAoAgQhKiAAQQA2AgQCQCAAICogARCngICAACIqDQAgASEBDEsLIABB0wA2AhwgACABNgIUIAAgKjYCDEEAISoMsAELIAAoAgQhKiAAQQA2AgQCQCAAICogARCngICAACIqDQAgASEBDFALIABB5QA2AhwgACABNgIUIAAgKjYCDEEAISoMrwELIABBADYCHCAAIAE2AhQgAEHciICAADYCECAAQQc2AgxBACEqDK4BCyAqQT9HDQEgAUEBaiEB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AAAABwAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEludmFsaWQgY2hhciBpbiB1cmwgcXVlcnkAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9ib2R5AENvbnRlbnQtTGVuZ3RoIG92ZXJmbG93AENodW5rIHNpemUgb3ZlcmZsb3cAUmVzcG9uc2Ugb3ZlcmZsb3cASW52YWxpZCBtZXRob2QgZm9yIEhUVFAveC54IHJlcXVlc3QASW52YWxpZCBtZXRob2QgZm9yIFJUU1AveC54IHJlcXVlc3QARXhwZWN0ZWQgU09VUkNFIG1ldGhvZCBmb3IgSUNFL3gueCByZXF1ZXN0AEludmFsaWQgY2hhciBpbiB1cmwgZnJhZ21lbnQgc3RhcnQARXhwZWN0ZWQgZG90AFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fc3RhdHVzAEludmFsaWQgcmVzcG9uc2Ugc3RhdHVzAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMAVXNlciBjYWxsYmFjayBlcnJvcgBgb25fcmVzZXRgIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19oZWFkZXJgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXNzYWdlX2JlZ2luYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlYCBjYWxsYmFjayBlcnJvcgBgb25fc3RhdHVzX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fdmVyc2lvbl9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3VybF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25faGVhZGVyX3ZhbHVlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX21ldGhvZF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2hlYWRlcl9maWVsZF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lYCBjYWxsYmFjayBlcnJvcgBVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNlcnZlcgBJbnZhbGlkIGhlYWRlciB2YWx1ZSBjaGFyAEludmFsaWQgaGVhZGVyIGZpZWxkIGNoYXIAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl92ZXJzaW9uAEludmFsaWQgbWlub3IgdmVyc2lvbgBJbnZhbGlkIG1ham9yIHZlcnNpb24ARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgdmVyc2lvbgBFeHBlY3RlZCBDUkxGIGFmdGVyIHZlcnNpb24ASW52YWxpZCBIVFRQIHZlcnNpb24ASW52YWxpZCBoZWFkZXIgdG9rZW4AU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl91cmwASW52YWxpZCBjaGFyYWN0ZXJzIGluIHVybABVbmV4cGVjdGVkIHN0YXJ0IGNoYXIgaW4gdXJsAERvdWJsZSBAIGluIHVybABFbXB0eSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXJhY3RlciBpbiBDb250ZW50LUxlbmd0aABEdXBsaWNhdGUgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyIGluIHVybCBwYXRoAENvbnRlbnQtTGVuZ3RoIGNhbid0IGJlIHByZXNlbnQgd2l0aCBUcmFuc2Zlci1FbmNvZGluZwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBzaXplAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX3ZhbHVlAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgdmFsdWUATWlzc2luZyBleHBlY3RlZCBMRiBhZnRlciBoZWFkZXIgdmFsdWUASW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgIGhlYWRlciB2YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHF1b3RlIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGVkIHZhbHVlAFBhdXNlZCBieSBvbl9oZWFkZXJzX2NvbXBsZXRlAEludmFsaWQgRU9GIHN0YXRlAG9uX3Jlc2V0IHBhdXNlAG9uX2NodW5rX2hlYWRlciBwYXVzZQBvbl9tZXNzYWdlX2JlZ2luIHBhdXNlAG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZSBwYXVzZQBvbl9zdGF0dXNfY29tcGxldGUgcGF1c2UAb25fdmVyc2lvbl9jb21wbGV0ZSBwYXVzZQBvbl91cmxfY29tcGxldGUgcGF1c2UAb25fY2h1bmtfY29tcGxldGUgcGF1c2UAb25faGVhZGVyX3ZhbHVlX2NvbXBsZXRlIHBhdXNlAG9uX21lc3NhZ2VfY29tcGxldGUgcGF1c2UAb25fbWV0aG9kX2NvbXBsZXRlIHBhdXNlAG9uX2hlYWRlcl9maWVsZF9jb21wbGV0ZSBwYXVzZQBvbl9jaHVua19leHRlbnNpb25fbmFtZSBwYXVzZQBVbmV4cGVjdGVkIHNwYWNlIGFmdGVyIHN0YXJ0IGxpbmUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9jaHVua19leHRlbnNpb25fbmFtZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIG5hbWUAUGF1c2Ugb24gQ09OTkVDVC9VcGdyYWRlAFBhdXNlIG9uIFBSSS9VcGdyYWRlAEV4cGVjdGVkIEhUVFAvMiBDb25uZWN0aW9uIFByZWZhY2UAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9tZXRob2QARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgbWV0aG9kAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX2ZpZWxkAFBhdXNlZABJbnZhbGlkIHdvcmQgZW5jb3VudGVyZWQASW52YWxpZCBtZXRob2QgZW5jb3VudGVyZWQAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzY2hlbWEAUmVxdWVzdCBoYXMgaW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgAFNXSVRDSF9QUk9YWQBVU0VfUFJPWFkATUtBQ1RJVklUWQBVTlBST0NFU1NBQkxFX0VOVElUWQBDT1BZAE1PVkVEX1BFUk1BTkVOVExZAFRPT19FQVJMWQBOT1RJRlkARkFJTEVEX0RFUEVOREVOQ1kAQkFEX0dBVEVXQVkAUExBWQBQVVQAQ0hFQ0tPVVQAR0FURVdBWV9USU1FT1VUAFJFUVVFU1RfVElNRU9VVABORVRXT1JLX0NPTk5FQ1RfVElNRU9VVABDT05ORUNUSU9OX1RJTUVPVVQATE9HSU5fVElNRU9VVABORVRXT1JLX1JFQURfVElNRU9VVABQT1NUAE1JU0RJUkVDVEVEX1JFUVVFU1QAQ0xJRU5UX0NMT1NFRF9SRVFVRVNUAENMSUVOVF9DTE9TRURfTE9BRF9CQUxBTkNFRF9SRVFVRVNUAEJBRF9SRVFVRVNUAEhUVFBfUkVRVUVTVF9TRU5UX1RPX0hUVFBTX1BPUlQAUkVQT1JUAElNX0FfVEVBUE9UAFJFU0VUX0NPTlRFTlQATk9fQ09OVEVOVABQQVJUSUFMX0NPTlRFTlQASFBFX0lOVkFMSURfQ09OU1RBTlQASFBFX0NCX1JFU0VUAEdFVABIUEVfU1RSSUNUAENPTkZMSUNUAFRFTVBPUkFSWV9SRURJUkVDVABQRVJNQU5FTlRfUkVESVJFQ1QAQ09OTkVDVABNVUxUSV9TVEFUVVMASFBFX0lOVkFMSURfU1RBVFVTAFRPT19NQU5ZX1JFUVVFU1RTAEVBUkxZX0hJTlRTAFVOQVZBSUxBQkxFX0ZPUl9MRUdBTF9SRUFTT05TAE9QVElPTlMAU1dJVENISU5HX1BST1RPQ09MUwBWQVJJQU5UX0FMU09fTkVHT1RJQVRFUwBNVUxUSVBMRV9DSE9JQ0VTAElOVEVSTkFMX1NFUlZFUl9FUlJPUgBXRUJfU0VSVkVSX1VOS05PV05fRVJST1IAUkFJTEdVTl9FUlJPUgBJREVOVElUWV9QUk9WSURFUl9BVVRIRU5USUNBVElPTl9FUlJPUgBTU0xfQ0VSVElGSUNBVEVfRVJST1IASU5WQUxJRF9YX0ZPUldBUkRFRF9GT1IAU0VUX1BBUkFNRVRFUgBHRVRfUEFSQU1FVEVSAEhQRV9VU0VSAFNFRV9PVEhFUgBIUEVfQ0JfQ0hVTktfSEVBREVSAE1LQ0FMRU5EQVIAU0VUVVAAV0VCX1NFUlZFUl9JU19ET1dOAFRFQVJET1dOAEhQRV9DTE9TRURfQ09OTkVDVElPTgBIRVVSSVNUSUNfRVhQSVJBVElPTgBESVNDT05ORUNURURfT1BFUkFUSU9OAE5PTl9BVVRIT1JJVEFUSVZFX0lORk9STUFUSU9OAEhQRV9JTlZBTElEX1ZFUlNJT04ASFBFX0NCX01FU1NBR0VfQkVHSU4AU0lURV9JU19GUk9aRU4ASFBFX0lOVkFMSURfSEVBREVSX1RPS0VOAElOVkFMSURfVE9LRU4ARk9SQklEREVOAEVOSEFOQ0VfWU9VUl9DQUxNAEhQRV9JTlZBTElEX1VSTABCTE9DS0VEX0JZX1BBUkVOVEFMX0NPTlRST0wATUtDT0wAQUNMAEhQRV9JTlRFUk5BTABSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFX1VOT0ZGSUNJQUwASFBFX09LAFVOTElOSwBVTkxPQ0sAUFJJAFJFVFJZX1dJVEgASFBFX0lOVkFMSURfQ09OVEVOVF9MRU5HVEgASFBFX1VORVhQRUNURURfQ09OVEVOVF9MRU5HVEgARkxVU0gAUFJPUFBBVENIAE0tU0VBUkNIAFVSSV9UT09fTE9ORwBQUk9DRVNTSU5HAE1JU0NFTExBTkVPVVNfUEVSU0lTVEVOVF9XQVJOSU5HAE1JU0NFTExBTkVPVVNfV0FSTklORwBIUEVfSU5WQUxJRF9UUkFOU0ZFUl9FTkNPRElORwBFeHBlY3RlZCBDUkxGAEhQRV9JTlZBTElEX0NIVU5LX1NJWkUATU9WRQBDT05USU5VRQBIUEVfQ0JfU1RBVFVTX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJTX0NPTVBMRVRFAEhQRV9DQl9WRVJTSU9OX0NPTVBMRVRFAEhQRV9DQl9VUkxfQ09NUExFVEUASFBFX0NCX0NIVU5LX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJfVkFMVUVfQ09NUExFVEUASFBFX0NCX0NIVU5LX0VYVEVOU0lPTl9WQUxVRV9DT01QTEVURQBIUEVfQ0JfQ0hVTktfRVhURU5TSU9OX05BTUVfQ09NUExFVEUASFBFX0NCX01FU1NBR0VfQ09NUExFVEUASFBFX0NCX01FVEhPRF9DT01QTEVURQBIUEVfQ0JfSEVBREVSX0ZJRUxEX0NPTVBMRVRFAERFTEVURQBIUEVfSU5WQUxJRF9FT0ZfU1RBVEUASU5WQUxJRF9TU0xfQ0VSVElGSUNBVEUAUEFVU0UATk9fUkVTUE9OU0UAVU5TVVBQT1JURURfTUVESUFfVFlQRQBHT05FAE5PVF9BQ0NFUFRBQkxFAFNFUlZJQ0VfVU5BVkFJTEFCTEUAUkFOR0VfTk9UX1NBVElTRklBQkxFAE9SSUdJTl9JU19VTlJFQUNIQUJMRQBSRVNQT05TRV9JU19TVEFMRQBQVVJHRQBNRVJHRQBSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFAFJFUVVFU1RfSEVBREVSX1RPT19MQVJHRQBQQVlMT0FEX1RPT19MQVJHRQBJTlNVRkZJQ0lFTlRfU1RPUkFHRQBIUEVfUEFVU0VEX1VQR1JBREUASFBFX1BBVVNFRF9IMl9VUEdSQURFAFNPVVJDRQBBTk5PVU5DRQBUUkFDRQBIUEVfVU5FWFBFQ1RFRF9TUEFDRQBERVNDUklCRQBVTlNVQlNDUklCRQBSRUNPUkQASFBFX0lOVkFMSURfTUVUSE9EAE5PVF9GT1VORABQUk9QRklORABVTkJJTkQAUkVCSU5EAFVOQVVUSE9SSVpFRABNRVRIT0RfTk9UX0FMTE9XRUQASFRUUF9WRVJTSU9OX05PVF9TVVBQT1JURUQAQUxSRUFEWV9SRVBPUlRFRABBQ0NFUFRFRABOT1RfSU1QTEVNRU5URUQATE9PUF9ERVRFQ1RFRABIUEVfQ1JfRVhQRUNURUQASFBFX0xGX0VYUEVDVEVEAENSRUFURUQASU1fVVNFRABIUEVfUEFVU0VEAFRJTUVPVVRfT0NDVVJFRABQQVlNRU5UX1JFUVVJUkVEAFBSRUNPTkRJVElPTl9SRVFVSVJFRABQUk9YWV9BVVRIRU5USUNBVElPTl9SRVFVSVJFRABORVRXT1JLX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEAExFTkdUSF9SRVFVSVJFRABTU0xfQ0VSVElGSUNBVEVfUkVRVUlSRUQAVVBHUkFERV9SRVFVSVJFRABQQUdFX0VYUElSRUQAUFJFQ09ORElUSU9OX0ZBSUxFRABFWFBFQ1RBVElPTl9GQUlMRUQAUkVWQUxJREFUSU9OX0ZBSUxFRABTU0xfSEFORFNIQUtFX0ZBSUxFRABMT0NLRUQAVFJBTlNGT1JNQVRJT05fQVBQTElFRABOT1RfTU9ESUZJRUQATk9UX0VYVEVOREVEAEJBTkRXSURUSF9MSU1JVF9FWENFRURFRABTSVRFX0lTX09WRVJMT0FERUQASEVBRABFeHBlY3RlZCBIVFRQLwAAXhMAACYTAAAwEAAA8BcAAJ0TAAAVEgAAORcAAPASAAAKEAAAdRIAAK0SAACCEwAATxQAAH8QAACgFQAAIxQAAIkSAACLFAAATRUAANQRAADPFAAAEBgAAMkWAADcFgAAwREAAOAXAAC7FAAAdBQAAHwVAADlFAAACBcAAB8QAABlFQAAoxQAACgVAAACFQAAmRUAACwQAACLGQAATw8AANQOAABqEAAAzhAAAAIXAACJDgAAbhMAABwTAABmFAAAVhcAAMETAADNEwAAbBMAAGgXAABmFwAAXxcAACITAADODwAAaQ4AANgOAABjFgAAyxMAAKoOAAAoFwAAJhcAAMUTAABdFgAA6BEAAGcTAABlEwAA8hYAAHMTAAAdFwAA+RYAAPMRAADPDgAAzhUAAAwSAACzEQAApREAAGEQAAAyFwAAuxMAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAIDAgICAgIAAAICAAICAAICAgICAgICAgIABAAAAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgIAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAACAAICAgICAAACAgACAgACAgICAgICAgICAAMABAAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbG9zZWVlcC1hbGl2ZQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBY2h1bmtlZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAQEBAQEAAAEBAAEBAAEBAQEBAQEBAQEAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABlY3Rpb25lbnQtbGVuZ3Rob25yb3h5LWNvbm5lY3Rpb24AAAAAAAAAAAAAAAAAAAByYW5zZmVyLWVuY29kaW5ncGdyYWRlDQoNCg0KU00NCg0KVFRQL0NFL1RTUC8AAAAAAAAAAAAAAAABAgABAwAAAAAAAAAAAAAAAAAAAAAAAAQBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQIAAQMAAAAAAAAAAAAAAAAAAAAAAAAEAQEFAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAQAAAgAAAAAAAAAAAAAAAAAAAAAAAAMEAAAEBAQEBAQEBAQEBAUEBAQEBAQEBAQEBAQABAAGBwQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAIAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOT1VOQ0VFQ0tPVVRORUNURVRFQ1JJQkVMVVNIRVRFQURTRUFSQ0hSR0VDVElWSVRZTEVOREFSVkVPVElGWVBUSU9OU0NIU0VBWVNUQVRDSEdFT1JESVJFQ1RPUlRSQ0hQQVJBTUVURVJVUkNFQlNDUklCRUFSRE9XTkFDRUlORE5LQ0tVQlNDUklCRUhUVFAvQURUUC8=";
  return llhttp_simdWasm;
}
const assert$4 = require$$0$1;
const net = require$$4;
const util$e = util$j;
const timers = timers$1;
const Request$4 = request$3;
const DispatcherBase$2 = dispatcherBase;
const {
  RequestContentLengthMismatchError: RequestContentLengthMismatchError2,
  ResponseContentLengthMismatchError: ResponseContentLengthMismatchError2,
  InvalidArgumentError: InvalidArgumentError$d,
  RequestAbortedError: RequestAbortedError$7,
  HeadersTimeoutError: HeadersTimeoutError2,
  HeadersOverflowError: HeadersOverflowError2,
  SocketError: SocketError$2,
  InformationalError: InformationalError2,
  BodyTimeoutError: BodyTimeoutError2,
  HTTPParserError: HTTPParserError2,
  ResponseExceededMaxSizeError: ResponseExceededMaxSizeError2,
  ClientDestroyedError: ClientDestroyedError2
} = errors$1;
const buildConnector$1 = connect$2;
const {
  kUrl: kUrl$2,
  kReset,
  kServerName,
  kClient,
  kBusy: kBusy$1,
  kParser,
  kConnect,
  kBlocking,
  kResuming,
  kRunning: kRunning$3,
  kPending: kPending$2,
  kSize: kSize$4,
  kWriting,
  kQueue: kQueue$1,
  kConnected: kConnected$5,
  kConnecting,
  kNeedDrain: kNeedDrain$2,
  kNoRef,
  kKeepAliveDefaultTimeout,
  kHostHeader,
  kPendingIdx,
  kRunningIdx,
  kError,
  kPipelining,
  kSocket,
  kKeepAliveTimeoutValue,
  kMaxHeadersSize,
  kKeepAliveMaxTimeout,
  kKeepAliveTimeoutThreshold,
  kHeadersTimeout,
  kBodyTimeout,
  kStrictContentLength,
  kConnector,
  kMaxRedirections: kMaxRedirections$1,
  kMaxRequests,
  kCounter,
  kClose: kClose$4,
  kDestroy: kDestroy$2,
  kDispatch: kDispatch$2,
  kInterceptors: kInterceptors$2,
  kLocalAddress,
  kMaxResponseSize
} = symbols$4;
const FastBuffer = Buffer[Symbol.species];
const kClosedResolve$1 = Symbol("kClosedResolve");
const channels = {};
try {
  const diagnosticsChannel = require("diagnostics_channel");
  channels.sendHeaders = diagnosticsChannel.channel("undici:client:sendHeaders");
  channels.beforeConnect = diagnosticsChannel.channel("undici:client:beforeConnect");
  channels.connectError = diagnosticsChannel.channel("undici:client:connectError");
  channels.connected = diagnosticsChannel.channel("undici:client:connected");
} catch {
  channels.sendHeaders = { hasSubscribers: false };
  channels.beforeConnect = { hasSubscribers: false };
  channels.connectError = { hasSubscribers: false };
  channels.connected = { hasSubscribers: false };
}
let Client$3 = class Client extends DispatcherBase$2 {
  /**
   *
   * @param {string|URL} url
   * @param {import('../types/client').Client.Options} options
   */
  constructor(url2, {
    interceptors,
    maxHeaderSize,
    headersTimeout,
    socketTimeout,
    requestTimeout,
    connectTimeout,
    bodyTimeout,
    idleTimeout,
    keepAlive,
    keepAliveTimeout,
    maxKeepAliveTimeout,
    keepAliveMaxTimeout,
    keepAliveTimeoutThreshold,
    socketPath,
    pipelining,
    tls: tls2,
    strictContentLength,
    maxCachedSessions,
    maxRedirections,
    connect: connect2,
    maxRequestsPerClient,
    localAddress,
    maxResponseSize,
    autoSelectFamily,
    autoSelectFamilyAttemptTimeout
  } = {}) {
    super();
    if (keepAlive !== void 0) {
      throw new InvalidArgumentError$d("unsupported keepAlive, use pipelining=0 instead");
    }
    if (socketTimeout !== void 0) {
      throw new InvalidArgumentError$d("unsupported socketTimeout, use headersTimeout & bodyTimeout instead");
    }
    if (requestTimeout !== void 0) {
      throw new InvalidArgumentError$d("unsupported requestTimeout, use headersTimeout & bodyTimeout instead");
    }
    if (idleTimeout !== void 0) {
      throw new InvalidArgumentError$d("unsupported idleTimeout, use keepAliveTimeout instead");
    }
    if (maxKeepAliveTimeout !== void 0) {
      throw new InvalidArgumentError$d("unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead");
    }
    if (maxHeaderSize != null && !Number.isFinite(maxHeaderSize)) {
      throw new InvalidArgumentError$d("invalid maxHeaderSize");
    }
    if (socketPath != null && typeof socketPath !== "string") {
      throw new InvalidArgumentError$d("invalid socketPath");
    }
    if (connectTimeout != null && (!Number.isFinite(connectTimeout) || connectTimeout < 0)) {
      throw new InvalidArgumentError$d("invalid connectTimeout");
    }
    if (keepAliveTimeout != null && (!Number.isFinite(keepAliveTimeout) || keepAliveTimeout <= 0)) {
      throw new InvalidArgumentError$d("invalid keepAliveTimeout");
    }
    if (keepAliveMaxTimeout != null && (!Number.isFinite(keepAliveMaxTimeout) || keepAliveMaxTimeout <= 0)) {
      throw new InvalidArgumentError$d("invalid keepAliveMaxTimeout");
    }
    if (keepAliveTimeoutThreshold != null && !Number.isFinite(keepAliveTimeoutThreshold)) {
      throw new InvalidArgumentError$d("invalid keepAliveTimeoutThreshold");
    }
    if (headersTimeout != null && (!Number.isInteger(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError$d("headersTimeout must be a positive integer or zero");
    }
    if (bodyTimeout != null && (!Number.isInteger(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError$d("bodyTimeout must be a positive integer or zero");
    }
    if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
      throw new InvalidArgumentError$d("connect must be a function or an object");
    }
    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError$d("maxRedirections must be a positive number");
    }
    if (maxRequestsPerClient != null && (!Number.isInteger(maxRequestsPerClient) || maxRequestsPerClient < 0)) {
      throw new InvalidArgumentError$d("maxRequestsPerClient must be a positive number");
    }
    if (localAddress != null && (typeof localAddress !== "string" || net.isIP(localAddress) === 0)) {
      throw new InvalidArgumentError$d("localAddress must be valid string IP address");
    }
    if (maxResponseSize != null && (!Number.isInteger(maxResponseSize) || maxResponseSize < -1)) {
      throw new InvalidArgumentError$d("maxResponseSize must be a positive number");
    }
    if (autoSelectFamilyAttemptTimeout != null && (!Number.isInteger(autoSelectFamilyAttemptTimeout) || autoSelectFamilyAttemptTimeout < -1)) {
      throw new InvalidArgumentError$d("autoSelectFamilyAttemptTimeout must be a positive number");
    }
    if (typeof connect2 !== "function") {
      connect2 = buildConnector$1({
        ...tls2,
        maxCachedSessions,
        socketPath,
        timeout: connectTimeout,
        ...util$e.nodeHasAutoSelectFamily && autoSelectFamily ? { autoSelectFamily, autoSelectFamilyAttemptTimeout } : void 0,
        ...connect2
      });
    }
    this[kInterceptors$2] = interceptors && interceptors.Client && Array.isArray(interceptors.Client) ? interceptors.Client : [createRedirectInterceptor$1({ maxRedirections })];
    this[kUrl$2] = util$e.parseOrigin(url2);
    this[kConnector] = connect2;
    this[kSocket] = null;
    this[kPipelining] = pipelining != null ? pipelining : 1;
    this[kMaxHeadersSize] = maxHeaderSize || 16384;
    this[kKeepAliveDefaultTimeout] = keepAliveTimeout == null ? 4e3 : keepAliveTimeout;
    this[kKeepAliveMaxTimeout] = keepAliveMaxTimeout == null ? 6e5 : keepAliveMaxTimeout;
    this[kKeepAliveTimeoutThreshold] = keepAliveTimeoutThreshold == null ? 1e3 : keepAliveTimeoutThreshold;
    this[kKeepAliveTimeoutValue] = this[kKeepAliveDefaultTimeout];
    this[kServerName] = null;
    this[kLocalAddress] = localAddress != null ? localAddress : null;
    this[kResuming] = 0;
    this[kNeedDrain$2] = 0;
    this[kHostHeader] = `host: ${this[kUrl$2].hostname}${this[kUrl$2].port ? `:${this[kUrl$2].port}` : ""}\r
`;
    this[kBodyTimeout] = bodyTimeout != null ? bodyTimeout : 3e5;
    this[kHeadersTimeout] = headersTimeout != null ? headersTimeout : 3e5;
    this[kStrictContentLength] = strictContentLength == null ? true : strictContentLength;
    this[kMaxRedirections$1] = maxRedirections;
    this[kMaxRequests] = maxRequestsPerClient;
    this[kClosedResolve$1] = null;
    this[kMaxResponseSize] = maxResponseSize > -1 ? maxResponseSize : -1;
    this[kQueue$1] = [];
    this[kRunningIdx] = 0;
    this[kPendingIdx] = 0;
  }
  get pipelining() {
    return this[kPipelining];
  }
  set pipelining(value) {
    this[kPipelining] = value;
    resume(this, true);
  }
  get [kPending$2]() {
    return this[kQueue$1].length - this[kPendingIdx];
  }
  get [kRunning$3]() {
    return this[kPendingIdx] - this[kRunningIdx];
  }
  get [kSize$4]() {
    return this[kQueue$1].length - this[kRunningIdx];
  }
  get [kConnected$5]() {
    return !!this[kSocket] && !this[kConnecting] && !this[kSocket].destroyed;
  }
  get [kBusy$1]() {
    const socket = this[kSocket];
    return socket && (socket[kReset] || socket[kWriting] || socket[kBlocking]) || this[kSize$4] >= (this[kPipelining] || 1) || this[kPending$2] > 0;
  }
  /* istanbul ignore: only used for test */
  [kConnect](cb) {
    connect$1(this);
    this.once("connect", cb);
  }
  [kDispatch$2](opts, handler) {
    const origin = opts.origin || this[kUrl$2].origin;
    const request2 = new Request$4(origin, opts, handler);
    this[kQueue$1].push(request2);
    if (this[kResuming])
      ;
    else if (util$e.bodyLength(request2.body) == null && util$e.isIterable(request2.body)) {
      this[kResuming] = 1;
      process.nextTick(resume, this);
    } else {
      resume(this, true);
    }
    if (this[kResuming] && this[kNeedDrain$2] !== 2 && this[kBusy$1]) {
      this[kNeedDrain$2] = 2;
    }
    return this[kNeedDrain$2] < 2;
  }
  async [kClose$4]() {
    return new Promise((resolve) => {
      if (!this[kSize$4]) {
        resolve(null);
      } else {
        this[kClosedResolve$1] = resolve;
      }
    });
  }
  async [kDestroy$2](err) {
    return new Promise((resolve) => {
      const requests = this[kQueue$1].splice(this[kPendingIdx]);
      for (let i = 0; i < requests.length; i++) {
        const request2 = requests[i];
        errorRequest(this, request2, err);
      }
      const callback = () => {
        if (this[kClosedResolve$1]) {
          this[kClosedResolve$1]();
          this[kClosedResolve$1] = null;
        }
        resolve();
      };
      if (!this[kSocket]) {
        queueMicrotask(callback);
      } else {
        util$e.destroy(this[kSocket].on("close", callback), err);
      }
      resume(this);
    });
  }
};
const constants$2 = requireConstants$2();
const createRedirectInterceptor$1 = redirectInterceptor;
const EMPTY_BUF = Buffer.alloc(0);
async function lazyllhttp() {
  const llhttpWasmData = process.env.JEST_WORKER_ID ? requireLlhttpWasm() : void 0;
  let mod;
  try {
    mod = await WebAssembly.compile(Buffer.from(requireLlhttp_simdWasm(), "base64"));
  } catch (e) {
    mod = await WebAssembly.compile(Buffer.from(llhttpWasmData || requireLlhttpWasm(), "base64"));
  }
  return await WebAssembly.instantiate(mod, {
    env: {
      /* eslint-disable camelcase */
      wasm_on_url: (p, at, len) => {
        return 0;
      },
      wasm_on_status: (p, at, len) => {
        assert$4.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr + currentBufferRef.byteOffset;
        return currentParser.onStatus(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
      },
      wasm_on_message_begin: (p) => {
        assert$4.strictEqual(currentParser.ptr, p);
        return currentParser.onMessageBegin() || 0;
      },
      wasm_on_header_field: (p, at, len) => {
        assert$4.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr + currentBufferRef.byteOffset;
        return currentParser.onHeaderField(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
      },
      wasm_on_header_value: (p, at, len) => {
        assert$4.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr + currentBufferRef.byteOffset;
        return currentParser.onHeaderValue(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
      },
      wasm_on_headers_complete: (p, statusCode, upgrade2, shouldKeepAlive) => {
        assert$4.strictEqual(currentParser.ptr, p);
        return currentParser.onHeadersComplete(statusCode, Boolean(upgrade2), Boolean(shouldKeepAlive)) || 0;
      },
      wasm_on_body: (p, at, len) => {
        assert$4.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr + currentBufferRef.byteOffset;
        return currentParser.onBody(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
      },
      wasm_on_message_complete: (p) => {
        assert$4.strictEqual(currentParser.ptr, p);
        return currentParser.onMessageComplete() || 0;
      }
      /* eslint-enable camelcase */
    }
  });
}
let llhttpInstance = null;
let llhttpPromise = lazyllhttp();
llhttpPromise.catch();
let currentParser = null;
let currentBufferRef = null;
let currentBufferSize = 0;
let currentBufferPtr = null;
const TIMEOUT_HEADERS = 1;
const TIMEOUT_BODY = 2;
const TIMEOUT_IDLE = 3;
class Parser {
  constructor(client2, socket, { exports }) {
    assert$4(Number.isFinite(client2[kMaxHeadersSize]) && client2[kMaxHeadersSize] > 0);
    this.llhttp = exports;
    this.ptr = this.llhttp.llhttp_alloc(constants$2.TYPE.RESPONSE);
    this.client = client2;
    this.socket = socket;
    this.timeout = null;
    this.timeoutValue = null;
    this.timeoutType = null;
    this.statusCode = null;
    this.statusText = "";
    this.upgrade = false;
    this.headers = [];
    this.headersSize = 0;
    this.headersMaxSize = client2[kMaxHeadersSize];
    this.shouldKeepAlive = false;
    this.paused = false;
    this.resume = this.resume.bind(this);
    this.bytesRead = 0;
    this.keepAlive = "";
    this.contentLength = "";
    this.connection = "";
    this.maxResponseSize = client2[kMaxResponseSize];
  }
  setTimeout(value, type) {
    this.timeoutType = type;
    if (value !== this.timeoutValue) {
      timers.clearTimeout(this.timeout);
      if (value) {
        this.timeout = timers.setTimeout(onParserTimeout, value, this);
        if (this.timeout.unref) {
          this.timeout.unref();
        }
      } else {
        this.timeout = null;
      }
      this.timeoutValue = value;
    } else if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
  }
  resume() {
    if (this.socket.destroyed || !this.paused) {
      return;
    }
    assert$4(this.ptr != null);
    assert$4(currentParser == null);
    this.llhttp.llhttp_resume(this.ptr);
    assert$4(this.timeoutType === TIMEOUT_BODY);
    if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    this.paused = false;
    this.execute(this.socket.read() || EMPTY_BUF);
    this.readMore();
  }
  readMore() {
    while (!this.paused && this.ptr) {
      const chunk = this.socket.read();
      if (chunk === null) {
        break;
      }
      this.execute(chunk);
    }
  }
  execute(data) {
    assert$4(this.ptr != null);
    assert$4(currentParser == null);
    assert$4(!this.paused);
    const { socket, llhttp } = this;
    if (data.length > currentBufferSize) {
      if (currentBufferPtr) {
        llhttp.free(currentBufferPtr);
      }
      currentBufferSize = Math.ceil(data.length / 4096) * 4096;
      currentBufferPtr = llhttp.malloc(currentBufferSize);
    }
    new Uint8Array(llhttp.memory.buffer, currentBufferPtr, currentBufferSize).set(data);
    try {
      let ret;
      try {
        currentBufferRef = data;
        currentParser = this;
        ret = llhttp.llhttp_execute(this.ptr, currentBufferPtr, data.length);
      } catch (err) {
        throw err;
      } finally {
        currentParser = null;
        currentBufferRef = null;
      }
      const offset = llhttp.llhttp_get_error_pos(this.ptr) - currentBufferPtr;
      if (ret === constants$2.ERROR.PAUSED_UPGRADE) {
        this.onUpgrade(data.slice(offset));
      } else if (ret === constants$2.ERROR.PAUSED) {
        this.paused = true;
        socket.unshift(data.slice(offset));
      } else if (ret !== constants$2.ERROR.OK) {
        const ptr = llhttp.llhttp_get_error_reason(this.ptr);
        let message = "";
        if (ptr) {
          const len = new Uint8Array(llhttp.memory.buffer, ptr).indexOf(0);
          message = "Response does not match the HTTP/1.1 protocol (" + Buffer.from(llhttp.memory.buffer, ptr, len).toString() + ")";
        }
        throw new HTTPParserError2(message, constants$2.ERROR[ret], data.slice(offset));
      }
    } catch (err) {
      util$e.destroy(socket, err);
    }
  }
  destroy() {
    assert$4(this.ptr != null);
    assert$4(currentParser == null);
    this.llhttp.llhttp_free(this.ptr);
    this.ptr = null;
    timers.clearTimeout(this.timeout);
    this.timeout = null;
    this.timeoutValue = null;
    this.timeoutType = null;
    this.paused = false;
  }
  onStatus(buf) {
    this.statusText = buf.toString();
  }
  onMessageBegin() {
    const { socket, client: client2 } = this;
    if (socket.destroyed) {
      return -1;
    }
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    if (!request2) {
      return -1;
    }
  }
  onHeaderField(buf) {
    const len = this.headers.length;
    if ((len & 1) === 0) {
      this.headers.push(buf);
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
    }
    this.trackHeader(buf.length);
  }
  onHeaderValue(buf) {
    let len = this.headers.length;
    if ((len & 1) === 1) {
      this.headers.push(buf);
      len += 1;
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
    }
    const key = this.headers[len - 2];
    if (key.length === 10 && key.toString().toLowerCase() === "keep-alive") {
      this.keepAlive += buf.toString();
    } else if (key.length === 10 && key.toString().toLowerCase() === "connection") {
      this.connection += buf.toString();
    } else if (key.length === 14 && key.toString().toLowerCase() === "content-length") {
      this.contentLength += buf.toString();
    }
    this.trackHeader(buf.length);
  }
  trackHeader(len) {
    this.headersSize += len;
    if (this.headersSize >= this.headersMaxSize) {
      util$e.destroy(this.socket, new HeadersOverflowError2());
    }
  }
  onUpgrade(head) {
    const { upgrade: upgrade2, client: client2, socket, headers: headers2, statusCode } = this;
    assert$4(upgrade2);
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    assert$4(request2);
    assert$4(!socket.destroyed);
    assert$4(socket === client2[kSocket]);
    assert$4(!this.paused);
    assert$4(request2.upgrade || request2.method === "CONNECT");
    this.statusCode = null;
    this.statusText = "";
    this.shouldKeepAlive = null;
    assert$4(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;
    socket.unshift(head);
    socket[kParser].destroy();
    socket[kParser] = null;
    socket[kClient] = null;
    socket[kError] = null;
    socket.removeListener("error", onSocketError).removeListener("readable", onSocketReadable).removeListener("end", onSocketEnd).removeListener("close", onSocketClose);
    client2[kSocket] = null;
    client2[kQueue$1][client2[kRunningIdx]++] = null;
    client2.emit("disconnect", client2[kUrl$2], [client2], new InformationalError2("upgrade"));
    try {
      request2.onUpgrade(statusCode, headers2, socket);
    } catch (err) {
      util$e.destroy(socket, err);
    }
    resume(client2);
  }
  onHeadersComplete(statusCode, upgrade2, shouldKeepAlive) {
    const { client: client2, socket, headers: headers2, statusText } = this;
    if (socket.destroyed) {
      return -1;
    }
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    if (!request2) {
      return -1;
    }
    assert$4(!this.upgrade);
    assert$4(this.statusCode < 200);
    if (statusCode === 100) {
      util$e.destroy(socket, new SocketError$2("bad response", util$e.getSocketInfo(socket)));
      return -1;
    }
    if (upgrade2 && !request2.upgrade) {
      util$e.destroy(socket, new SocketError$2("bad upgrade", util$e.getSocketInfo(socket)));
      return -1;
    }
    assert$4.strictEqual(this.timeoutType, TIMEOUT_HEADERS);
    this.statusCode = statusCode;
    this.shouldKeepAlive = shouldKeepAlive || // Override llhttp value which does not allow keepAlive for HEAD.
    request2.method === "HEAD" && !socket[kReset] && this.connection.toLowerCase() === "keep-alive";
    if (this.statusCode >= 200) {
      const bodyTimeout = request2.bodyTimeout != null ? request2.bodyTimeout : client2[kBodyTimeout];
      this.setTimeout(bodyTimeout, TIMEOUT_BODY);
    } else if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    if (request2.method === "CONNECT") {
      assert$4(client2[kRunning$3] === 1);
      this.upgrade = true;
      return 2;
    }
    if (upgrade2) {
      assert$4(client2[kRunning$3] === 1);
      this.upgrade = true;
      return 2;
    }
    assert$4(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;
    if (this.shouldKeepAlive && client2[kPipelining]) {
      const keepAliveTimeout = this.keepAlive ? util$e.parseKeepAliveTimeout(this.keepAlive) : null;
      if (keepAliveTimeout != null) {
        const timeout = Math.min(
          keepAliveTimeout - client2[kKeepAliveTimeoutThreshold],
          client2[kKeepAliveMaxTimeout]
        );
        if (timeout <= 0) {
          socket[kReset] = true;
        } else {
          client2[kKeepAliveTimeoutValue] = timeout;
        }
      } else {
        client2[kKeepAliveTimeoutValue] = client2[kKeepAliveDefaultTimeout];
      }
    } else {
      socket[kReset] = true;
    }
    let pause;
    try {
      pause = request2.onHeaders(statusCode, headers2, this.resume, statusText) === false;
    } catch (err) {
      util$e.destroy(socket, err);
      return -1;
    }
    if (request2.method === "HEAD") {
      return 1;
    }
    if (statusCode < 200) {
      return 1;
    }
    if (socket[kBlocking]) {
      socket[kBlocking] = false;
      resume(client2);
    }
    return pause ? constants$2.ERROR.PAUSED : 0;
  }
  onBody(buf) {
    const { client: client2, socket, statusCode, maxResponseSize } = this;
    if (socket.destroyed) {
      return -1;
    }
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    assert$4(request2);
    assert$4.strictEqual(this.timeoutType, TIMEOUT_BODY);
    if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    assert$4(statusCode >= 200);
    if (maxResponseSize > -1 && this.bytesRead + buf.length > maxResponseSize) {
      util$e.destroy(socket, new ResponseExceededMaxSizeError2());
      return -1;
    }
    this.bytesRead += buf.length;
    try {
      if (request2.onData(buf) === false) {
        return constants$2.ERROR.PAUSED;
      }
    } catch (err) {
      util$e.destroy(socket, err);
      return -1;
    }
  }
  onMessageComplete() {
    const { client: client2, socket, statusCode, upgrade: upgrade2, headers: headers2, contentLength, bytesRead, shouldKeepAlive } = this;
    if (socket.destroyed && (!statusCode || shouldKeepAlive)) {
      return -1;
    }
    if (upgrade2) {
      return;
    }
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    assert$4(request2);
    assert$4(statusCode >= 100);
    this.statusCode = null;
    this.statusText = "";
    this.bytesRead = 0;
    this.contentLength = "";
    this.keepAlive = "";
    this.connection = "";
    assert$4(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;
    if (statusCode < 200) {
      return;
    }
    if (request2.method !== "HEAD" && contentLength && bytesRead !== parseInt(contentLength, 10)) {
      util$e.destroy(socket, new ResponseContentLengthMismatchError2());
      return -1;
    }
    try {
      request2.onComplete(headers2);
    } catch (err) {
      errorRequest(client2, request2, err);
    }
    client2[kQueue$1][client2[kRunningIdx]++] = null;
    if (socket[kWriting]) {
      assert$4.strictEqual(client2[kRunning$3], 0);
      util$e.destroy(socket, new InformationalError2("reset"));
      return constants$2.ERROR.PAUSED;
    } else if (!shouldKeepAlive) {
      util$e.destroy(socket, new InformationalError2("reset"));
      return constants$2.ERROR.PAUSED;
    } else if (socket[kReset] && client2[kRunning$3] === 0) {
      util$e.destroy(socket, new InformationalError2("reset"));
      return constants$2.ERROR.PAUSED;
    } else if (client2[kPipelining] === 1) {
      setImmediate(resume, client2);
    } else {
      resume(client2);
    }
  }
}
function onParserTimeout(parser) {
  const { socket, timeoutType, client: client2 } = parser;
  if (timeoutType === TIMEOUT_HEADERS) {
    if (!socket[kWriting] || socket.writableNeedDrain || client2[kRunning$3] > 1) {
      assert$4(!parser.paused, "cannot be paused while waiting for headers");
      util$e.destroy(socket, new HeadersTimeoutError2());
    }
  } else if (timeoutType === TIMEOUT_BODY) {
    if (!parser.paused) {
      util$e.destroy(socket, new BodyTimeoutError2());
    }
  } else if (timeoutType === TIMEOUT_IDLE) {
    assert$4(client2[kRunning$3] === 0 && client2[kKeepAliveTimeoutValue]);
    util$e.destroy(socket, new InformationalError2("socket idle timeout"));
  }
}
function onSocketReadable() {
  const { [kParser]: parser } = this;
  parser.readMore();
}
function onSocketError(err) {
  const { [kParser]: parser } = this;
  assert$4(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
  if (err.code === "ECONNRESET" && parser.statusCode && !parser.shouldKeepAlive) {
    parser.onMessageComplete();
    return;
  }
  this[kError] = err;
  onError(this[kClient], err);
}
function onError(client2, err) {
  if (client2[kRunning$3] === 0 && err.code !== "UND_ERR_INFO" && err.code !== "UND_ERR_SOCKET") {
    assert$4(client2[kPendingIdx] === client2[kRunningIdx]);
    const requests = client2[kQueue$1].splice(client2[kRunningIdx]);
    for (let i = 0; i < requests.length; i++) {
      const request2 = requests[i];
      errorRequest(client2, request2, err);
    }
    assert$4(client2[kSize$4] === 0);
  }
}
function onSocketEnd() {
  const { [kParser]: parser } = this;
  if (parser.statusCode && !parser.shouldKeepAlive) {
    parser.onMessageComplete();
    return;
  }
  util$e.destroy(this, new SocketError$2("other side closed", util$e.getSocketInfo(this)));
}
function onSocketClose() {
  const { [kClient]: client2 } = this;
  if (!this[kError] && this[kParser].statusCode && !this[kParser].shouldKeepAlive) {
    this[kParser].onMessageComplete();
  }
  this[kParser].destroy();
  this[kParser] = null;
  const err = this[kError] || new SocketError$2("closed", util$e.getSocketInfo(this));
  client2[kSocket] = null;
  if (client2.destroyed) {
    assert$4(client2[kPending$2] === 0);
    const requests = client2[kQueue$1].splice(client2[kRunningIdx]);
    for (let i = 0; i < requests.length; i++) {
      const request2 = requests[i];
      errorRequest(client2, request2, err);
    }
  } else if (client2[kRunning$3] > 0 && err.code !== "UND_ERR_INFO") {
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    client2[kQueue$1][client2[kRunningIdx]++] = null;
    errorRequest(client2, request2, err);
  }
  client2[kPendingIdx] = client2[kRunningIdx];
  assert$4(client2[kRunning$3] === 0);
  client2.emit("disconnect", client2[kUrl$2], [client2], err);
  resume(client2);
}
async function connect$1(client2) {
  assert$4(!client2[kConnecting]);
  assert$4(!client2[kSocket]);
  let { host, hostname, protocol, port } = client2[kUrl$2];
  if (hostname[0] === "[") {
    const idx = hostname.indexOf("]");
    assert$4(idx !== -1);
    const ip = hostname.substr(1, idx - 1);
    assert$4(net.isIP(ip));
    hostname = ip;
  }
  client2[kConnecting] = true;
  if (channels.beforeConnect.hasSubscribers) {
    channels.beforeConnect.publish({
      connectParams: {
        host,
        hostname,
        protocol,
        port,
        servername: client2[kServerName],
        localAddress: client2[kLocalAddress]
      },
      connector: client2[kConnector]
    });
  }
  try {
    const socket = await new Promise((resolve, reject) => {
      client2[kConnector]({
        host,
        hostname,
        protocol,
        port,
        servername: client2[kServerName],
        localAddress: client2[kLocalAddress]
      }, (err, socket2) => {
        if (err) {
          reject(err);
        } else {
          resolve(socket2);
        }
      });
    });
    if (client2.destroyed) {
      util$e.destroy(socket.on("error", () => {
      }), new ClientDestroyedError2());
      return;
    }
    if (!llhttpInstance) {
      llhttpInstance = await llhttpPromise;
      llhttpPromise = null;
    }
    client2[kConnecting] = false;
    assert$4(socket);
    socket[kNoRef] = false;
    socket[kWriting] = false;
    socket[kReset] = false;
    socket[kBlocking] = false;
    socket[kError] = null;
    socket[kParser] = new Parser(client2, socket, llhttpInstance);
    socket[kClient] = client2;
    socket[kCounter] = 0;
    socket[kMaxRequests] = client2[kMaxRequests];
    socket.on("error", onSocketError).on("readable", onSocketReadable).on("end", onSocketEnd).on("close", onSocketClose);
    client2[kSocket] = socket;
    if (channels.connected.hasSubscribers) {
      channels.connected.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port,
          servername: client2[kServerName],
          localAddress: client2[kLocalAddress]
        },
        connector: client2[kConnector],
        socket
      });
    }
    client2.emit("connect", client2[kUrl$2], [client2]);
  } catch (err) {
    if (client2.destroyed) {
      return;
    }
    client2[kConnecting] = false;
    if (channels.connectError.hasSubscribers) {
      channels.connectError.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port,
          servername: client2[kServerName],
          localAddress: client2[kLocalAddress]
        },
        connector: client2[kConnector],
        error: err
      });
    }
    if (err.code === "ERR_TLS_CERT_ALTNAME_INVALID") {
      assert$4(client2[kRunning$3] === 0);
      while (client2[kPending$2] > 0 && client2[kQueue$1][client2[kPendingIdx]].servername === client2[kServerName]) {
        const request2 = client2[kQueue$1][client2[kPendingIdx]++];
        errorRequest(client2, request2, err);
      }
    } else {
      onError(client2, err);
    }
    client2.emit("connectionError", client2[kUrl$2], [client2], err);
  }
  resume(client2);
}
function emitDrain(client2) {
  client2[kNeedDrain$2] = 0;
  client2.emit("drain", client2[kUrl$2], [client2]);
}
function resume(client2, sync) {
  if (client2[kResuming] === 2) {
    return;
  }
  client2[kResuming] = 2;
  _resume(client2, sync);
  client2[kResuming] = 0;
  if (client2[kRunningIdx] > 256) {
    client2[kQueue$1].splice(0, client2[kRunningIdx]);
    client2[kPendingIdx] -= client2[kRunningIdx];
    client2[kRunningIdx] = 0;
  }
}
function _resume(client2, sync) {
  while (true) {
    if (client2.destroyed) {
      assert$4(client2[kPending$2] === 0);
      return;
    }
    if (client2[kClosedResolve$1] && !client2[kSize$4]) {
      client2[kClosedResolve$1]();
      client2[kClosedResolve$1] = null;
      return;
    }
    const socket = client2[kSocket];
    if (socket && !socket.destroyed) {
      if (client2[kSize$4] === 0) {
        if (!socket[kNoRef] && socket.unref) {
          socket.unref();
          socket[kNoRef] = true;
        }
      } else if (socket[kNoRef] && socket.ref) {
        socket.ref();
        socket[kNoRef] = false;
      }
      if (client2[kSize$4] === 0) {
        if (socket[kParser].timeoutType !== TIMEOUT_IDLE) {
          socket[kParser].setTimeout(client2[kKeepAliveTimeoutValue], TIMEOUT_IDLE);
        }
      } else if (client2[kRunning$3] > 0 && socket[kParser].statusCode < 200) {
        if (socket[kParser].timeoutType !== TIMEOUT_HEADERS) {
          const request3 = client2[kQueue$1][client2[kRunningIdx]];
          const headersTimeout = request3.headersTimeout != null ? request3.headersTimeout : client2[kHeadersTimeout];
          socket[kParser].setTimeout(headersTimeout, TIMEOUT_HEADERS);
        }
      }
    }
    if (client2[kBusy$1]) {
      client2[kNeedDrain$2] = 2;
    } else if (client2[kNeedDrain$2] === 2) {
      if (sync) {
        client2[kNeedDrain$2] = 1;
        process.nextTick(emitDrain, client2);
      } else {
        emitDrain(client2);
      }
      continue;
    }
    if (client2[kPending$2] === 0) {
      return;
    }
    if (client2[kRunning$3] >= (client2[kPipelining] || 1)) {
      return;
    }
    const request2 = client2[kQueue$1][client2[kPendingIdx]];
    if (client2[kUrl$2].protocol === "https:" && client2[kServerName] !== request2.servername) {
      if (client2[kRunning$3] > 0) {
        return;
      }
      client2[kServerName] = request2.servername;
      if (socket && socket.servername !== request2.servername) {
        util$e.destroy(socket, new InformationalError2("servername changed"));
        return;
      }
    }
    if (client2[kConnecting]) {
      return;
    }
    if (!socket) {
      connect$1(client2);
      return;
    }
    if (socket.destroyed || socket[kWriting] || socket[kReset] || socket[kBlocking]) {
      return;
    }
    if (client2[kRunning$3] > 0 && !request2.idempotent) {
      return;
    }
    if (client2[kRunning$3] > 0 && (request2.upgrade || request2.method === "CONNECT")) {
      return;
    }
    if (util$e.isStream(request2.body) && util$e.bodyLength(request2.body) === 0) {
      request2.body.on(
        "data",
        /* istanbul ignore next */
        function() {
          assert$4(false);
        }
      ).on("error", function(err) {
        errorRequest(client2, request2, err);
      }).on("end", function() {
        util$e.destroy(this);
      });
      request2.body = null;
    }
    if (client2[kRunning$3] > 0 && (util$e.isStream(request2.body) || util$e.isAsyncIterable(request2.body))) {
      return;
    }
    if (!request2.aborted && write(client2, request2)) {
      client2[kPendingIdx]++;
    } else {
      client2[kQueue$1].splice(client2[kPendingIdx], 1);
    }
  }
}
function write(client2, request2) {
  const { body: body2, method, path, host, upgrade: upgrade2, headers: headers2, blocking, reset } = request2;
  const expectsPayload = method === "PUT" || method === "POST" || method === "PATCH";
  if (body2 && typeof body2.read === "function") {
    body2.read(0);
  }
  let contentLength = util$e.bodyLength(body2);
  if (contentLength === null) {
    contentLength = request2.contentLength;
  }
  if (contentLength === 0 && !expectsPayload) {
    contentLength = null;
  }
  if (request2.contentLength !== null && request2.contentLength !== contentLength) {
    if (client2[kStrictContentLength]) {
      errorRequest(client2, request2, new RequestContentLengthMismatchError2());
      return false;
    }
    process.emitWarning(new RequestContentLengthMismatchError2());
  }
  const socket = client2[kSocket];
  try {
    request2.onConnect((err) => {
      if (request2.aborted || request2.completed) {
        return;
      }
      errorRequest(client2, request2, err || new RequestAbortedError$7());
      util$e.destroy(socket, new InformationalError2("aborted"));
    });
  } catch (err) {
    errorRequest(client2, request2, err);
  }
  if (request2.aborted) {
    return false;
  }
  if (method === "HEAD") {
    socket[kReset] = true;
  }
  if (upgrade2 || method === "CONNECT") {
    socket[kReset] = true;
  }
  if (reset != null) {
    socket[kReset] = reset;
  }
  if (client2[kMaxRequests] && socket[kCounter]++ >= client2[kMaxRequests]) {
    socket[kReset] = true;
  }
  if (blocking) {
    socket[kBlocking] = true;
  }
  let header = `${method} ${path} HTTP/1.1\r
`;
  if (typeof host === "string") {
    header += `host: ${host}\r
`;
  } else {
    header += client2[kHostHeader];
  }
  if (upgrade2) {
    header += `connection: upgrade\r
upgrade: ${upgrade2}\r
`;
  } else if (client2[kPipelining] && !socket[kReset]) {
    header += "connection: keep-alive\r\n";
  } else {
    header += "connection: close\r\n";
  }
  if (headers2) {
    header += headers2;
  }
  if (channels.sendHeaders.hasSubscribers) {
    channels.sendHeaders.publish({ request: request2, headers: header, socket });
  }
  if (!body2) {
    if (contentLength === 0) {
      socket.write(`${header}content-length: 0\r
\r
`, "latin1");
    } else {
      assert$4(contentLength === null, "no body must not have content length");
      socket.write(`${header}\r
`, "latin1");
    }
    request2.onRequestSent();
  } else if (util$e.isBuffer(body2)) {
    assert$4(contentLength === body2.byteLength, "buffer body must have content length");
    socket.cork();
    socket.write(`${header}content-length: ${contentLength}\r
\r
`, "latin1");
    socket.write(body2);
    socket.uncork();
    request2.onBodySent(body2);
    request2.onRequestSent();
    if (!expectsPayload) {
      socket[kReset] = true;
    }
  } else if (util$e.isBlobLike(body2)) {
    if (typeof body2.stream === "function") {
      writeIterable({ body: body2.stream(), client: client2, request: request2, socket, contentLength, header, expectsPayload });
    } else {
      writeBlob({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload });
    }
  } else if (util$e.isStream(body2)) {
    writeStream({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload });
  } else if (util$e.isIterable(body2)) {
    writeIterable({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload });
  } else {
    assert$4(false);
  }
  return true;
}
function writeStream({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload }) {
  assert$4(contentLength !== 0 || client2[kRunning$3] === 0, "stream body cannot be pipelined");
  let finished2 = false;
  const writer = new AsyncWriter({ socket, request: request2, contentLength, client: client2, expectsPayload, header });
  const onData = function(chunk) {
    if (finished2) {
      return;
    }
    try {
      if (!writer.write(chunk) && this.pause) {
        this.pause();
      }
    } catch (err) {
      util$e.destroy(this, err);
    }
  };
  const onDrain = function() {
    if (finished2) {
      return;
    }
    if (body2.resume) {
      body2.resume();
    }
  };
  const onAbort = function() {
    onFinished(new RequestAbortedError$7());
  };
  const onFinished = function(err) {
    if (finished2) {
      return;
    }
    finished2 = true;
    assert$4(socket.destroyed || socket[kWriting] && client2[kRunning$3] <= 1);
    socket.off("drain", onDrain).off("error", onFinished);
    body2.removeListener("data", onData).removeListener("end", onFinished).removeListener("error", onFinished).removeListener("close", onAbort);
    if (!err) {
      try {
        writer.end();
      } catch (er) {
        err = er;
      }
    }
    writer.destroy(err);
    if (err && (err.code !== "UND_ERR_INFO" || err.message !== "reset")) {
      util$e.destroy(body2, err);
    } else {
      util$e.destroy(body2);
    }
  };
  body2.on("data", onData).on("end", onFinished).on("error", onFinished).on("close", onAbort);
  if (body2.resume) {
    body2.resume();
  }
  socket.on("drain", onDrain).on("error", onFinished);
}
async function writeBlob({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload }) {
  assert$4(contentLength === body2.size, "blob body must have content length");
  try {
    if (contentLength != null && contentLength !== body2.size) {
      throw new RequestContentLengthMismatchError2();
    }
    const buffer = Buffer.from(await body2.arrayBuffer());
    socket.cork();
    socket.write(`${header}content-length: ${contentLength}\r
\r
`, "latin1");
    socket.write(buffer);
    socket.uncork();
    request2.onBodySent(buffer);
    request2.onRequestSent();
    if (!expectsPayload) {
      socket[kReset] = true;
    }
    resume(client2);
  } catch (err) {
    util$e.destroy(socket, err);
  }
}
async function writeIterable({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload }) {
  assert$4(contentLength !== 0 || client2[kRunning$3] === 0, "iterator body cannot be pipelined");
  let callback = null;
  function onDrain() {
    if (callback) {
      const cb = callback;
      callback = null;
      cb();
    }
  }
  const waitForDrain = () => new Promise((resolve, reject) => {
    assert$4(callback === null);
    if (socket[kError]) {
      reject(socket[kError]);
    } else {
      callback = resolve;
    }
  });
  socket.on("close", onDrain).on("drain", onDrain);
  const writer = new AsyncWriter({ socket, request: request2, contentLength, client: client2, expectsPayload, header });
  try {
    for await (const chunk of body2) {
      if (socket[kError]) {
        throw socket[kError];
      }
      if (!writer.write(chunk)) {
        await waitForDrain();
      }
    }
    writer.end();
  } catch (err) {
    writer.destroy(err);
  } finally {
    socket.off("close", onDrain).off("drain", onDrain);
  }
}
class AsyncWriter {
  constructor({ socket, request: request2, contentLength, client: client2, expectsPayload, header }) {
    this.socket = socket;
    this.request = request2;
    this.contentLength = contentLength;
    this.client = client2;
    this.bytesWritten = 0;
    this.expectsPayload = expectsPayload;
    this.header = header;
    socket[kWriting] = true;
  }
  write(chunk) {
    const { socket, request: request2, contentLength, client: client2, bytesWritten, expectsPayload, header } = this;
    if (socket[kError]) {
      throw socket[kError];
    }
    if (socket.destroyed) {
      return false;
    }
    const len = Buffer.byteLength(chunk);
    if (!len) {
      return true;
    }
    if (contentLength !== null && bytesWritten + len > contentLength) {
      if (client2[kStrictContentLength]) {
        throw new RequestContentLengthMismatchError2();
      }
      process.emitWarning(new RequestContentLengthMismatchError2());
    }
    socket.cork();
    if (bytesWritten === 0) {
      if (!expectsPayload) {
        socket[kReset] = true;
      }
      if (contentLength === null) {
        socket.write(`${header}transfer-encoding: chunked\r
`, "latin1");
      } else {
        socket.write(`${header}content-length: ${contentLength}\r
\r
`, "latin1");
      }
    }
    if (contentLength === null) {
      socket.write(`\r
${len.toString(16)}\r
`, "latin1");
    }
    this.bytesWritten += len;
    const ret = socket.write(chunk);
    socket.uncork();
    request2.onBodySent(chunk);
    if (!ret) {
      if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
        if (socket[kParser].timeout.refresh) {
          socket[kParser].timeout.refresh();
        }
      }
    }
    return ret;
  }
  end() {
    const { socket, contentLength, client: client2, bytesWritten, expectsPayload, header, request: request2 } = this;
    request2.onRequestSent();
    socket[kWriting] = false;
    if (socket[kError]) {
      throw socket[kError];
    }
    if (socket.destroyed) {
      return;
    }
    if (bytesWritten === 0) {
      if (expectsPayload) {
        socket.write(`${header}content-length: 0\r
\r
`, "latin1");
      } else {
        socket.write(`${header}\r
`, "latin1");
      }
    } else if (contentLength === null) {
      socket.write("\r\n0\r\n\r\n", "latin1");
    }
    if (contentLength !== null && bytesWritten !== contentLength) {
      if (client2[kStrictContentLength]) {
        throw new RequestContentLengthMismatchError2();
      } else {
        process.emitWarning(new RequestContentLengthMismatchError2());
      }
    }
    if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
      if (socket[kParser].timeout.refresh) {
        socket[kParser].timeout.refresh();
      }
    }
    resume(client2);
  }
  destroy(err) {
    const { socket, client: client2 } = this;
    socket[kWriting] = false;
    if (err) {
      assert$4(client2[kRunning$3] <= 1, "pipeline should only contain this request");
      util$e.destroy(socket, err);
    }
  }
}
function errorRequest(client2, request2, err) {
  try {
    request2.onError(err);
    assert$4(request2.aborted);
  } catch (err2) {
    client2.emit("error", err2);
  }
}
var client = Client$3;
const kSize$3 = 2048;
const kMask = kSize$3 - 1;
class FixedCircularBuffer {
  constructor() {
    this.bottom = 0;
    this.top = 0;
    this.list = new Array(kSize$3);
    this.next = null;
  }
  isEmpty() {
    return this.top === this.bottom;
  }
  isFull() {
    return (this.top + 1 & kMask) === this.bottom;
  }
  push(data) {
    this.list[this.top] = data;
    this.top = this.top + 1 & kMask;
  }
  shift() {
    const nextItem = this.list[this.bottom];
    if (nextItem === void 0)
      return null;
    this.list[this.bottom] = void 0;
    this.bottom = this.bottom + 1 & kMask;
    return nextItem;
  }
}
var fixedQueue = class FixedQueue {
  constructor() {
    this.head = this.tail = new FixedCircularBuffer();
  }
  isEmpty() {
    return this.head.isEmpty();
  }
  push(data) {
    if (this.head.isFull()) {
      this.head = this.head.next = new FixedCircularBuffer();
    }
    this.head.push(data);
  }
  shift() {
    const tail = this.tail;
    const next = tail.shift();
    if (tail.isEmpty() && tail.next !== null) {
      this.tail = tail.next;
    }
    return next;
  }
};
const { kFree: kFree$1, kConnected: kConnected$4, kPending: kPending$1, kQueued: kQueued$1, kRunning: kRunning$2, kSize: kSize$2 } = symbols$4;
const kPool = Symbol("pool");
let PoolStats$1 = class PoolStats {
  constructor(pool2) {
    this[kPool] = pool2;
  }
  get connected() {
    return this[kPool][kConnected$4];
  }
  get free() {
    return this[kPool][kFree$1];
  }
  get pending() {
    return this[kPool][kPending$1];
  }
  get queued() {
    return this[kPool][kQueued$1];
  }
  get running() {
    return this[kPool][kRunning$2];
  }
  get size() {
    return this[kPool][kSize$2];
  }
};
var poolStats = PoolStats$1;
const DispatcherBase$1 = dispatcherBase;
const FixedQueue2 = fixedQueue;
const { kConnected: kConnected$3, kSize: kSize$1, kRunning: kRunning$1, kPending, kQueued, kBusy, kFree, kUrl: kUrl$1, kClose: kClose$3, kDestroy: kDestroy$1, kDispatch: kDispatch$1 } = symbols$4;
const PoolStats2 = poolStats;
const kClients$2 = Symbol("clients");
const kNeedDrain$1 = Symbol("needDrain");
const kQueue = Symbol("queue");
const kClosedResolve = Symbol("closed resolve");
const kOnDrain$1 = Symbol("onDrain");
const kOnConnect$1 = Symbol("onConnect");
const kOnDisconnect$1 = Symbol("onDisconnect");
const kOnConnectionError$1 = Symbol("onConnectionError");
const kGetDispatcher$1 = Symbol("get dispatcher");
const kAddClient$1 = Symbol("add client");
const kRemoveClient = Symbol("remove client");
const kStats = Symbol("stats");
let PoolBase$1 = class PoolBase extends DispatcherBase$1 {
  constructor() {
    super();
    this[kQueue] = new FixedQueue2();
    this[kClients$2] = [];
    this[kQueued] = 0;
    const pool2 = this;
    this[kOnDrain$1] = function onDrain(origin, targets) {
      const queue = pool2[kQueue];
      let needDrain = false;
      while (!needDrain) {
        const item = queue.shift();
        if (!item) {
          break;
        }
        pool2[kQueued]--;
        needDrain = !this.dispatch(item.opts, item.handler);
      }
      this[kNeedDrain$1] = needDrain;
      if (!this[kNeedDrain$1] && pool2[kNeedDrain$1]) {
        pool2[kNeedDrain$1] = false;
        pool2.emit("drain", origin, [pool2, ...targets]);
      }
      if (pool2[kClosedResolve] && queue.isEmpty()) {
        Promise.all(pool2[kClients$2].map((c) => c.close())).then(pool2[kClosedResolve]);
      }
    };
    this[kOnConnect$1] = (origin, targets) => {
      pool2.emit("connect", origin, [pool2, ...targets]);
    };
    this[kOnDisconnect$1] = (origin, targets, err) => {
      pool2.emit("disconnect", origin, [pool2, ...targets], err);
    };
    this[kOnConnectionError$1] = (origin, targets, err) => {
      pool2.emit("connectionError", origin, [pool2, ...targets], err);
    };
    this[kStats] = new PoolStats2(this);
  }
  get [kBusy]() {
    return this[kNeedDrain$1];
  }
  get [kConnected$3]() {
    return this[kClients$2].filter((client2) => client2[kConnected$3]).length;
  }
  get [kFree]() {
    return this[kClients$2].filter((client2) => client2[kConnected$3] && !client2[kNeedDrain$1]).length;
  }
  get [kPending]() {
    let ret = this[kQueued];
    for (const { [kPending]: pending } of this[kClients$2]) {
      ret += pending;
    }
    return ret;
  }
  get [kRunning$1]() {
    let ret = 0;
    for (const { [kRunning$1]: running } of this[kClients$2]) {
      ret += running;
    }
    return ret;
  }
  get [kSize$1]() {
    let ret = this[kQueued];
    for (const { [kSize$1]: size } of this[kClients$2]) {
      ret += size;
    }
    return ret;
  }
  get stats() {
    return this[kStats];
  }
  async [kClose$3]() {
    if (this[kQueue].isEmpty()) {
      return Promise.all(this[kClients$2].map((c) => c.close()));
    } else {
      return new Promise((resolve) => {
        this[kClosedResolve] = resolve;
      });
    }
  }
  async [kDestroy$1](err) {
    while (true) {
      const item = this[kQueue].shift();
      if (!item) {
        break;
      }
      item.handler.onError(err);
    }
    return Promise.all(this[kClients$2].map((c) => c.destroy(err)));
  }
  [kDispatch$1](opts, handler) {
    const dispatcher2 = this[kGetDispatcher$1]();
    if (!dispatcher2) {
      this[kNeedDrain$1] = true;
      this[kQueue].push({ opts, handler });
      this[kQueued]++;
    } else if (!dispatcher2.dispatch(opts, handler)) {
      dispatcher2[kNeedDrain$1] = true;
      this[kNeedDrain$1] = !this[kGetDispatcher$1]();
    }
    return !this[kNeedDrain$1];
  }
  [kAddClient$1](client2) {
    client2.on("drain", this[kOnDrain$1]).on("connect", this[kOnConnect$1]).on("disconnect", this[kOnDisconnect$1]).on("connectionError", this[kOnConnectionError$1]);
    this[kClients$2].push(client2);
    if (this[kNeedDrain$1]) {
      process.nextTick(() => {
        if (this[kNeedDrain$1]) {
          this[kOnDrain$1](client2[kUrl$1], [this, client2]);
        }
      });
    }
    return this;
  }
  [kRemoveClient](client2) {
    client2.close(() => {
      const idx = this[kClients$2].indexOf(client2);
      if (idx !== -1) {
        this[kClients$2].splice(idx, 1);
      }
    });
    this[kNeedDrain$1] = this[kClients$2].some((dispatcher2) => !dispatcher2[kNeedDrain$1] && dispatcher2.closed !== true && dispatcher2.destroyed !== true);
  }
};
var poolBase = {
  PoolBase: PoolBase$1,
  kClients: kClients$2,
  kNeedDrain: kNeedDrain$1,
  kAddClient: kAddClient$1,
  kRemoveClient,
  kGetDispatcher: kGetDispatcher$1
};
const {
  PoolBase: PoolBase2,
  kClients: kClients$1,
  kNeedDrain,
  kAddClient,
  kGetDispatcher
} = poolBase;
const Client$2 = client;
const {
  InvalidArgumentError: InvalidArgumentError$c
} = errors$1;
const util$d = util$j;
const { kUrl, kInterceptors: kInterceptors$1 } = symbols$4;
const buildConnector = connect$2;
const kOptions$1 = Symbol("options");
const kConnections = Symbol("connections");
const kFactory$1 = Symbol("factory");
function defaultFactory$1(origin, opts) {
  return new Client$2(origin, opts);
}
let Pool$2 = class Pool extends PoolBase2 {
  constructor(origin, {
    connections,
    factory = defaultFactory$1,
    connect: connect2,
    connectTimeout,
    tls: tls2,
    maxCachedSessions,
    socketPath,
    autoSelectFamily,
    autoSelectFamilyAttemptTimeout,
    ...options
  } = {}) {
    super();
    if (connections != null && (!Number.isFinite(connections) || connections < 0)) {
      throw new InvalidArgumentError$c("invalid connections");
    }
    if (typeof factory !== "function") {
      throw new InvalidArgumentError$c("factory must be a function.");
    }
    if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
      throw new InvalidArgumentError$c("connect must be a function or an object");
    }
    if (typeof connect2 !== "function") {
      connect2 = buildConnector({
        ...tls2,
        maxCachedSessions,
        socketPath,
        timeout: connectTimeout == null ? 1e4 : connectTimeout,
        ...util$d.nodeHasAutoSelectFamily && autoSelectFamily ? { autoSelectFamily, autoSelectFamilyAttemptTimeout } : void 0,
        ...connect2
      });
    }
    this[kInterceptors$1] = options.interceptors && options.interceptors.Pool && Array.isArray(options.interceptors.Pool) ? options.interceptors.Pool : [];
    this[kConnections] = connections || null;
    this[kUrl] = util$d.parseOrigin(origin);
    this[kOptions$1] = { ...util$d.deepClone(options), connect: connect2 };
    this[kOptions$1].interceptors = options.interceptors ? { ...options.interceptors } : void 0;
    this[kFactory$1] = factory;
  }
  [kGetDispatcher]() {
    let dispatcher2 = this[kClients$1].find((dispatcher3) => !dispatcher3[kNeedDrain]);
    if (dispatcher2) {
      return dispatcher2;
    }
    if (!this[kConnections] || this[kClients$1].length < this[kConnections]) {
      dispatcher2 = this[kFactory$1](this[kUrl], this[kOptions$1]);
      this[kAddClient](dispatcher2);
    }
    return dispatcher2;
  }
};
var pool = Pool$2;
const { kConnected: kConnected$2, kSize } = symbols$4;
class CompatWeakRef {
  constructor(value) {
    this.value = value;
  }
  deref() {
    return this.value[kConnected$2] === 0 && this.value[kSize] === 0 ? void 0 : this.value;
  }
}
class CompatFinalizer {
  constructor(finalizer) {
    this.finalizer = finalizer;
  }
  register(dispatcher2, key) {
    dispatcher2.on("disconnect", () => {
      if (dispatcher2[kConnected$2] === 0 && dispatcher2[kSize] === 0) {
        this.finalizer(key);
      }
    });
  }
}
var dispatcherWeakref = function() {
  return {
    WeakRef: commonjsGlobal.WeakRef || CompatWeakRef,
    FinalizationRegistry: commonjsGlobal.FinalizationRegistry || CompatFinalizer
  };
};
const { InvalidArgumentError: InvalidArgumentError$b } = errors$1;
const { kClients, kRunning, kClose: kClose$2, kDestroy, kDispatch, kInterceptors } = symbols$4;
const DispatcherBase2 = dispatcherBase;
const Pool$1 = pool;
const Client$1 = client;
const util$c = util$j;
const createRedirectInterceptor = redirectInterceptor;
const { WeakRef: WeakRef$1, FinalizationRegistry } = dispatcherWeakref();
const kOnConnect = Symbol("onConnect");
const kOnDisconnect = Symbol("onDisconnect");
const kOnConnectionError = Symbol("onConnectionError");
const kMaxRedirections = Symbol("maxRedirections");
const kOnDrain = Symbol("onDrain");
const kFactory = Symbol("factory");
const kFinalizer = Symbol("finalizer");
const kOptions = Symbol("options");
function defaultFactory(origin, opts) {
  return opts && opts.connections === 1 ? new Client$1(origin, opts) : new Pool$1(origin, opts);
}
let Agent$1 = class Agent extends DispatcherBase2 {
  constructor({ factory = defaultFactory, maxRedirections = 0, connect: connect2, ...options } = {}) {
    super();
    if (typeof factory !== "function") {
      throw new InvalidArgumentError$b("factory must be a function.");
    }
    if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
      throw new InvalidArgumentError$b("connect must be a function or an object");
    }
    if (!Number.isInteger(maxRedirections) || maxRedirections < 0) {
      throw new InvalidArgumentError$b("maxRedirections must be a positive number");
    }
    if (connect2 && typeof connect2 !== "function") {
      connect2 = { ...connect2 };
    }
    this[kInterceptors] = options.interceptors && options.interceptors.Agent && Array.isArray(options.interceptors.Agent) ? options.interceptors.Agent : [createRedirectInterceptor({ maxRedirections })];
    this[kOptions] = { ...util$c.deepClone(options), connect: connect2 };
    this[kOptions].interceptors = options.interceptors ? { ...options.interceptors } : void 0;
    this[kMaxRedirections] = maxRedirections;
    this[kFactory] = factory;
    this[kClients] = /* @__PURE__ */ new Map();
    this[kFinalizer] = new FinalizationRegistry(
      /* istanbul ignore next: gc is undeterministic */
      (key) => {
        const ref = this[kClients].get(key);
        if (ref !== void 0 && ref.deref() === void 0) {
          this[kClients].delete(key);
        }
      }
    );
    const agent2 = this;
    this[kOnDrain] = (origin, targets) => {
      agent2.emit("drain", origin, [agent2, ...targets]);
    };
    this[kOnConnect] = (origin, targets) => {
      agent2.emit("connect", origin, [agent2, ...targets]);
    };
    this[kOnDisconnect] = (origin, targets, err) => {
      agent2.emit("disconnect", origin, [agent2, ...targets], err);
    };
    this[kOnConnectionError] = (origin, targets, err) => {
      agent2.emit("connectionError", origin, [agent2, ...targets], err);
    };
  }
  get [kRunning]() {
    let ret = 0;
    for (const ref of this[kClients].values()) {
      const client2 = ref.deref();
      if (client2) {
        ret += client2[kRunning];
      }
    }
    return ret;
  }
  [kDispatch](opts, handler) {
    let key;
    if (opts.origin && (typeof opts.origin === "string" || opts.origin instanceof URL)) {
      key = String(opts.origin);
    } else {
      throw new InvalidArgumentError$b("opts.origin must be a non-empty string or URL.");
    }
    const ref = this[kClients].get(key);
    let dispatcher2 = ref ? ref.deref() : null;
    if (!dispatcher2) {
      dispatcher2 = this[kFactory](opts.origin, this[kOptions]).on("drain", this[kOnDrain]).on("connect", this[kOnConnect]).on("disconnect", this[kOnDisconnect]).on("connectionError", this[kOnConnectionError]);
      this[kClients].set(key, new WeakRef$1(dispatcher2));
      this[kFinalizer].register(dispatcher2, key);
    }
    return dispatcher2.dispatch(opts, handler);
  }
  async [kClose$2]() {
    const closePromises = [];
    for (const ref of this[kClients].values()) {
      const client2 = ref.deref();
      if (client2) {
        closePromises.push(client2.close());
      }
    }
    await Promise.all(closePromises);
  }
  async [kDestroy](err) {
    const destroyPromises = [];
    for (const ref of this[kClients].values()) {
      const client2 = ref.deref();
      if (client2) {
        destroyPromises.push(client2.destroy(err));
      }
    }
    await Promise.all(destroyPromises);
  }
};
var agent = Agent$1;
var api$1 = {};
const assert$3 = require$$0$1;
const { Readable: Readable$2 } = require$$0$3;
const { RequestAbortedError: RequestAbortedError$6, NotSupportedError: NotSupportedError2, InvalidArgumentError: InvalidArgumentError$a } = errors$1;
const util$b = util$j;
const { ReadableStreamFrom, toUSVString: toUSVString$1 } = util$j;
let Blob$1;
const kConsume = Symbol("kConsume");
const kReading = Symbol("kReading");
const kBody = Symbol("kBody");
const kAbort = Symbol("abort");
const kContentType = Symbol("kContentType");
var readable = class BodyReadable extends Readable$2 {
  constructor({
    resume: resume2,
    abort: abort2,
    contentType = "",
    highWaterMark = 64 * 1024
    // Same as nodejs fs streams.
  }) {
    super({
      autoDestroy: true,
      read: resume2,
      highWaterMark
    });
    this._readableState.dataEmitted = false;
    this[kAbort] = abort2;
    this[kConsume] = null;
    this[kBody] = null;
    this[kContentType] = contentType;
    this[kReading] = false;
  }
  destroy(err) {
    if (this.destroyed) {
      return this;
    }
    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError$6();
    }
    if (err) {
      this[kAbort]();
    }
    return super.destroy(err);
  }
  emit(ev, ...args) {
    if (ev === "data") {
      this._readableState.dataEmitted = true;
    } else if (ev === "error") {
      this._readableState.errorEmitted = true;
    }
    return super.emit(ev, ...args);
  }
  on(ev, ...args) {
    if (ev === "data" || ev === "readable") {
      this[kReading] = true;
    }
    return super.on(ev, ...args);
  }
  addListener(ev, ...args) {
    return this.on(ev, ...args);
  }
  off(ev, ...args) {
    const ret = super.off(ev, ...args);
    if (ev === "data" || ev === "readable") {
      this[kReading] = this.listenerCount("data") > 0 || this.listenerCount("readable") > 0;
    }
    return ret;
  }
  removeListener(ev, ...args) {
    return this.off(ev, ...args);
  }
  push(chunk) {
    if (this[kConsume] && chunk !== null && this.readableLength === 0) {
      consumePush(this[kConsume], chunk);
      return this[kReading] ? super.push(chunk) : true;
    }
    return super.push(chunk);
  }
  // https://fetch.spec.whatwg.org/#dom-body-text
  async text() {
    return consume(this, "text");
  }
  // https://fetch.spec.whatwg.org/#dom-body-json
  async json() {
    return consume(this, "json");
  }
  // https://fetch.spec.whatwg.org/#dom-body-blob
  async blob() {
    return consume(this, "blob");
  }
  // https://fetch.spec.whatwg.org/#dom-body-arraybuffer
  async arrayBuffer() {
    return consume(this, "arrayBuffer");
  }
  // https://fetch.spec.whatwg.org/#dom-body-formdata
  async formData() {
    throw new NotSupportedError2();
  }
  // https://fetch.spec.whatwg.org/#dom-body-bodyused
  get bodyUsed() {
    return util$b.isDisturbed(this);
  }
  // https://fetch.spec.whatwg.org/#dom-body-body
  get body() {
    if (!this[kBody]) {
      this[kBody] = ReadableStreamFrom(this);
      if (this[kConsume]) {
        this[kBody].getReader();
        assert$3(this[kBody].locked);
      }
    }
    return this[kBody];
  }
  async dump(opts) {
    let limit = opts && Number.isFinite(opts.limit) ? opts.limit : 262144;
    const signal = opts && opts.signal;
    const abortFn = () => {
      this.destroy();
    };
    if (signal) {
      if (typeof signal !== "object" || !("aborted" in signal)) {
        throw new InvalidArgumentError$a("signal must be an AbortSignal");
      }
      util$b.throwIfAborted(signal);
      signal.addEventListener("abort", abortFn, { once: true });
    }
    try {
      for await (const chunk of this) {
        util$b.throwIfAborted(signal);
        limit -= Buffer.byteLength(chunk);
        if (limit < 0) {
          return;
        }
      }
    } catch {
      util$b.throwIfAborted(signal);
    } finally {
      if (signal) {
        signal.removeEventListener("abort", abortFn);
      }
    }
  }
};
function isLocked(self2) {
  return self2[kBody] && self2[kBody].locked === true || self2[kConsume];
}
function isUnusable(self2) {
  return util$b.isDisturbed(self2) || isLocked(self2);
}
async function consume(stream2, type) {
  if (isUnusable(stream2)) {
    throw new TypeError("unusable");
  }
  assert$3(!stream2[kConsume]);
  return new Promise((resolve, reject) => {
    stream2[kConsume] = {
      type,
      stream: stream2,
      resolve,
      reject,
      length: 0,
      body: []
    };
    stream2.on("error", function(err) {
      consumeFinish(this[kConsume], err);
    }).on("close", function() {
      if (this[kConsume].body !== null) {
        consumeFinish(this[kConsume], new RequestAbortedError$6());
      }
    });
    process.nextTick(consumeStart, stream2[kConsume]);
  });
}
function consumeStart(consume2) {
  if (consume2.body === null) {
    return;
  }
  const { _readableState: state } = consume2.stream;
  for (const chunk of state.buffer) {
    consumePush(consume2, chunk);
  }
  if (state.endEmitted) {
    consumeEnd(this[kConsume]);
  } else {
    consume2.stream.on("end", function() {
      consumeEnd(this[kConsume]);
    });
  }
  consume2.stream.resume();
  while (consume2.stream.read() != null) {
  }
}
function consumeEnd(consume2) {
  const { type, body: body2, resolve, stream: stream2, length } = consume2;
  try {
    if (type === "text") {
      resolve(toUSVString$1(Buffer.concat(body2)));
    } else if (type === "json") {
      resolve(JSON.parse(Buffer.concat(body2)));
    } else if (type === "arrayBuffer") {
      const dst = new Uint8Array(length);
      let pos = 0;
      for (const buf of body2) {
        dst.set(buf, pos);
        pos += buf.byteLength;
      }
      resolve(dst);
    } else if (type === "blob") {
      if (!Blob$1) {
        Blob$1 = require("buffer").Blob;
      }
      resolve(new Blob$1(body2, { type: stream2[kContentType] }));
    }
    consumeFinish(consume2);
  } catch (err) {
    stream2.destroy(err);
  }
}
function consumePush(consume2, chunk) {
  consume2.length += chunk.length;
  consume2.body.push(chunk);
}
function consumeFinish(consume2, err) {
  if (consume2.body === null) {
    return;
  }
  if (err) {
    consume2.reject(err);
  } else {
    consume2.resolve();
  }
  consume2.type = null;
  consume2.stream = null;
  consume2.resolve = null;
  consume2.reject = null;
  consume2.length = 0;
  consume2.body = null;
}
const assert$2 = require$$0$1;
const {
  ResponseStatusCodeError: ResponseStatusCodeError2
} = errors$1;
const { toUSVString } = util$j;
async function getResolveErrorBodyCallback$2({ callback, body: body2, contentType, statusCode, statusMessage, headers: headers2 }) {
  assert$2(body2);
  let chunks = [];
  let limit = 0;
  for await (const chunk of body2) {
    chunks.push(chunk);
    limit += chunk.length;
    if (limit > 128 * 1024) {
      chunks = null;
      break;
    }
  }
  if (statusCode === 204 || !contentType || !chunks) {
    process.nextTick(callback, new ResponseStatusCodeError2(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ""}`, statusCode, headers2));
    return;
  }
  try {
    if (contentType.startsWith("application/json")) {
      const payload = JSON.parse(toUSVString(Buffer.concat(chunks)));
      process.nextTick(callback, new ResponseStatusCodeError2(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ""}`, statusCode, headers2, payload));
      return;
    }
    if (contentType.startsWith("text/")) {
      const payload = toUSVString(Buffer.concat(chunks));
      process.nextTick(callback, new ResponseStatusCodeError2(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ""}`, statusCode, headers2, payload));
      return;
    }
  } catch (err) {
  }
  process.nextTick(callback, new ResponseStatusCodeError2(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ""}`, statusCode, headers2));
}
var util$a = { getResolveErrorBodyCallback: getResolveErrorBodyCallback$2 };
const { RequestAbortedError: RequestAbortedError$5 } = errors$1;
const kListener = Symbol("kListener");
const kSignal = Symbol("kSignal");
function abort(self2) {
  if (self2.abort) {
    self2.abort();
  } else {
    self2.onError(new RequestAbortedError$5());
  }
}
function addSignal$5(self2, signal) {
  self2[kSignal] = null;
  self2[kListener] = null;
  if (!signal) {
    return;
  }
  if (signal.aborted) {
    abort(self2);
    return;
  }
  self2[kSignal] = signal;
  self2[kListener] = () => {
    abort(self2);
  };
  if ("addEventListener" in self2[kSignal]) {
    self2[kSignal].addEventListener("abort", self2[kListener]);
  } else {
    self2[kSignal].addListener("abort", self2[kListener]);
  }
}
function removeSignal$5(self2) {
  if (!self2[kSignal]) {
    return;
  }
  if ("removeEventListener" in self2[kSignal]) {
    self2[kSignal].removeEventListener("abort", self2[kListener]);
  } else {
    self2[kSignal].removeListener("abort", self2[kListener]);
  }
  self2[kSignal] = null;
  self2[kListener] = null;
}
var abortSignal = {
  addSignal: addSignal$5,
  removeSignal: removeSignal$5
};
const Readable$1 = readable;
const {
  InvalidArgumentError: InvalidArgumentError$9,
  RequestAbortedError: RequestAbortedError$4
} = errors$1;
const util$9 = util$j;
const { getResolveErrorBodyCallback: getResolveErrorBodyCallback$1 } = util$a;
const { AsyncResource: AsyncResource$4 } = require$$4$2;
const { addSignal: addSignal$4, removeSignal: removeSignal$4 } = abortSignal;
class RequestHandler extends AsyncResource$4 {
  constructor(opts, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$9("invalid opts");
    }
    const { signal, method, opaque, body: body2, onInfo, responseHeaders, throwOnError, highWaterMark } = opts;
    try {
      if (typeof callback !== "function") {
        throw new InvalidArgumentError$9("invalid callback");
      }
      if (highWaterMark && (typeof highWaterMark !== "number" || highWaterMark < 0)) {
        throw new InvalidArgumentError$9("invalid highWaterMark");
      }
      if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
        throw new InvalidArgumentError$9("signal must be an EventEmitter or EventTarget");
      }
      if (method === "CONNECT") {
        throw new InvalidArgumentError$9("invalid method");
      }
      if (onInfo && typeof onInfo !== "function") {
        throw new InvalidArgumentError$9("invalid onInfo callback");
      }
      super("UNDICI_REQUEST");
    } catch (err) {
      if (util$9.isStream(body2)) {
        util$9.destroy(body2.on("error", util$9.nop), err);
      }
      throw err;
    }
    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.callback = callback;
    this.res = null;
    this.abort = null;
    this.body = body2;
    this.trailers = {};
    this.context = null;
    this.onInfo = onInfo || null;
    this.throwOnError = throwOnError;
    this.highWaterMark = highWaterMark;
    if (util$9.isStream(body2)) {
      body2.on("error", (err) => {
        this.onError(err);
      });
    }
    addSignal$4(this, signal);
  }
  onConnect(abort2, context) {
    if (!this.callback) {
      throw new RequestAbortedError$4();
    }
    this.abort = abort2;
    this.context = context;
  }
  onHeaders(statusCode, rawHeaders, resume2, statusMessage) {
    const { callback, opaque, abort: abort2, context, responseHeaders, highWaterMark } = this;
    const headers2 = responseHeaders === "raw" ? util$9.parseRawHeaders(rawHeaders) : util$9.parseHeaders(rawHeaders);
    if (statusCode < 200) {
      if (this.onInfo) {
        this.onInfo({ statusCode, headers: headers2 });
      }
      return;
    }
    const parsedHeaders = responseHeaders === "raw" ? util$9.parseHeaders(rawHeaders) : headers2;
    const contentType = parsedHeaders["content-type"];
    const body2 = new Readable$1({ resume: resume2, abort: abort2, contentType, highWaterMark });
    this.callback = null;
    this.res = body2;
    if (callback !== null) {
      if (this.throwOnError && statusCode >= 400) {
        this.runInAsyncScope(
          getResolveErrorBodyCallback$1,
          null,
          { callback, body: body2, contentType, statusCode, statusMessage, headers: headers2 }
        );
      } else {
        this.runInAsyncScope(callback, null, null, {
          statusCode,
          headers: headers2,
          trailers: this.trailers,
          opaque,
          body: body2,
          context
        });
      }
    }
  }
  onData(chunk) {
    const { res } = this;
    return res.push(chunk);
  }
  onComplete(trailers) {
    const { res } = this;
    removeSignal$4(this);
    util$9.parseHeaders(trailers, this.trailers);
    res.push(null);
  }
  onError(err) {
    const { res, callback, body: body2, opaque } = this;
    removeSignal$4(this);
    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
    if (res) {
      this.res = null;
      queueMicrotask(() => {
        util$9.destroy(res, err);
      });
    }
    if (body2) {
      this.body = null;
      util$9.destroy(body2, err);
    }
  }
}
function request$2(opts, callback) {
  if (callback === void 0) {
    return new Promise((resolve, reject) => {
      request$2.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }
  try {
    this.dispatch(opts, new RequestHandler(opts, callback));
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiRequest = request$2;
const { finished, PassThrough: PassThrough$1 } = require$$0$3;
const {
  InvalidArgumentError: InvalidArgumentError$8,
  InvalidReturnValueError: InvalidReturnValueError$1,
  RequestAbortedError: RequestAbortedError$3
} = errors$1;
const util$8 = util$j;
const { getResolveErrorBodyCallback } = util$a;
const { AsyncResource: AsyncResource$3 } = require$$4$2;
const { addSignal: addSignal$3, removeSignal: removeSignal$3 } = abortSignal;
class StreamHandler extends AsyncResource$3 {
  constructor(opts, factory, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$8("invalid opts");
    }
    const { signal, method, opaque, body: body2, onInfo, responseHeaders, throwOnError } = opts;
    try {
      if (typeof callback !== "function") {
        throw new InvalidArgumentError$8("invalid callback");
      }
      if (typeof factory !== "function") {
        throw new InvalidArgumentError$8("invalid factory");
      }
      if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
        throw new InvalidArgumentError$8("signal must be an EventEmitter or EventTarget");
      }
      if (method === "CONNECT") {
        throw new InvalidArgumentError$8("invalid method");
      }
      if (onInfo && typeof onInfo !== "function") {
        throw new InvalidArgumentError$8("invalid onInfo callback");
      }
      super("UNDICI_STREAM");
    } catch (err) {
      if (util$8.isStream(body2)) {
        util$8.destroy(body2.on("error", util$8.nop), err);
      }
      throw err;
    }
    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.factory = factory;
    this.callback = callback;
    this.res = null;
    this.abort = null;
    this.context = null;
    this.trailers = null;
    this.body = body2;
    this.onInfo = onInfo || null;
    this.throwOnError = throwOnError || false;
    if (util$8.isStream(body2)) {
      body2.on("error", (err) => {
        this.onError(err);
      });
    }
    addSignal$3(this, signal);
  }
  onConnect(abort2, context) {
    if (!this.callback) {
      throw new RequestAbortedError$3();
    }
    this.abort = abort2;
    this.context = context;
  }
  onHeaders(statusCode, rawHeaders, resume2, statusMessage) {
    const { factory, opaque, context, callback, responseHeaders } = this;
    const headers2 = responseHeaders === "raw" ? util$8.parseRawHeaders(rawHeaders) : util$8.parseHeaders(rawHeaders);
    if (statusCode < 200) {
      if (this.onInfo) {
        this.onInfo({ statusCode, headers: headers2 });
      }
      return;
    }
    this.factory = null;
    let res;
    if (this.throwOnError && statusCode >= 400) {
      const parsedHeaders = responseHeaders === "raw" ? util$8.parseHeaders(rawHeaders) : headers2;
      const contentType = parsedHeaders["content-type"];
      res = new PassThrough$1();
      this.callback = null;
      this.runInAsyncScope(
        getResolveErrorBodyCallback,
        null,
        { callback, body: res, contentType, statusCode, statusMessage, headers: headers2 }
      );
    } else {
      res = this.runInAsyncScope(factory, null, {
        statusCode,
        headers: headers2,
        opaque,
        context
      });
      if (!res || typeof res.write !== "function" || typeof res.end !== "function" || typeof res.on !== "function") {
        throw new InvalidReturnValueError$1("expected Writable");
      }
      finished(res, { readable: false }, (err) => {
        const { callback: callback2, res: res2, opaque: opaque2, trailers, abort: abort2 } = this;
        this.res = null;
        if (err || !res2.readable) {
          util$8.destroy(res2, err);
        }
        this.callback = null;
        this.runInAsyncScope(callback2, null, err || null, { opaque: opaque2, trailers });
        if (err) {
          abort2();
        }
      });
    }
    res.on("drain", resume2);
    this.res = res;
    const needDrain = res.writableNeedDrain !== void 0 ? res.writableNeedDrain : res._writableState && res._writableState.needDrain;
    return needDrain !== true;
  }
  onData(chunk) {
    const { res } = this;
    return res.write(chunk);
  }
  onComplete(trailers) {
    const { res } = this;
    removeSignal$3(this);
    this.trailers = util$8.parseHeaders(trailers);
    res.end();
  }
  onError(err) {
    const { res, callback, opaque, body: body2 } = this;
    removeSignal$3(this);
    this.factory = null;
    if (res) {
      this.res = null;
      util$8.destroy(res, err);
    } else if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
    if (body2) {
      this.body = null;
      util$8.destroy(body2, err);
    }
  }
}
function stream(opts, factory, callback) {
  if (callback === void 0) {
    return new Promise((resolve, reject) => {
      stream.call(this, opts, factory, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }
  try {
    this.dispatch(opts, new StreamHandler(opts, factory, callback));
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiStream = stream;
const {
  Readable,
  Duplex,
  PassThrough
} = require$$0$3;
const {
  InvalidArgumentError: InvalidArgumentError$7,
  InvalidReturnValueError: InvalidReturnValueError2,
  RequestAbortedError: RequestAbortedError$2
} = errors$1;
const util$7 = util$j;
const { AsyncResource: AsyncResource$2 } = require$$4$2;
const { addSignal: addSignal$2, removeSignal: removeSignal$2 } = abortSignal;
const assert$1 = require$$0$1;
const kResume = Symbol("resume");
class PipelineRequest extends Readable {
  constructor() {
    super({ autoDestroy: true });
    this[kResume] = null;
  }
  _read() {
    const { [kResume]: resume2 } = this;
    if (resume2) {
      this[kResume] = null;
      resume2();
    }
  }
  _destroy(err, callback) {
    this._read();
    callback(err);
  }
}
class PipelineResponse extends Readable {
  constructor(resume2) {
    super({ autoDestroy: true });
    this[kResume] = resume2;
  }
  _read() {
    this[kResume]();
  }
  _destroy(err, callback) {
    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError$2();
    }
    callback(err);
  }
}
class PipelineHandler extends AsyncResource$2 {
  constructor(opts, handler) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$7("invalid opts");
    }
    if (typeof handler !== "function") {
      throw new InvalidArgumentError$7("invalid handler");
    }
    const { signal, method, opaque, onInfo, responseHeaders } = opts;
    if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
      throw new InvalidArgumentError$7("signal must be an EventEmitter or EventTarget");
    }
    if (method === "CONNECT") {
      throw new InvalidArgumentError$7("invalid method");
    }
    if (onInfo && typeof onInfo !== "function") {
      throw new InvalidArgumentError$7("invalid onInfo callback");
    }
    super("UNDICI_PIPELINE");
    this.opaque = opaque || null;
    this.responseHeaders = responseHeaders || null;
    this.handler = handler;
    this.abort = null;
    this.context = null;
    this.onInfo = onInfo || null;
    this.req = new PipelineRequest().on("error", util$7.nop);
    this.ret = new Duplex({
      readableObjectMode: opts.objectMode,
      autoDestroy: true,
      read: () => {
        const { body: body2 } = this;
        if (body2 && body2.resume) {
          body2.resume();
        }
      },
      write: (chunk, encoding2, callback) => {
        const { req } = this;
        if (req.push(chunk, encoding2) || req._readableState.destroyed) {
          callback();
        } else {
          req[kResume] = callback;
        }
      },
      destroy: (err, callback) => {
        const { body: body2, req, res, ret, abort: abort2 } = this;
        if (!err && !ret._readableState.endEmitted) {
          err = new RequestAbortedError$2();
        }
        if (abort2 && err) {
          abort2();
        }
        util$7.destroy(body2, err);
        util$7.destroy(req, err);
        util$7.destroy(res, err);
        removeSignal$2(this);
        callback(err);
      }
    }).on("prefinish", () => {
      const { req } = this;
      req.push(null);
    });
    this.res = null;
    addSignal$2(this, signal);
  }
  onConnect(abort2, context) {
    const { ret, res } = this;
    assert$1(!res, "pipeline cannot be retried");
    if (ret.destroyed) {
      throw new RequestAbortedError$2();
    }
    this.abort = abort2;
    this.context = context;
  }
  onHeaders(statusCode, rawHeaders, resume2) {
    const { opaque, handler, context } = this;
    if (statusCode < 200) {
      if (this.onInfo) {
        const headers2 = this.responseHeaders === "raw" ? util$7.parseRawHeaders(rawHeaders) : util$7.parseHeaders(rawHeaders);
        this.onInfo({ statusCode, headers: headers2 });
      }
      return;
    }
    this.res = new PipelineResponse(resume2);
    let body2;
    try {
      this.handler = null;
      const headers2 = this.responseHeaders === "raw" ? util$7.parseRawHeaders(rawHeaders) : util$7.parseHeaders(rawHeaders);
      body2 = this.runInAsyncScope(handler, null, {
        statusCode,
        headers: headers2,
        opaque,
        body: this.res,
        context
      });
    } catch (err) {
      this.res.on("error", util$7.nop);
      throw err;
    }
    if (!body2 || typeof body2.on !== "function") {
      throw new InvalidReturnValueError2("expected Readable");
    }
    body2.on("data", (chunk) => {
      const { ret, body: body3 } = this;
      if (!ret.push(chunk) && body3.pause) {
        body3.pause();
      }
    }).on("error", (err) => {
      const { ret } = this;
      util$7.destroy(ret, err);
    }).on("end", () => {
      const { ret } = this;
      ret.push(null);
    }).on("close", () => {
      const { ret } = this;
      if (!ret._readableState.ended) {
        util$7.destroy(ret, new RequestAbortedError$2());
      }
    });
    this.body = body2;
  }
  onData(chunk) {
    const { res } = this;
    return res.push(chunk);
  }
  onComplete(trailers) {
    const { res } = this;
    res.push(null);
  }
  onError(err) {
    const { ret } = this;
    this.handler = null;
    util$7.destroy(ret, err);
  }
}
function pipeline(opts, handler) {
  try {
    const pipelineHandler = new PipelineHandler(opts, handler);
    this.dispatch({ ...opts, body: pipelineHandler.req }, pipelineHandler);
    return pipelineHandler.ret;
  } catch (err) {
    return new PassThrough().destroy(err);
  }
}
var apiPipeline = pipeline;
const { InvalidArgumentError: InvalidArgumentError$6, RequestAbortedError: RequestAbortedError$1, SocketError: SocketError$1 } = errors$1;
const { AsyncResource: AsyncResource$1 } = require$$4$2;
const util$6 = util$j;
const { addSignal: addSignal$1, removeSignal: removeSignal$1 } = abortSignal;
const assert = require$$0$1;
class UpgradeHandler extends AsyncResource$1 {
  constructor(opts, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$6("invalid opts");
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$6("invalid callback");
    }
    const { signal, opaque, responseHeaders } = opts;
    if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
      throw new InvalidArgumentError$6("signal must be an EventEmitter or EventTarget");
    }
    super("UNDICI_UPGRADE");
    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.callback = callback;
    this.abort = null;
    this.context = null;
    addSignal$1(this, signal);
  }
  onConnect(abort2, context) {
    if (!this.callback) {
      throw new RequestAbortedError$1();
    }
    this.abort = abort2;
    this.context = null;
  }
  onHeaders() {
    throw new SocketError$1("bad upgrade", null);
  }
  onUpgrade(statusCode, rawHeaders, socket) {
    const { callback, opaque, context } = this;
    assert.strictEqual(statusCode, 101);
    removeSignal$1(this);
    this.callback = null;
    const headers2 = this.responseHeaders === "raw" ? util$6.parseRawHeaders(rawHeaders) : util$6.parseHeaders(rawHeaders);
    this.runInAsyncScope(callback, null, null, {
      headers: headers2,
      socket,
      opaque,
      context
    });
  }
  onError(err) {
    const { callback, opaque } = this;
    removeSignal$1(this);
    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
  }
}
function upgrade(opts, callback) {
  if (callback === void 0) {
    return new Promise((resolve, reject) => {
      upgrade.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }
  try {
    const upgradeHandler = new UpgradeHandler(opts, callback);
    this.dispatch({
      ...opts,
      method: opts.method || "GET",
      upgrade: opts.protocol || "Websocket"
    }, upgradeHandler);
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiUpgrade = upgrade;
const { InvalidArgumentError: InvalidArgumentError$5, RequestAbortedError: RequestAbortedError2, SocketError: SocketError2 } = errors$1;
const { AsyncResource } = require$$4$2;
const util$5 = util$j;
const { addSignal, removeSignal } = abortSignal;
class ConnectHandler extends AsyncResource {
  constructor(opts, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$5("invalid opts");
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$5("invalid callback");
    }
    const { signal, opaque, responseHeaders } = opts;
    if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
      throw new InvalidArgumentError$5("signal must be an EventEmitter or EventTarget");
    }
    super("UNDICI_CONNECT");
    this.opaque = opaque || null;
    this.responseHeaders = responseHeaders || null;
    this.callback = callback;
    this.abort = null;
    addSignal(this, signal);
  }
  onConnect(abort2, context) {
    if (!this.callback) {
      throw new RequestAbortedError2();
    }
    this.abort = abort2;
    this.context = context;
  }
  onHeaders() {
    throw new SocketError2("bad connect", null);
  }
  onUpgrade(statusCode, rawHeaders, socket) {
    const { callback, opaque, context } = this;
    removeSignal(this);
    this.callback = null;
    const headers2 = this.responseHeaders === "raw" ? util$5.parseRawHeaders(rawHeaders) : util$5.parseHeaders(rawHeaders);
    this.runInAsyncScope(callback, null, null, {
      statusCode,
      headers: headers2,
      socket,
      opaque,
      context
    });
  }
  onError(err) {
    const { callback, opaque } = this;
    removeSignal(this);
    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
  }
}
function connect(opts, callback) {
  if (callback === void 0) {
    return new Promise((resolve, reject) => {
      connect.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }
  try {
    const connectHandler = new ConnectHandler(opts, callback);
    this.dispatch({ ...opts, method: "CONNECT" }, connectHandler);
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiConnect = connect;
api$1.request = apiRequest;
api$1.stream = apiStream;
api$1.pipeline = apiPipeline;
api$1.upgrade = apiUpgrade;
api$1.connect = apiConnect;
const { UndiciError: UndiciError2 } = errors$1;
let MockNotMatchedError$1 = class MockNotMatchedError extends UndiciError2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, MockNotMatchedError);
    this.name = "MockNotMatchedError";
    this.message = message || "The request does not match any registered mock dispatches";
    this.code = "UND_MOCK_ERR_MOCK_NOT_MATCHED";
  }
};
var mockErrors = {
  MockNotMatchedError: MockNotMatchedError$1
};
var mockSymbols = {
  kAgent: Symbol("agent"),
  kOptions: Symbol("options"),
  kFactory: Symbol("factory"),
  kDispatches: Symbol("dispatches"),
  kDispatchKey: Symbol("dispatch key"),
  kDefaultHeaders: Symbol("default headers"),
  kDefaultTrailers: Symbol("default trailers"),
  kContentLength: Symbol("content length"),
  kMockAgent: Symbol("mock agent"),
  kMockAgentSet: Symbol("mock agent set"),
  kMockAgentGet: Symbol("mock agent get"),
  kMockDispatch: Symbol("mock dispatch"),
  kClose: Symbol("close"),
  kOriginalClose: Symbol("original agent close"),
  kOrigin: Symbol("origin"),
  kIsMockActive: Symbol("is mock active"),
  kNetConnect: Symbol("net connect"),
  kGetNetConnect: Symbol("get net connect"),
  kConnected: Symbol("connected")
};
const { MockNotMatchedError: MockNotMatchedError2 } = mockErrors;
const {
  kDispatches: kDispatches$3,
  kMockAgent: kMockAgent$2,
  kOriginalDispatch: kOriginalDispatch$2,
  kOrigin: kOrigin$2,
  kGetNetConnect
} = mockSymbols;
const { buildURL: buildURL$1, nop } = util$j;
const { STATUS_CODES } = require$$0$2;
const {
  types: {
    isPromise
  }
} = require$$0$4;
function matchValue(match, value) {
  if (typeof match === "string") {
    return match === value;
  }
  if (match instanceof RegExp) {
    return match.test(value);
  }
  if (typeof match === "function") {
    return match(value) === true;
  }
  return false;
}
function lowerCaseEntries(headers2) {
  return Object.fromEntries(
    Object.entries(headers2).map(([headerName, headerValue]) => {
      return [headerName.toLocaleLowerCase(), headerValue];
    })
  );
}
function getHeaderByName(headers2, key) {
  if (Array.isArray(headers2)) {
    for (let i = 0; i < headers2.length; i += 2) {
      if (headers2[i].toLocaleLowerCase() === key.toLocaleLowerCase()) {
        return headers2[i + 1];
      }
    }
    return void 0;
  } else if (typeof headers2.get === "function") {
    return headers2.get(key);
  } else {
    return lowerCaseEntries(headers2)[key.toLocaleLowerCase()];
  }
}
function buildHeadersFromArray(headers2) {
  const clone = headers2.slice();
  const entries = [];
  for (let index = 0; index < clone.length; index += 2) {
    entries.push([clone[index], clone[index + 1]]);
  }
  return Object.fromEntries(entries);
}
function matchHeaders(mockDispatch2, headers2) {
  if (typeof mockDispatch2.headers === "function") {
    if (Array.isArray(headers2)) {
      headers2 = buildHeadersFromArray(headers2);
    }
    return mockDispatch2.headers(headers2 ? lowerCaseEntries(headers2) : {});
  }
  if (typeof mockDispatch2.headers === "undefined") {
    return true;
  }
  if (typeof headers2 !== "object" || typeof mockDispatch2.headers !== "object") {
    return false;
  }
  for (const [matchHeaderName, matchHeaderValue] of Object.entries(mockDispatch2.headers)) {
    const headerValue = getHeaderByName(headers2, matchHeaderName);
    if (!matchValue(matchHeaderValue, headerValue)) {
      return false;
    }
  }
  return true;
}
function safeUrl(path) {
  if (typeof path !== "string") {
    return path;
  }
  const pathSegments = path.split("?");
  if (pathSegments.length !== 2) {
    return path;
  }
  const qp = new URLSearchParams(pathSegments.pop());
  qp.sort();
  return [...pathSegments, qp.toString()].join("?");
}
function matchKey(mockDispatch2, { path, method, body: body2, headers: headers2 }) {
  const pathMatch = matchValue(mockDispatch2.path, path);
  const methodMatch = matchValue(mockDispatch2.method, method);
  const bodyMatch = typeof mockDispatch2.body !== "undefined" ? matchValue(mockDispatch2.body, body2) : true;
  const headersMatch = matchHeaders(mockDispatch2, headers2);
  return pathMatch && methodMatch && bodyMatch && headersMatch;
}
function getResponseData$1(data) {
  if (Buffer.isBuffer(data)) {
    return data;
  } else if (typeof data === "object") {
    return JSON.stringify(data);
  } else {
    return data.toString();
  }
}
function getMockDispatch(mockDispatches, key) {
  const basePath = key.query ? buildURL$1(key.path, key.query) : key.path;
  const resolvedPath = typeof basePath === "string" ? safeUrl(basePath) : basePath;
  let matchedMockDispatches = mockDispatches.filter(({ consumed }) => !consumed).filter(({ path }) => matchValue(safeUrl(path), resolvedPath));
  if (matchedMockDispatches.length === 0) {
    throw new MockNotMatchedError2(`Mock dispatch not matched for path '${resolvedPath}'`);
  }
  matchedMockDispatches = matchedMockDispatches.filter(({ method }) => matchValue(method, key.method));
  if (matchedMockDispatches.length === 0) {
    throw new MockNotMatchedError2(`Mock dispatch not matched for method '${key.method}'`);
  }
  matchedMockDispatches = matchedMockDispatches.filter(({ body: body2 }) => typeof body2 !== "undefined" ? matchValue(body2, key.body) : true);
  if (matchedMockDispatches.length === 0) {
    throw new MockNotMatchedError2(`Mock dispatch not matched for body '${key.body}'`);
  }
  matchedMockDispatches = matchedMockDispatches.filter((mockDispatch2) => matchHeaders(mockDispatch2, key.headers));
  if (matchedMockDispatches.length === 0) {
    throw new MockNotMatchedError2(`Mock dispatch not matched for headers '${typeof key.headers === "object" ? JSON.stringify(key.headers) : key.headers}'`);
  }
  return matchedMockDispatches[0];
}
function addMockDispatch$1(mockDispatches, key, data) {
  const baseData = { timesInvoked: 0, times: 1, persist: false, consumed: false };
  const replyData = typeof data === "function" ? { callback: data } : { ...data };
  const newMockDispatch = { ...baseData, ...key, pending: true, data: { error: null, ...replyData } };
  mockDispatches.push(newMockDispatch);
  return newMockDispatch;
}
function deleteMockDispatch(mockDispatches, key) {
  const index = mockDispatches.findIndex((dispatch) => {
    if (!dispatch.consumed) {
      return false;
    }
    return matchKey(dispatch, key);
  });
  if (index !== -1) {
    mockDispatches.splice(index, 1);
  }
}
function buildKey$1(opts) {
  const { path, method, body: body2, headers: headers2, query } = opts;
  return {
    path,
    method,
    body: body2,
    headers: headers2,
    query
  };
}
function generateKeyValues(data) {
  return Object.entries(data).reduce((keyValuePairs, [key, value]) => [
    ...keyValuePairs,
    Buffer.from(`${key}`),
    Array.isArray(value) ? value.map((x) => Buffer.from(`${x}`)) : Buffer.from(`${value}`)
  ], []);
}
function getStatusText(statusCode) {
  return STATUS_CODES[statusCode] || "unknown";
}
async function getResponse(body2) {
  const buffers = [];
  for await (const data of body2) {
    buffers.push(data);
  }
  return Buffer.concat(buffers).toString("utf8");
}
function mockDispatch(opts, handler) {
  const key = buildKey$1(opts);
  const mockDispatch2 = getMockDispatch(this[kDispatches$3], key);
  mockDispatch2.timesInvoked++;
  if (mockDispatch2.data.callback) {
    mockDispatch2.data = { ...mockDispatch2.data, ...mockDispatch2.data.callback(opts) };
  }
  const { data: { statusCode, data, headers: headers2, trailers, error }, delay, persist } = mockDispatch2;
  const { timesInvoked, times } = mockDispatch2;
  mockDispatch2.consumed = !persist && timesInvoked >= times;
  mockDispatch2.pending = timesInvoked < times;
  if (error !== null) {
    deleteMockDispatch(this[kDispatches$3], key);
    handler.onError(error);
    return true;
  }
  if (typeof delay === "number" && delay > 0) {
    setTimeout(() => {
      handleReply(this[kDispatches$3]);
    }, delay);
  } else {
    handleReply(this[kDispatches$3]);
  }
  function handleReply(mockDispatches, _data = data) {
    const optsHeaders = Array.isArray(opts.headers) ? buildHeadersFromArray(opts.headers) : opts.headers;
    const body2 = typeof _data === "function" ? _data({ ...opts, headers: optsHeaders }) : _data;
    if (isPromise(body2)) {
      body2.then((newData) => handleReply(mockDispatches, newData));
      return;
    }
    const responseData = getResponseData$1(body2);
    const responseHeaders = generateKeyValues(headers2);
    const responseTrailers = generateKeyValues(trailers);
    handler.abort = nop;
    handler.onHeaders(statusCode, responseHeaders, resume2, getStatusText(statusCode));
    handler.onData(Buffer.from(responseData));
    handler.onComplete(responseTrailers);
    deleteMockDispatch(mockDispatches, key);
  }
  function resume2() {
  }
  return true;
}
function buildMockDispatch$2() {
  const agent2 = this[kMockAgent$2];
  const origin = this[kOrigin$2];
  const originalDispatch = this[kOriginalDispatch$2];
  return function dispatch(opts, handler) {
    if (agent2.isMockActive) {
      try {
        mockDispatch.call(this, opts, handler);
      } catch (error) {
        if (error instanceof MockNotMatchedError2) {
          const netConnect = agent2[kGetNetConnect]();
          if (netConnect === false) {
            throw new MockNotMatchedError2(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect disabled)`);
          }
          if (checkNetConnect(netConnect, origin)) {
            originalDispatch.call(this, opts, handler);
          } else {
            throw new MockNotMatchedError2(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect is not enabled for this origin)`);
          }
        } else {
          throw error;
        }
      }
    } else {
      originalDispatch.call(this, opts, handler);
    }
  };
}
function checkNetConnect(netConnect, origin) {
  const url2 = new URL(origin);
  if (netConnect === true) {
    return true;
  } else if (Array.isArray(netConnect) && netConnect.some((matcher) => matchValue(matcher, url2.host))) {
    return true;
  }
  return false;
}
function buildMockOptions(opts) {
  if (opts) {
    const { agent: agent2, ...mockOptions } = opts;
    return mockOptions;
  }
}
var mockUtils = {
  getResponseData: getResponseData$1,
  getMockDispatch,
  addMockDispatch: addMockDispatch$1,
  deleteMockDispatch,
  buildKey: buildKey$1,
  generateKeyValues,
  matchValue,
  getResponse,
  getStatusText,
  mockDispatch,
  buildMockDispatch: buildMockDispatch$2,
  checkNetConnect,
  buildMockOptions,
  getHeaderByName
};
var mockInterceptor = {};
const { getResponseData, buildKey, addMockDispatch } = mockUtils;
const {
  kDispatches: kDispatches$2,
  kDispatchKey,
  kDefaultHeaders,
  kDefaultTrailers,
  kContentLength,
  kMockDispatch
} = mockSymbols;
const { InvalidArgumentError: InvalidArgumentError$4 } = errors$1;
const { buildURL } = util$j;
class MockScope {
  constructor(mockDispatch2) {
    this[kMockDispatch] = mockDispatch2;
  }
  /**
   * Delay a reply by a set amount in ms.
   */
  delay(waitInMs) {
    if (typeof waitInMs !== "number" || !Number.isInteger(waitInMs) || waitInMs <= 0) {
      throw new InvalidArgumentError$4("waitInMs must be a valid integer > 0");
    }
    this[kMockDispatch].delay = waitInMs;
    return this;
  }
  /**
   * For a defined reply, never mark as consumed.
   */
  persist() {
    this[kMockDispatch].persist = true;
    return this;
  }
  /**
   * Allow one to define a reply for a set amount of matching requests.
   */
  times(repeatTimes) {
    if (typeof repeatTimes !== "number" || !Number.isInteger(repeatTimes) || repeatTimes <= 0) {
      throw new InvalidArgumentError$4("repeatTimes must be a valid integer > 0");
    }
    this[kMockDispatch].times = repeatTimes;
    return this;
  }
}
let MockInterceptor$2 = class MockInterceptor {
  constructor(opts, mockDispatches) {
    if (typeof opts !== "object") {
      throw new InvalidArgumentError$4("opts must be an object");
    }
    if (typeof opts.path === "undefined") {
      throw new InvalidArgumentError$4("opts.path must be defined");
    }
    if (typeof opts.method === "undefined") {
      opts.method = "GET";
    }
    if (typeof opts.path === "string") {
      if (opts.query) {
        opts.path = buildURL(opts.path, opts.query);
      } else {
        const parsedURL = new URL(opts.path, "data://");
        opts.path = parsedURL.pathname + parsedURL.search;
      }
    }
    if (typeof opts.method === "string") {
      opts.method = opts.method.toUpperCase();
    }
    this[kDispatchKey] = buildKey(opts);
    this[kDispatches$2] = mockDispatches;
    this[kDefaultHeaders] = {};
    this[kDefaultTrailers] = {};
    this[kContentLength] = false;
  }
  createMockScopeDispatchData(statusCode, data, responseOptions = {}) {
    const responseData = getResponseData(data);
    const contentLength = this[kContentLength] ? { "content-length": responseData.length } : {};
    const headers2 = { ...this[kDefaultHeaders], ...contentLength, ...responseOptions.headers };
    const trailers = { ...this[kDefaultTrailers], ...responseOptions.trailers };
    return { statusCode, data, headers: headers2, trailers };
  }
  validateReplyParameters(statusCode, data, responseOptions) {
    if (typeof statusCode === "undefined") {
      throw new InvalidArgumentError$4("statusCode must be defined");
    }
    if (typeof data === "undefined") {
      throw new InvalidArgumentError$4("data must be defined");
    }
    if (typeof responseOptions !== "object") {
      throw new InvalidArgumentError$4("responseOptions must be an object");
    }
  }
  /**
   * Mock an undici request with a defined reply.
   */
  reply(replyData) {
    if (typeof replyData === "function") {
      const wrappedDefaultsCallback = (opts) => {
        const resolvedData = replyData(opts);
        if (typeof resolvedData !== "object") {
          throw new InvalidArgumentError$4("reply options callback must return an object");
        }
        const { statusCode: statusCode2, data: data2 = "", responseOptions: responseOptions2 = {} } = resolvedData;
        this.validateReplyParameters(statusCode2, data2, responseOptions2);
        return {
          ...this.createMockScopeDispatchData(statusCode2, data2, responseOptions2)
        };
      };
      const newMockDispatch2 = addMockDispatch(this[kDispatches$2], this[kDispatchKey], wrappedDefaultsCallback);
      return new MockScope(newMockDispatch2);
    }
    const [statusCode, data = "", responseOptions = {}] = [...arguments];
    this.validateReplyParameters(statusCode, data, responseOptions);
    const dispatchData = this.createMockScopeDispatchData(statusCode, data, responseOptions);
    const newMockDispatch = addMockDispatch(this[kDispatches$2], this[kDispatchKey], dispatchData);
    return new MockScope(newMockDispatch);
  }
  /**
   * Mock an undici request with a defined error.
   */
  replyWithError(error) {
    if (typeof error === "undefined") {
      throw new InvalidArgumentError$4("error must be defined");
    }
    const newMockDispatch = addMockDispatch(this[kDispatches$2], this[kDispatchKey], { error });
    return new MockScope(newMockDispatch);
  }
  /**
   * Set default reply headers on the interceptor for subsequent replies
   */
  defaultReplyHeaders(headers2) {
    if (typeof headers2 === "undefined") {
      throw new InvalidArgumentError$4("headers must be defined");
    }
    this[kDefaultHeaders] = headers2;
    return this;
  }
  /**
   * Set default reply trailers on the interceptor for subsequent replies
   */
  defaultReplyTrailers(trailers) {
    if (typeof trailers === "undefined") {
      throw new InvalidArgumentError$4("trailers must be defined");
    }
    this[kDefaultTrailers] = trailers;
    return this;
  }
  /**
   * Set reply content length header for replies on the interceptor
   */
  replyContentLength() {
    this[kContentLength] = true;
    return this;
  }
};
mockInterceptor.MockInterceptor = MockInterceptor$2;
mockInterceptor.MockScope = MockScope;
const { promisify: promisify$1 } = require$$0$4;
const Client2 = client;
const { buildMockDispatch: buildMockDispatch$1 } = mockUtils;
const {
  kDispatches: kDispatches$1,
  kMockAgent: kMockAgent$1,
  kClose: kClose$1,
  kOriginalClose: kOriginalClose$1,
  kOrigin: kOrigin$1,
  kOriginalDispatch: kOriginalDispatch$1,
  kConnected: kConnected$1
} = mockSymbols;
const { MockInterceptor: MockInterceptor$1 } = mockInterceptor;
const Symbols$1 = symbols$4;
const { InvalidArgumentError: InvalidArgumentError$3 } = errors$1;
class MockClient extends Client2 {
  constructor(origin, opts) {
    super(origin, opts);
    if (!opts || !opts.agent || typeof opts.agent.dispatch !== "function") {
      throw new InvalidArgumentError$3("Argument opts.agent must implement Agent");
    }
    this[kMockAgent$1] = opts.agent;
    this[kOrigin$1] = origin;
    this[kDispatches$1] = [];
    this[kConnected$1] = 1;
    this[kOriginalDispatch$1] = this.dispatch;
    this[kOriginalClose$1] = this.close.bind(this);
    this.dispatch = buildMockDispatch$1.call(this);
    this.close = this[kClose$1];
  }
  get [Symbols$1.kConnected]() {
    return this[kConnected$1];
  }
  /**
   * Sets up the base interceptor for mocking replies from undici.
   */
  intercept(opts) {
    return new MockInterceptor$1(opts, this[kDispatches$1]);
  }
  async [kClose$1]() {
    await promisify$1(this[kOriginalClose$1])();
    this[kConnected$1] = 0;
    this[kMockAgent$1][Symbols$1.kClients].delete(this[kOrigin$1]);
  }
}
const { promisify } = require$$0$4;
const Pool2 = pool;
const { buildMockDispatch } = mockUtils;
const {
  kDispatches,
  kMockAgent,
  kClose,
  kOriginalClose,
  kOrigin,
  kOriginalDispatch,
  kConnected
} = mockSymbols;
const { MockInterceptor: MockInterceptor2 } = mockInterceptor;
const Symbols = symbols$4;
const { InvalidArgumentError: InvalidArgumentError$2 } = errors$1;
class MockPool extends Pool2 {
  constructor(origin, opts) {
    super(origin, opts);
    if (!opts || !opts.agent || typeof opts.agent.dispatch !== "function") {
      throw new InvalidArgumentError$2("Argument opts.agent must implement Agent");
    }
    this[kMockAgent] = opts.agent;
    this[kOrigin] = origin;
    this[kDispatches] = [];
    this[kConnected] = 1;
    this[kOriginalDispatch] = this.dispatch;
    this[kOriginalClose] = this.close.bind(this);
    this.dispatch = buildMockDispatch.call(this);
    this.close = this[kClose];
  }
  get [Symbols.kConnected]() {
    return this[kConnected];
  }
  /**
   * Sets up the base interceptor for mocking replies from undici.
   */
  intercept(opts) {
    return new MockInterceptor2(opts, this[kDispatches]);
  }
  async [kClose]() {
    await promisify(this[kOriginalClose])();
    this[kConnected] = 0;
    this[kMockAgent][Symbols.kClients].delete(this[kOrigin]);
  }
}
const globalDispatcher = Symbol.for("undici.globalDispatcher.1");
const { InvalidArgumentError: InvalidArgumentError$1 } = errors$1;
const Agent2 = agent;
if (getGlobalDispatcher$1() === void 0) {
  setGlobalDispatcher$1(new Agent2());
}
function setGlobalDispatcher$1(agent2) {
  if (!agent2 || typeof agent2.dispatch !== "function") {
    throw new InvalidArgumentError$1("Argument agent must implement Agent");
  }
  Object.defineProperty(globalThis, globalDispatcher, {
    value: agent2,
    writable: true,
    enumerable: false,
    configurable: false
  });
}
function getGlobalDispatcher$1() {
  return globalThis[globalDispatcher];
}
var global$1 = {
  setGlobalDispatcher: setGlobalDispatcher$1,
  getGlobalDispatcher: getGlobalDispatcher$1
};
var headers;
var hasRequiredHeaders;
function requireHeaders() {
  if (hasRequiredHeaders)
    return headers;
  hasRequiredHeaders = 1;
  const { kHeadersList } = symbols$4;
  const { kGuard } = requireSymbols$3();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$j;
  const {
    makeIterator,
    isValidHeaderName,
    isValidHeaderValue
  } = requireUtil$4();
  const { webidl } = requireWebidl();
  const assert2 = require$$0$1;
  const kHeadersMap = Symbol("headers map");
  const kHeadersSortedMap = Symbol("headers map sorted");
  function headerValueNormalize(potentialValue) {
    let i = potentialValue.length;
    while (/[\r\n\t ]/.test(potentialValue.charAt(--i)))
      ;
    return potentialValue.slice(0, i + 1).replace(/^[\r\n\t ]+/, "");
  }
  function fill(headers2, object) {
    if (Array.isArray(object)) {
      for (const header of object) {
        if (header.length !== 2) {
          throw webidl.errors.exception({
            header: "Headers constructor",
            message: `expected name/value pair to be length 2, found ${header.length}.`
          });
        }
        headers2.append(header[0], header[1]);
      }
    } else if (typeof object === "object" && object !== null) {
      for (const [key, value] of Object.entries(object)) {
        headers2.append(key, value);
      }
    } else {
      throw webidl.errors.conversionFailed({
        prefix: "Headers constructor",
        argument: "Argument 1",
        types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
      });
    }
  }
  class HeadersList {
    constructor(init) {
      /** @type {[string, string][]|null} */
      __publicField(this, "cookies", null);
      if (init instanceof HeadersList) {
        this[kHeadersMap] = new Map(init[kHeadersMap]);
        this[kHeadersSortedMap] = init[kHeadersSortedMap];
        this.cookies = init.cookies;
      } else {
        this[kHeadersMap] = new Map(init);
        this[kHeadersSortedMap] = null;
      }
    }
    // https://fetch.spec.whatwg.org/#header-list-contains
    contains(name) {
      name = name.toLowerCase();
      return this[kHeadersMap].has(name);
    }
    clear() {
      this[kHeadersMap].clear();
      this[kHeadersSortedMap] = null;
      this.cookies = null;
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-append
    append(name, value) {
      this[kHeadersSortedMap] = null;
      const lowercaseName = name.toLowerCase();
      const exists = this[kHeadersMap].get(lowercaseName);
      if (exists) {
        const delimiter = lowercaseName === "cookie" ? "; " : ", ";
        this[kHeadersMap].set(lowercaseName, {
          name: exists.name,
          value: `${exists.value}${delimiter}${value}`
        });
      } else {
        this[kHeadersMap].set(lowercaseName, { name, value });
      }
      if (lowercaseName === "set-cookie") {
        this.cookies ?? (this.cookies = []);
        this.cookies.push(value);
      }
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-set
    set(name, value) {
      this[kHeadersSortedMap] = null;
      const lowercaseName = name.toLowerCase();
      if (lowercaseName === "set-cookie") {
        this.cookies = [value];
      }
      return this[kHeadersMap].set(lowercaseName, { name, value });
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-delete
    delete(name) {
      this[kHeadersSortedMap] = null;
      name = name.toLowerCase();
      if (name === "set-cookie") {
        this.cookies = null;
      }
      return this[kHeadersMap].delete(name);
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-get
    get(name) {
      var _a2;
      if (!this.contains(name)) {
        return null;
      }
      return ((_a2 = this[kHeadersMap].get(name.toLowerCase())) == null ? void 0 : _a2.value) ?? null;
    }
    *[Symbol.iterator]() {
      for (const [name, { value }] of this[kHeadersMap]) {
        yield [name, value];
      }
    }
    get entries() {
      const headers2 = {};
      if (this[kHeadersMap].size) {
        for (const { name, value } of this[kHeadersMap].values()) {
          headers2[name] = value;
        }
      }
      return headers2;
    }
  }
  class Headers2 {
    constructor(init = void 0) {
      this[kHeadersList] = new HeadersList();
      this[kGuard] = "none";
      if (init !== void 0) {
        init = webidl.converters.HeadersInit(init);
        fill(this, init);
      }
    }
    // https://fetch.spec.whatwg.org/#dom-headers-append
    append(name, value) {
      webidl.brandCheck(this, Headers2);
      webidl.argumentLengthCheck(arguments, 2, { header: "Headers.append" });
      name = webidl.converters.ByteString(name);
      value = webidl.converters.ByteString(value);
      value = headerValueNormalize(value);
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.append",
          value: name,
          type: "header name"
        });
      } else if (!isValidHeaderValue(value)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.append",
          value,
          type: "header value"
        });
      }
      if (this[kGuard] === "immutable") {
        throw new TypeError("immutable");
      } else if (this[kGuard] === "request-no-cors")
        ;
      return this[kHeadersList].append(name, value);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-delete
    delete(name) {
      webidl.brandCheck(this, Headers2);
      webidl.argumentLengthCheck(arguments, 1, { header: "Headers.delete" });
      name = webidl.converters.ByteString(name);
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.delete",
          value: name,
          type: "header name"
        });
      }
      if (this[kGuard] === "immutable") {
        throw new TypeError("immutable");
      } else if (this[kGuard] === "request-no-cors")
        ;
      if (!this[kHeadersList].contains(name)) {
        return;
      }
      return this[kHeadersList].delete(name);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-get
    get(name) {
      webidl.brandCheck(this, Headers2);
      webidl.argumentLengthCheck(arguments, 1, { header: "Headers.get" });
      name = webidl.converters.ByteString(name);
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.get",
          value: name,
          type: "header name"
        });
      }
      return this[kHeadersList].get(name);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-has
    has(name) {
      webidl.brandCheck(this, Headers2);
      webidl.argumentLengthCheck(arguments, 1, { header: "Headers.has" });
      name = webidl.converters.ByteString(name);
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.has",
          value: name,
          type: "header name"
        });
      }
      return this[kHeadersList].contains(name);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-set
    set(name, value) {
      webidl.brandCheck(this, Headers2);
      webidl.argumentLengthCheck(arguments, 2, { header: "Headers.set" });
      name = webidl.converters.ByteString(name);
      value = webidl.converters.ByteString(value);
      value = headerValueNormalize(value);
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.set",
          value: name,
          type: "header name"
        });
      } else if (!isValidHeaderValue(value)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.set",
          value,
          type: "header value"
        });
      }
      if (this[kGuard] === "immutable") {
        throw new TypeError("immutable");
      } else if (this[kGuard] === "request-no-cors")
        ;
      return this[kHeadersList].set(name, value);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-getsetcookie
    getSetCookie() {
      webidl.brandCheck(this, Headers2);
      const list = this[kHeadersList].cookies;
      if (list) {
        return [...list];
      }
      return [];
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-sort-and-combine
    get [kHeadersSortedMap]() {
      if (this[kHeadersList][kHeadersSortedMap]) {
        return this[kHeadersList][kHeadersSortedMap];
      }
      const headers2 = [];
      const names = [...this[kHeadersList]].sort((a, b) => a[0] < b[0] ? -1 : 1);
      const cookies2 = this[kHeadersList].cookies;
      for (const [name, value] of names) {
        if (name === "set-cookie") {
          for (const value2 of cookies2) {
            headers2.push([name, value2]);
          }
        } else {
          assert2(value !== null);
          headers2.push([name, value]);
        }
      }
      this[kHeadersList][kHeadersSortedMap] = headers2;
      return headers2;
    }
    keys() {
      webidl.brandCheck(this, Headers2);
      return makeIterator(
        () => [...this[kHeadersSortedMap].values()],
        "Headers",
        "key"
      );
    }
    values() {
      webidl.brandCheck(this, Headers2);
      return makeIterator(
        () => [...this[kHeadersSortedMap].values()],
        "Headers",
        "value"
      );
    }
    entries() {
      webidl.brandCheck(this, Headers2);
      return makeIterator(
        () => [...this[kHeadersSortedMap].values()],
        "Headers",
        "key+value"
      );
    }
    /**
     * @param {(value: string, key: string, self: Headers) => void} callbackFn
     * @param {unknown} thisArg
     */
    forEach(callbackFn, thisArg = globalThis) {
      webidl.brandCheck(this, Headers2);
      webidl.argumentLengthCheck(arguments, 1, { header: "Headers.forEach" });
      if (typeof callbackFn !== "function") {
        throw new TypeError(
          "Failed to execute 'forEach' on 'Headers': parameter 1 is not of type 'Function'."
        );
      }
      for (const [key, value] of this) {
        callbackFn.apply(thisArg, [value, key, this]);
      }
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
      webidl.brandCheck(this, Headers2);
      return this[kHeadersList];
    }
  }
  Headers2.prototype[Symbol.iterator] = Headers2.prototype.entries;
  Object.defineProperties(Headers2.prototype, {
    append: kEnumerableProperty2,
    delete: kEnumerableProperty2,
    get: kEnumerableProperty2,
    has: kEnumerableProperty2,
    set: kEnumerableProperty2,
    getSetCookie: kEnumerableProperty2,
    keys: kEnumerableProperty2,
    values: kEnumerableProperty2,
    entries: kEnumerableProperty2,
    forEach: kEnumerableProperty2,
    [Symbol.iterator]: { enumerable: false },
    [Symbol.toStringTag]: {
      value: "Headers",
      configurable: true
    }
  });
  webidl.converters.HeadersInit = function(V) {
    if (webidl.util.Type(V) === "Object") {
      if (V[Symbol.iterator]) {
        return webidl.converters["sequence<sequence<ByteString>>"](V);
      }
      return webidl.converters["record<ByteString, ByteString>"](V);
    }
    throw webidl.errors.conversionFailed({
      prefix: "Headers constructor",
      argument: "Argument 1",
      types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
    });
  };
  headers = {
    fill,
    Headers: Headers2,
    HeadersList
  };
  return headers;
}
var response$1;
var hasRequiredResponse;
function requireResponse() {
  if (hasRequiredResponse)
    return response$1;
  hasRequiredResponse = 1;
  const { Headers: Headers2, HeadersList, fill } = requireHeaders();
  const { extractBody: extractBody2, cloneBody, mixinBody } = requireBody();
  const util2 = util$j;
  const { kEnumerableProperty: kEnumerableProperty2 } = util2;
  const {
    isValidReasonPhrase,
    isCancelled,
    isAborted,
    isBlobLike: isBlobLike2,
    serializeJavascriptValueToJSONString,
    isErrorLike,
    isomorphicEncode
  } = requireUtil$4();
  const {
    redirectStatus,
    nullBodyStatus,
    DOMException: DOMException2
  } = requireConstants$3();
  const { kState, kHeaders, kGuard, kRealm } = requireSymbols$3();
  const { webidl } = requireWebidl();
  const { FormData: FormData2 } = requireFormdata();
  const { getGlobalOrigin } = requireGlobal();
  const { URLSerializer } = requireDataURL();
  const { kHeadersList } = symbols$4;
  const assert2 = require$$0$1;
  const { types } = require$$0$4;
  const ReadableStream2 = globalThis.ReadableStream || require$$13.ReadableStream;
  class Response2 {
    // Creates network error Response.
    static error() {
      const relevantRealm = { settingsObject: {} };
      const responseObject = new Response2();
      responseObject[kState] = makeNetworkError();
      responseObject[kRealm] = relevantRealm;
      responseObject[kHeaders][kHeadersList] = responseObject[kState].headersList;
      responseObject[kHeaders][kGuard] = "immutable";
      responseObject[kHeaders][kRealm] = relevantRealm;
      return responseObject;
    }
    // https://fetch.spec.whatwg.org/#dom-response-json
    static json(data = void 0, init = {}) {
      webidl.argumentLengthCheck(arguments, 1, { header: "Response.json" });
      if (init !== null) {
        init = webidl.converters.ResponseInit(init);
      }
      const bytes = new TextEncoder("utf-8").encode(
        serializeJavascriptValueToJSONString(data)
      );
      const body2 = extractBody2(bytes);
      const relevantRealm = { settingsObject: {} };
      const responseObject = new Response2();
      responseObject[kRealm] = relevantRealm;
      responseObject[kHeaders][kGuard] = "response";
      responseObject[kHeaders][kRealm] = relevantRealm;
      initializeResponse(responseObject, init, { body: body2[0], type: "application/json" });
      return responseObject;
    }
    // Creates a redirect Response that redirects to url with status status.
    static redirect(url2, status = 302) {
      const relevantRealm = { settingsObject: {} };
      webidl.argumentLengthCheck(arguments, 1, { header: "Response.redirect" });
      url2 = webidl.converters.USVString(url2);
      status = webidl.converters["unsigned short"](status);
      let parsedURL;
      try {
        parsedURL = new URL(url2, getGlobalOrigin());
      } catch (err) {
        throw Object.assign(new TypeError("Failed to parse URL from " + url2), {
          cause: err
        });
      }
      if (!redirectStatus.includes(status)) {
        throw new RangeError("Invalid status code " + status);
      }
      const responseObject = new Response2();
      responseObject[kRealm] = relevantRealm;
      responseObject[kHeaders][kGuard] = "immutable";
      responseObject[kHeaders][kRealm] = relevantRealm;
      responseObject[kState].status = status;
      const value = isomorphicEncode(URLSerializer(parsedURL));
      responseObject[kState].headersList.append("location", value);
      return responseObject;
    }
    // https://fetch.spec.whatwg.org/#dom-response
    constructor(body2 = null, init = {}) {
      if (body2 !== null) {
        body2 = webidl.converters.BodyInit(body2);
      }
      init = webidl.converters.ResponseInit(init);
      this[kRealm] = { settingsObject: {} };
      this[kState] = makeResponse({});
      this[kHeaders] = new Headers2();
      this[kHeaders][kGuard] = "response";
      this[kHeaders][kHeadersList] = this[kState].headersList;
      this[kHeaders][kRealm] = this[kRealm];
      let bodyWithType = null;
      if (body2 != null) {
        const [extractedBody, type] = extractBody2(body2);
        bodyWithType = { body: extractedBody, type };
      }
      initializeResponse(this, init, bodyWithType);
    }
    // Returns response’s type, e.g., "cors".
    get type() {
      webidl.brandCheck(this, Response2);
      return this[kState].type;
    }
    // Returns response’s URL, if it has one; otherwise the empty string.
    get url() {
      webidl.brandCheck(this, Response2);
      const urlList = this[kState].urlList;
      const url2 = urlList[urlList.length - 1] ?? null;
      if (url2 === null) {
        return "";
      }
      return URLSerializer(url2, true);
    }
    // Returns whether response was obtained through a redirect.
    get redirected() {
      webidl.brandCheck(this, Response2);
      return this[kState].urlList.length > 1;
    }
    // Returns response’s status.
    get status() {
      webidl.brandCheck(this, Response2);
      return this[kState].status;
    }
    // Returns whether response’s status is an ok status.
    get ok() {
      webidl.brandCheck(this, Response2);
      return this[kState].status >= 200 && this[kState].status <= 299;
    }
    // Returns response’s status message.
    get statusText() {
      webidl.brandCheck(this, Response2);
      return this[kState].statusText;
    }
    // Returns response’s headers as Headers.
    get headers() {
      webidl.brandCheck(this, Response2);
      return this[kHeaders];
    }
    get body() {
      webidl.brandCheck(this, Response2);
      return this[kState].body ? this[kState].body.stream : null;
    }
    get bodyUsed() {
      webidl.brandCheck(this, Response2);
      return !!this[kState].body && util2.isDisturbed(this[kState].body.stream);
    }
    // Returns a clone of response.
    clone() {
      webidl.brandCheck(this, Response2);
      if (this.bodyUsed || this.body && this.body.locked) {
        throw webidl.errors.exception({
          header: "Response.clone",
          message: "Body has already been consumed."
        });
      }
      const clonedResponse = cloneResponse(this[kState]);
      const clonedResponseObject = new Response2();
      clonedResponseObject[kState] = clonedResponse;
      clonedResponseObject[kRealm] = this[kRealm];
      clonedResponseObject[kHeaders][kHeadersList] = clonedResponse.headersList;
      clonedResponseObject[kHeaders][kGuard] = this[kHeaders][kGuard];
      clonedResponseObject[kHeaders][kRealm] = this[kHeaders][kRealm];
      return clonedResponseObject;
    }
  }
  mixinBody(Response2);
  Object.defineProperties(Response2.prototype, {
    type: kEnumerableProperty2,
    url: kEnumerableProperty2,
    status: kEnumerableProperty2,
    ok: kEnumerableProperty2,
    redirected: kEnumerableProperty2,
    statusText: kEnumerableProperty2,
    headers: kEnumerableProperty2,
    clone: kEnumerableProperty2,
    body: kEnumerableProperty2,
    bodyUsed: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "Response",
      configurable: true
    }
  });
  Object.defineProperties(Response2, {
    json: kEnumerableProperty2,
    redirect: kEnumerableProperty2,
    error: kEnumerableProperty2
  });
  function cloneResponse(response2) {
    if (response2.internalResponse) {
      return filterResponse(
        cloneResponse(response2.internalResponse),
        response2.type
      );
    }
    const newResponse = makeResponse({ ...response2, body: null });
    if (response2.body != null) {
      newResponse.body = cloneBody(response2.body);
    }
    return newResponse;
  }
  function makeResponse(init) {
    return {
      aborted: false,
      rangeRequested: false,
      timingAllowPassed: false,
      requestIncludesCredentials: false,
      type: "default",
      status: 200,
      timingInfo: null,
      cacheState: "",
      statusText: "",
      ...init,
      headersList: init.headersList ? new HeadersList(init.headersList) : new HeadersList(),
      urlList: init.urlList ? [...init.urlList] : []
    };
  }
  function makeNetworkError(reason) {
    const isError = isErrorLike(reason);
    return makeResponse({
      type: "error",
      status: 0,
      error: isError ? reason : new Error(reason ? String(reason) : reason),
      aborted: reason && reason.name === "AbortError"
    });
  }
  function makeFilteredResponse(response2, state) {
    state = {
      internalResponse: response2,
      ...state
    };
    return new Proxy(response2, {
      get(target, p) {
        return p in state ? state[p] : target[p];
      },
      set(target, p, value) {
        assert2(!(p in state));
        target[p] = value;
        return true;
      }
    });
  }
  function filterResponse(response2, type) {
    if (type === "basic") {
      return makeFilteredResponse(response2, {
        type: "basic",
        headersList: response2.headersList
      });
    } else if (type === "cors") {
      return makeFilteredResponse(response2, {
        type: "cors",
        headersList: response2.headersList
      });
    } else if (type === "opaque") {
      return makeFilteredResponse(response2, {
        type: "opaque",
        urlList: Object.freeze([]),
        status: 0,
        statusText: "",
        body: null
      });
    } else if (type === "opaqueredirect") {
      return makeFilteredResponse(response2, {
        type: "opaqueredirect",
        status: 0,
        statusText: "",
        headersList: [],
        body: null
      });
    } else {
      assert2(false);
    }
  }
  function makeAppropriateNetworkError(fetchParams) {
    assert2(isCancelled(fetchParams));
    return isAborted(fetchParams) ? makeNetworkError(new DOMException2("The operation was aborted.", "AbortError")) : makeNetworkError("Request was cancelled.");
  }
  function initializeResponse(response2, init, body2) {
    if (init.status !== null && (init.status < 200 || init.status > 599)) {
      throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.');
    }
    if ("statusText" in init && init.statusText != null) {
      if (!isValidReasonPhrase(String(init.statusText))) {
        throw new TypeError("Invalid statusText");
      }
    }
    if ("status" in init && init.status != null) {
      response2[kState].status = init.status;
    }
    if ("statusText" in init && init.statusText != null) {
      response2[kState].statusText = init.statusText;
    }
    if ("headers" in init && init.headers != null) {
      fill(response2[kHeaders], init.headers);
    }
    if (body2) {
      if (nullBodyStatus.includes(response2.status)) {
        throw webidl.errors.exception({
          header: "Response constructor",
          message: "Invalid response status code " + response2.status
        });
      }
      response2[kState].body = body2.body;
      if (body2.type != null && !response2[kState].headersList.contains("Content-Type")) {
        response2[kState].headersList.append("content-type", body2.type);
      }
    }
  }
  webidl.converters.ReadableStream = webidl.interfaceConverter(
    ReadableStream2
  );
  webidl.converters.FormData = webidl.interfaceConverter(
    FormData2
  );
  webidl.converters.URLSearchParams = webidl.interfaceConverter(
    URLSearchParams
  );
  webidl.converters.XMLHttpRequestBodyInit = function(V) {
    if (typeof V === "string") {
      return webidl.converters.USVString(V);
    }
    if (isBlobLike2(V)) {
      return webidl.converters.Blob(V, { strict: false });
    }
    if (types.isAnyArrayBuffer(V) || types.isTypedArray(V) || types.isDataView(V)) {
      return webidl.converters.BufferSource(V);
    }
    if (util2.isFormDataLike(V)) {
      return webidl.converters.FormData(V, { strict: false });
    }
    if (V instanceof URLSearchParams) {
      return webidl.converters.URLSearchParams(V);
    }
    return webidl.converters.DOMString(V);
  };
  webidl.converters.BodyInit = function(V) {
    if (V instanceof ReadableStream2) {
      return webidl.converters.ReadableStream(V);
    }
    if (V == null ? void 0 : V[Symbol.asyncIterator]) {
      return V;
    }
    return webidl.converters.XMLHttpRequestBodyInit(V);
  };
  webidl.converters.ResponseInit = webidl.dictionaryConverter([
    {
      key: "status",
      converter: webidl.converters["unsigned short"],
      defaultValue: 200
    },
    {
      key: "statusText",
      converter: webidl.converters.ByteString,
      defaultValue: ""
    },
    {
      key: "headers",
      converter: webidl.converters.HeadersInit
    }
  ]);
  response$1 = {
    makeNetworkError,
    makeResponse,
    makeAppropriateNetworkError,
    filterResponse,
    Response: Response2,
    cloneResponse
  };
  return response$1;
}
var request$1;
var hasRequiredRequest;
function requireRequest() {
  if (hasRequiredRequest)
    return request$1;
  hasRequiredRequest = 1;
  const { extractBody: extractBody2, mixinBody, cloneBody } = requireBody();
  const { Headers: Headers2, fill: fillHeaders, HeadersList } = requireHeaders();
  const { FinalizationRegistry: FinalizationRegistry2 } = dispatcherWeakref();
  const util2 = util$j;
  const {
    isValidHTTPToken,
    sameOrigin,
    normalizeMethod,
    makePolicyContainer
  } = requireUtil$4();
  const {
    forbiddenMethods,
    corsSafeListedMethods,
    referrerPolicy,
    requestRedirect,
    requestMode,
    requestCredentials,
    requestCache,
    requestDuplex
  } = requireConstants$3();
  const { kEnumerableProperty: kEnumerableProperty2 } = util2;
  const { kHeaders, kSignal: kSignal2, kState, kGuard, kRealm } = requireSymbols$3();
  const { webidl } = requireWebidl();
  const { getGlobalOrigin } = requireGlobal();
  const { URLSerializer } = requireDataURL();
  const { kHeadersList } = symbols$4;
  const assert2 = require$$0$1;
  const { getMaxListeners, setMaxListeners, getEventListeners, defaultMaxListeners } = require$$0$6;
  let TransformStream = globalThis.TransformStream;
  const kInit = Symbol("init");
  const kAbortController = Symbol("abortController");
  const requestFinalizer = new FinalizationRegistry2(({ signal, abort: abort2 }) => {
    signal.removeEventListener("abort", abort2);
  });
  class Request3 {
    // https://fetch.spec.whatwg.org/#dom-request
    constructor(input, init = {}) {
      var _a2, _b2;
      if (input === kInit) {
        return;
      }
      webidl.argumentLengthCheck(arguments, 1, { header: "Request constructor" });
      input = webidl.converters.RequestInfo(input);
      init = webidl.converters.RequestInit(init);
      this[kRealm] = {
        settingsObject: {
          baseUrl: getGlobalOrigin(),
          get origin() {
            var _a3;
            return (_a3 = this.baseUrl) == null ? void 0 : _a3.origin;
          },
          policyContainer: makePolicyContainer()
        }
      };
      let request2 = null;
      let fallbackMode = null;
      const baseUrl = this[kRealm].settingsObject.baseUrl;
      let signal = null;
      if (typeof input === "string") {
        let parsedURL;
        try {
          parsedURL = new URL(input, baseUrl);
        } catch (err) {
          throw new TypeError("Failed to parse URL from " + input, { cause: err });
        }
        if (parsedURL.username || parsedURL.password) {
          throw new TypeError(
            "Request cannot be constructed from a URL that includes credentials: " + input
          );
        }
        request2 = makeRequest({ urlList: [parsedURL] });
        fallbackMode = "cors";
      } else {
        assert2(input instanceof Request3);
        request2 = input[kState];
        signal = input[kSignal2];
      }
      const origin = this[kRealm].settingsObject.origin;
      let window2 = "client";
      if (((_b2 = (_a2 = request2.window) == null ? void 0 : _a2.constructor) == null ? void 0 : _b2.name) === "EnvironmentSettingsObject" && sameOrigin(request2.window, origin)) {
        window2 = request2.window;
      }
      if (init.window != null) {
        throw new TypeError(`'window' option '${window2}' must be null`);
      }
      if ("window" in init) {
        window2 = "no-window";
      }
      request2 = makeRequest({
        // URL request’s URL.
        // undici implementation note: this is set as the first item in request's urlList in makeRequest
        // method request’s method.
        method: request2.method,
        // header list A copy of request’s header list.
        // undici implementation note: headersList is cloned in makeRequest
        headersList: request2.headersList,
        // unsafe-request flag Set.
        unsafeRequest: request2.unsafeRequest,
        // client This’s relevant settings object.
        client: this[kRealm].settingsObject,
        // window window.
        window: window2,
        // priority request’s priority.
        priority: request2.priority,
        // origin request’s origin. The propagation of the origin is only significant for navigation requests
        // being handled by a service worker. In this scenario a request can have an origin that is different
        // from the current client.
        origin: request2.origin,
        // referrer request’s referrer.
        referrer: request2.referrer,
        // referrer policy request’s referrer policy.
        referrerPolicy: request2.referrerPolicy,
        // mode request’s mode.
        mode: request2.mode,
        // credentials mode request’s credentials mode.
        credentials: request2.credentials,
        // cache mode request’s cache mode.
        cache: request2.cache,
        // redirect mode request’s redirect mode.
        redirect: request2.redirect,
        // integrity metadata request’s integrity metadata.
        integrity: request2.integrity,
        // keepalive request’s keepalive.
        keepalive: request2.keepalive,
        // reload-navigation flag request’s reload-navigation flag.
        reloadNavigation: request2.reloadNavigation,
        // history-navigation flag request’s history-navigation flag.
        historyNavigation: request2.historyNavigation,
        // URL list A clone of request’s URL list.
        urlList: [...request2.urlList]
      });
      if (Object.keys(init).length > 0) {
        if (request2.mode === "navigate") {
          request2.mode = "same-origin";
        }
        request2.reloadNavigation = false;
        request2.historyNavigation = false;
        request2.origin = "client";
        request2.referrer = "client";
        request2.referrerPolicy = "";
        request2.url = request2.urlList[request2.urlList.length - 1];
        request2.urlList = [request2.url];
      }
      if (init.referrer !== void 0) {
        const referrer = init.referrer;
        if (referrer === "") {
          request2.referrer = "no-referrer";
        } else {
          let parsedReferrer;
          try {
            parsedReferrer = new URL(referrer, baseUrl);
          } catch (err) {
            throw new TypeError(`Referrer "${referrer}" is not a valid URL.`, { cause: err });
          }
          request2.referrer = parsedReferrer;
        }
      }
      if (init.referrerPolicy !== void 0) {
        request2.referrerPolicy = init.referrerPolicy;
      }
      let mode;
      if (init.mode !== void 0) {
        mode = init.mode;
      } else {
        mode = fallbackMode;
      }
      if (mode === "navigate") {
        throw webidl.errors.exception({
          header: "Request constructor",
          message: "invalid request mode navigate."
        });
      }
      if (mode != null) {
        request2.mode = mode;
      }
      if (init.credentials !== void 0) {
        request2.credentials = init.credentials;
      }
      if (init.cache !== void 0) {
        request2.cache = init.cache;
      }
      if (request2.cache === "only-if-cached" && request2.mode !== "same-origin") {
        throw new TypeError(
          "'only-if-cached' can be set only with 'same-origin' mode"
        );
      }
      if (init.redirect !== void 0) {
        request2.redirect = init.redirect;
      }
      if (init.integrity !== void 0 && init.integrity != null) {
        request2.integrity = String(init.integrity);
      }
      if (init.keepalive !== void 0) {
        request2.keepalive = Boolean(init.keepalive);
      }
      if (init.method !== void 0) {
        let method = init.method;
        if (!isValidHTTPToken(init.method)) {
          throw TypeError(`'${init.method}' is not a valid HTTP method.`);
        }
        if (forbiddenMethods.indexOf(method.toUpperCase()) !== -1) {
          throw TypeError(`'${init.method}' HTTP method is unsupported.`);
        }
        method = normalizeMethod(init.method);
        request2.method = method;
      }
      if (init.signal !== void 0) {
        signal = init.signal;
      }
      this[kState] = request2;
      const ac = new AbortController();
      this[kSignal2] = ac.signal;
      this[kSignal2][kRealm] = this[kRealm];
      if (signal != null) {
        if (!signal || typeof signal.aborted !== "boolean" || typeof signal.addEventListener !== "function") {
          throw new TypeError(
            "Failed to construct 'Request': member signal is not of type AbortSignal."
          );
        }
        if (signal.aborted) {
          ac.abort(signal.reason);
        } else {
          this[kAbortController] = ac;
          const acRef = new WeakRef(ac);
          const abort2 = function() {
            const ac2 = acRef.deref();
            if (ac2 !== void 0) {
              ac2.abort(this.reason);
            }
          };
          try {
            if (typeof getMaxListeners === "function" && getMaxListeners(signal) === defaultMaxListeners) {
              setMaxListeners(100, signal);
            } else if (getEventListeners(signal, "abort").length >= defaultMaxListeners) {
              setMaxListeners(100, signal);
            }
          } catch {
          }
          signal.addEventListener("abort", abort2, { once: true });
          requestFinalizer.register(ac, { signal, abort: abort2 });
        }
      }
      this[kHeaders] = new Headers2();
      this[kHeaders][kHeadersList] = request2.headersList;
      this[kHeaders][kGuard] = "request";
      this[kHeaders][kRealm] = this[kRealm];
      if (mode === "no-cors") {
        if (!corsSafeListedMethods.includes(request2.method)) {
          throw new TypeError(
            `'${request2.method} is unsupported in no-cors mode.`
          );
        }
        this[kHeaders][kGuard] = "request-no-cors";
      }
      if (Object.keys(init).length !== 0) {
        let headers2 = new Headers2(this[kHeaders]);
        if (init.headers !== void 0) {
          headers2 = init.headers;
        }
        this[kHeaders][kHeadersList].clear();
        if (headers2.constructor.name === "Headers") {
          for (const [key, val] of headers2) {
            this[kHeaders].append(key, val);
          }
        } else {
          fillHeaders(this[kHeaders], headers2);
        }
      }
      const inputBody = input instanceof Request3 ? input[kState].body : null;
      if ((init.body != null || inputBody != null) && (request2.method === "GET" || request2.method === "HEAD")) {
        throw new TypeError("Request with GET/HEAD method cannot have body.");
      }
      let initBody = null;
      if (init.body != null) {
        const [extractedBody, contentType] = extractBody2(
          init.body,
          request2.keepalive
        );
        initBody = extractedBody;
        if (contentType && !this[kHeaders][kHeadersList].contains("content-type")) {
          this[kHeaders].append("content-type", contentType);
        }
      }
      const inputOrInitBody = initBody ?? inputBody;
      if (inputOrInitBody != null && inputOrInitBody.source == null) {
        if (initBody != null && init.duplex == null) {
          throw new TypeError("RequestInit: duplex option is required when sending a body.");
        }
        if (request2.mode !== "same-origin" && request2.mode !== "cors") {
          throw new TypeError(
            'If request is made from ReadableStream, mode should be "same-origin" or "cors"'
          );
        }
        request2.useCORSPreflightFlag = true;
      }
      let finalBody = inputOrInitBody;
      if (initBody == null && inputBody != null) {
        if (util2.isDisturbed(inputBody.stream) || inputBody.stream.locked) {
          throw new TypeError(
            "Cannot construct a Request with a Request object that has already been used."
          );
        }
        if (!TransformStream) {
          TransformStream = require$$13.TransformStream;
        }
        const identityTransform = new TransformStream();
        inputBody.stream.pipeThrough(identityTransform);
        finalBody = {
          source: inputBody.source,
          length: inputBody.length,
          stream: identityTransform.readable
        };
      }
      this[kState].body = finalBody;
    }
    // Returns request’s HTTP method, which is "GET" by default.
    get method() {
      webidl.brandCheck(this, Request3);
      return this[kState].method;
    }
    // Returns the URL of request as a string.
    get url() {
      webidl.brandCheck(this, Request3);
      return URLSerializer(this[kState].url);
    }
    // Returns a Headers object consisting of the headers associated with request.
    // Note that headers added in the network layer by the user agent will not
    // be accounted for in this object, e.g., the "Host" header.
    get headers() {
      webidl.brandCheck(this, Request3);
      return this[kHeaders];
    }
    // Returns the kind of resource requested by request, e.g., "document"
    // or "script".
    get destination() {
      webidl.brandCheck(this, Request3);
      return this[kState].destination;
    }
    // Returns the referrer of request. Its value can be a same-origin URL if
    // explicitly set in init, the empty string to indicate no referrer, and
    // "about:client" when defaulting to the global’s default. This is used
    // during fetching to determine the value of the `Referer` header of the
    // request being made.
    get referrer() {
      webidl.brandCheck(this, Request3);
      if (this[kState].referrer === "no-referrer") {
        return "";
      }
      if (this[kState].referrer === "client") {
        return "about:client";
      }
      return this[kState].referrer.toString();
    }
    // Returns the referrer policy associated with request.
    // This is used during fetching to compute the value of the request’s
    // referrer.
    get referrerPolicy() {
      webidl.brandCheck(this, Request3);
      return this[kState].referrerPolicy;
    }
    // Returns the mode associated with request, which is a string indicating
    // whether the request will use CORS, or will be restricted to same-origin
    // URLs.
    get mode() {
      webidl.brandCheck(this, Request3);
      return this[kState].mode;
    }
    // Returns the credentials mode associated with request,
    // which is a string indicating whether credentials will be sent with the
    // request always, never, or only when sent to a same-origin URL.
    get credentials() {
      return this[kState].credentials;
    }
    // Returns the cache mode associated with request,
    // which is a string indicating how the request will
    // interact with the browser’s cache when fetching.
    get cache() {
      webidl.brandCheck(this, Request3);
      return this[kState].cache;
    }
    // Returns the redirect mode associated with request,
    // which is a string indicating how redirects for the
    // request will be handled during fetching. A request
    // will follow redirects by default.
    get redirect() {
      webidl.brandCheck(this, Request3);
      return this[kState].redirect;
    }
    // Returns request’s subresource integrity metadata, which is a
    // cryptographic hash of the resource being fetched. Its value
    // consists of multiple hashes separated by whitespace. [SRI]
    get integrity() {
      webidl.brandCheck(this, Request3);
      return this[kState].integrity;
    }
    // Returns a boolean indicating whether or not request can outlive the
    // global in which it was created.
    get keepalive() {
      webidl.brandCheck(this, Request3);
      return this[kState].keepalive;
    }
    // Returns a boolean indicating whether or not request is for a reload
    // navigation.
    get isReloadNavigation() {
      webidl.brandCheck(this, Request3);
      return this[kState].reloadNavigation;
    }
    // Returns a boolean indicating whether or not request is for a history
    // navigation (a.k.a. back-foward navigation).
    get isHistoryNavigation() {
      webidl.brandCheck(this, Request3);
      return this[kState].historyNavigation;
    }
    // Returns the signal associated with request, which is an AbortSignal
    // object indicating whether or not request has been aborted, and its
    // abort event handler.
    get signal() {
      webidl.brandCheck(this, Request3);
      return this[kSignal2];
    }
    get body() {
      webidl.brandCheck(this, Request3);
      return this[kState].body ? this[kState].body.stream : null;
    }
    get bodyUsed() {
      webidl.brandCheck(this, Request3);
      return !!this[kState].body && util2.isDisturbed(this[kState].body.stream);
    }
    get duplex() {
      webidl.brandCheck(this, Request3);
      return "half";
    }
    // Returns a clone of request.
    clone() {
      var _a2;
      webidl.brandCheck(this, Request3);
      if (this.bodyUsed || ((_a2 = this.body) == null ? void 0 : _a2.locked)) {
        throw new TypeError("unusable");
      }
      const clonedRequest = cloneRequest(this[kState]);
      const clonedRequestObject = new Request3(kInit);
      clonedRequestObject[kState] = clonedRequest;
      clonedRequestObject[kRealm] = this[kRealm];
      clonedRequestObject[kHeaders] = new Headers2();
      clonedRequestObject[kHeaders][kHeadersList] = clonedRequest.headersList;
      clonedRequestObject[kHeaders][kGuard] = this[kHeaders][kGuard];
      clonedRequestObject[kHeaders][kRealm] = this[kHeaders][kRealm];
      const ac = new AbortController();
      if (this.signal.aborted) {
        ac.abort(this.signal.reason);
      } else {
        this.signal.addEventListener(
          "abort",
          () => {
            ac.abort(this.signal.reason);
          },
          { once: true }
        );
      }
      clonedRequestObject[kSignal2] = ac.signal;
      return clonedRequestObject;
    }
  }
  mixinBody(Request3);
  function makeRequest(init) {
    const request2 = {
      method: "GET",
      localURLsOnly: false,
      unsafeRequest: false,
      body: null,
      client: null,
      reservedClient: null,
      replacesClientId: "",
      window: "client",
      keepalive: false,
      serviceWorkers: "all",
      initiator: "",
      destination: "",
      priority: null,
      origin: "client",
      policyContainer: "client",
      referrer: "client",
      referrerPolicy: "",
      mode: "no-cors",
      useCORSPreflightFlag: false,
      credentials: "same-origin",
      useCredentials: false,
      cache: "default",
      redirect: "follow",
      integrity: "",
      cryptoGraphicsNonceMetadata: "",
      parserMetadata: "",
      reloadNavigation: false,
      historyNavigation: false,
      userActivation: false,
      taintedOrigin: false,
      redirectCount: 0,
      responseTainting: "basic",
      preventNoCacheCacheControlHeaderModification: false,
      done: false,
      timingAllowFailed: false,
      ...init,
      headersList: init.headersList ? new HeadersList(init.headersList) : new HeadersList()
    };
    request2.url = request2.urlList[0];
    return request2;
  }
  function cloneRequest(request2) {
    const newRequest = makeRequest({ ...request2, body: null });
    if (request2.body != null) {
      newRequest.body = cloneBody(request2.body);
    }
    return newRequest;
  }
  Object.defineProperties(Request3.prototype, {
    method: kEnumerableProperty2,
    url: kEnumerableProperty2,
    headers: kEnumerableProperty2,
    redirect: kEnumerableProperty2,
    clone: kEnumerableProperty2,
    signal: kEnumerableProperty2,
    duplex: kEnumerableProperty2,
    destination: kEnumerableProperty2,
    body: kEnumerableProperty2,
    bodyUsed: kEnumerableProperty2,
    isHistoryNavigation: kEnumerableProperty2,
    isReloadNavigation: kEnumerableProperty2,
    keepalive: kEnumerableProperty2,
    integrity: kEnumerableProperty2,
    cache: kEnumerableProperty2,
    credentials: kEnumerableProperty2,
    attribute: kEnumerableProperty2,
    referrerPolicy: kEnumerableProperty2,
    referrer: kEnumerableProperty2,
    mode: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "Request",
      configurable: true
    }
  });
  webidl.converters.Request = webidl.interfaceConverter(
    Request3
  );
  webidl.converters.RequestInfo = function(V) {
    if (typeof V === "string") {
      return webidl.converters.USVString(V);
    }
    if (V instanceof Request3) {
      return webidl.converters.Request(V);
    }
    return webidl.converters.USVString(V);
  };
  webidl.converters.AbortSignal = webidl.interfaceConverter(
    AbortSignal
  );
  webidl.converters.RequestInit = webidl.dictionaryConverter([
    {
      key: "method",
      converter: webidl.converters.ByteString
    },
    {
      key: "headers",
      converter: webidl.converters.HeadersInit
    },
    {
      key: "body",
      converter: webidl.nullableConverter(
        webidl.converters.BodyInit
      )
    },
    {
      key: "referrer",
      converter: webidl.converters.USVString
    },
    {
      key: "referrerPolicy",
      converter: webidl.converters.DOMString,
      // https://w3c.github.io/webappsec-referrer-policy/#referrer-policy
      allowedValues: referrerPolicy
    },
    {
      key: "mode",
      converter: webidl.converters.DOMString,
      // https://fetch.spec.whatwg.org/#concept-request-mode
      allowedValues: requestMode
    },
    {
      key: "credentials",
      converter: webidl.converters.DOMString,
      // https://fetch.spec.whatwg.org/#requestcredentials
      allowedValues: requestCredentials
    },
    {
      key: "cache",
      converter: webidl.converters.DOMString,
      // https://fetch.spec.whatwg.org/#requestcache
      allowedValues: requestCache
    },
    {
      key: "redirect",
      converter: webidl.converters.DOMString,
      // https://fetch.spec.whatwg.org/#requestredirect
      allowedValues: requestRedirect
    },
    {
      key: "integrity",
      converter: webidl.converters.DOMString
    },
    {
      key: "keepalive",
      converter: webidl.converters.boolean
    },
    {
      key: "signal",
      converter: webidl.nullableConverter(
        (signal) => webidl.converters.AbortSignal(
          signal,
          { strict: false }
        )
      )
    },
    {
      key: "window",
      converter: webidl.converters.any
    },
    {
      key: "duplex",
      converter: webidl.converters.DOMString,
      allowedValues: requestDuplex
    }
  ]);
  request$1 = { Request: Request3, makeRequest };
  return request$1;
}
var fetch_1;
var hasRequiredFetch;
function requireFetch() {
  if (hasRequiredFetch)
    return fetch_1;
  hasRequiredFetch = 1;
  const {
    Response: Response2,
    makeNetworkError,
    makeAppropriateNetworkError,
    filterResponse,
    makeResponse
  } = requireResponse();
  const { Headers: Headers2 } = requireHeaders();
  const { Request: Request3, makeRequest } = requireRequest();
  const zlib = require$$3;
  const {
    bytesMatch,
    makePolicyContainer,
    clonePolicyContainer,
    requestBadPort,
    TAOCheck,
    appendRequestOriginHeader,
    responseLocationURL,
    requestCurrentURL,
    setRequestReferrerPolicyOnRedirect,
    tryUpgradeRequestToAPotentiallyTrustworthyURL,
    createOpaqueTimingInfo,
    appendFetchMetadata,
    corsCheck,
    crossOriginResourcePolicyCheck,
    determineRequestsReferrer,
    coarsenedSharedCurrentTime,
    createDeferredPromise,
    isBlobLike: isBlobLike2,
    sameOrigin,
    isCancelled,
    isAborted,
    isErrorLike,
    fullyReadBody,
    readableStreamClose,
    isomorphicEncode,
    urlIsLocal,
    urlIsHttpHttpsScheme,
    urlHasHttpsScheme
  } = requireUtil$4();
  const { kState, kHeaders, kGuard, kRealm } = requireSymbols$3();
  const assert2 = require$$0$1;
  const { safelyExtractBody } = requireBody();
  const {
    redirectStatus,
    nullBodyStatus,
    safeMethods,
    requestBodyHeader,
    subresource,
    DOMException: DOMException2
  } = requireConstants$3();
  const { kHeadersList } = symbols$4;
  const EE2 = require$$0$6;
  const { Readable: Readable2, pipeline: pipeline2 } = require$$0$3;
  const { isErrored: isErrored2, isReadable: isReadable2, nodeMajor: nodeMajor2, nodeMinor: nodeMinor2 } = util$j;
  const { dataURLProcessor, serializeAMimeType } = requireDataURL();
  const { TransformStream } = require$$13;
  const { getGlobalDispatcher: getGlobalDispatcher2 } = global$1;
  const { webidl } = requireWebidl();
  const { STATUS_CODES: STATUS_CODES2 } = require$$0$2;
  let resolveObjectURL;
  let ReadableStream2 = globalThis.ReadableStream;
  class Fetch extends EE2 {
    constructor(dispatcher2) {
      super();
      this.dispatcher = dispatcher2;
      this.connection = null;
      this.dump = false;
      this.state = "ongoing";
      this.setMaxListeners(21);
    }
    terminate(reason) {
      var _a2;
      if (this.state !== "ongoing") {
        return;
      }
      this.state = "terminated";
      (_a2 = this.connection) == null ? void 0 : _a2.destroy(reason);
      this.emit("terminated", reason);
    }
    // https://fetch.spec.whatwg.org/#fetch-controller-abort
    abort(error) {
      var _a2;
      if (this.state !== "ongoing") {
        return;
      }
      this.state = "aborted";
      if (!error) {
        error = new DOMException2("The operation was aborted.", "AbortError");
      }
      this.serializedAbortReason = error;
      (_a2 = this.connection) == null ? void 0 : _a2.destroy(error);
      this.emit("terminated", error);
    }
  }
  async function fetch2(input, init = {}) {
    var _a2;
    webidl.argumentLengthCheck(arguments, 1, { header: "globalThis.fetch" });
    const p = createDeferredPromise();
    let requestObject;
    try {
      requestObject = new Request3(input, init);
    } catch (e) {
      p.reject(e);
      return p.promise;
    }
    const request2 = requestObject[kState];
    if (requestObject.signal.aborted) {
      abortFetch(p, request2, null, requestObject.signal.reason);
      return p.promise;
    }
    const globalObject = request2.client.globalObject;
    if (((_a2 = globalObject == null ? void 0 : globalObject.constructor) == null ? void 0 : _a2.name) === "ServiceWorkerGlobalScope") {
      request2.serviceWorkers = "none";
    }
    let responseObject = null;
    const relevantRealm = null;
    let locallyAborted = false;
    let controller = null;
    requestObject.signal.addEventListener(
      "abort",
      () => {
        locallyAborted = true;
        abortFetch(p, request2, responseObject, requestObject.signal.reason);
        if (controller != null) {
          controller.abort();
        }
      },
      { once: true }
    );
    const handleFetchDone = (response2) => finalizeAndReportTiming(response2, "fetch");
    const processResponse = (response2) => {
      if (locallyAborted) {
        return;
      }
      if (response2.aborted) {
        abortFetch(p, request2, responseObject, controller.serializedAbortReason);
        return;
      }
      if (response2.type === "error") {
        p.reject(
          Object.assign(new TypeError("fetch failed"), { cause: response2.error })
        );
        return;
      }
      responseObject = new Response2();
      responseObject[kState] = response2;
      responseObject[kRealm] = relevantRealm;
      responseObject[kHeaders][kHeadersList] = response2.headersList;
      responseObject[kHeaders][kGuard] = "immutable";
      responseObject[kHeaders][kRealm] = relevantRealm;
      p.resolve(responseObject);
    };
    controller = fetching({
      request: request2,
      processResponseEndOfBody: handleFetchDone,
      processResponse,
      dispatcher: init.dispatcher ?? getGlobalDispatcher2()
      // undici
    });
    return p.promise;
  }
  function finalizeAndReportTiming(response2, initiatorType = "other") {
    var _a2;
    if (response2.type === "error" && response2.aborted) {
      return;
    }
    if (!((_a2 = response2.urlList) == null ? void 0 : _a2.length)) {
      return;
    }
    const originalURL = response2.urlList[0];
    let timingInfo = response2.timingInfo;
    let cacheState = response2.cacheState;
    if (!urlIsHttpHttpsScheme(originalURL)) {
      return;
    }
    if (timingInfo === null) {
      return;
    }
    if (!timingInfo.timingAllowPassed) {
      timingInfo = createOpaqueTimingInfo({
        startTime: timingInfo.startTime
      });
      cacheState = "";
    }
    timingInfo.endTime = coarsenedSharedCurrentTime();
    response2.timingInfo = timingInfo;
    markResourceTiming(
      timingInfo,
      originalURL,
      initiatorType,
      globalThis,
      cacheState
    );
  }
  function markResourceTiming(timingInfo, originalURL, initiatorType, globalThis2, cacheState) {
    if (nodeMajor2 > 18 || nodeMajor2 === 18 && nodeMinor2 >= 2) {
      performance.markResourceTiming(timingInfo, originalURL, initiatorType, globalThis2, cacheState);
    }
  }
  function abortFetch(p, request2, responseObject, error) {
    var _a2, _b2;
    if (!error) {
      error = new DOMException2("The operation was aborted.", "AbortError");
    }
    p.reject(error);
    if (request2.body != null && isReadable2((_a2 = request2.body) == null ? void 0 : _a2.stream)) {
      request2.body.stream.cancel(error).catch((err) => {
        if (err.code === "ERR_INVALID_STATE") {
          return;
        }
        throw err;
      });
    }
    if (responseObject == null) {
      return;
    }
    const response2 = responseObject[kState];
    if (response2.body != null && isReadable2((_b2 = response2.body) == null ? void 0 : _b2.stream)) {
      response2.body.stream.cancel(error).catch((err) => {
        if (err.code === "ERR_INVALID_STATE") {
          return;
        }
        throw err;
      });
    }
  }
  function fetching({
    request: request2,
    processRequestBodyChunkLength,
    processRequestEndOfBody,
    processResponse,
    processResponseEndOfBody,
    processResponseConsumeBody,
    useParallelQueue = false,
    dispatcher: dispatcher2
    // undici
  }) {
    var _a2, _b2, _c, _d;
    let taskDestination = null;
    let crossOriginIsolatedCapability = false;
    if (request2.client != null) {
      taskDestination = request2.client.globalObject;
      crossOriginIsolatedCapability = request2.client.crossOriginIsolatedCapability;
    }
    const currenTime = coarsenedSharedCurrentTime(crossOriginIsolatedCapability);
    const timingInfo = createOpaqueTimingInfo({
      startTime: currenTime
    });
    const fetchParams = {
      controller: new Fetch(dispatcher2),
      request: request2,
      timingInfo,
      processRequestBodyChunkLength,
      processRequestEndOfBody,
      processResponse,
      processResponseConsumeBody,
      processResponseEndOfBody,
      taskDestination,
      crossOriginIsolatedCapability
    };
    assert2(!request2.body || request2.body.stream);
    if (request2.window === "client") {
      request2.window = ((_c = (_b2 = (_a2 = request2.client) == null ? void 0 : _a2.globalObject) == null ? void 0 : _b2.constructor) == null ? void 0 : _c.name) === "Window" ? request2.client : "no-window";
    }
    if (request2.origin === "client") {
      request2.origin = (_d = request2.client) == null ? void 0 : _d.origin;
    }
    if (request2.policyContainer === "client") {
      if (request2.client != null) {
        request2.policyContainer = clonePolicyContainer(
          request2.client.policyContainer
        );
      } else {
        request2.policyContainer = makePolicyContainer();
      }
    }
    if (!request2.headersList.contains("accept")) {
      const value = "*/*";
      request2.headersList.append("accept", value);
    }
    if (!request2.headersList.contains("accept-language")) {
      request2.headersList.append("accept-language", "*");
    }
    if (request2.priority === null)
      ;
    if (subresource.includes(request2.destination))
      ;
    mainFetch(fetchParams).catch((err) => {
      fetchParams.controller.terminate(err);
    });
    return fetchParams.controller;
  }
  async function mainFetch(fetchParams, recursive = false) {
    const request2 = fetchParams.request;
    let response2 = null;
    if (request2.localURLsOnly && !urlIsLocal(requestCurrentURL(request2))) {
      response2 = makeNetworkError("local URLs only");
    }
    tryUpgradeRequestToAPotentiallyTrustworthyURL(request2);
    if (requestBadPort(request2) === "blocked") {
      response2 = makeNetworkError("bad port");
    }
    if (request2.referrerPolicy === "") {
      request2.referrerPolicy = request2.policyContainer.referrerPolicy;
    }
    if (request2.referrer !== "no-referrer") {
      request2.referrer = determineRequestsReferrer(request2);
    }
    if (response2 === null) {
      response2 = await (async () => {
        const currentURL = requestCurrentURL(request2);
        if (
          // - request’s current URL’s origin is same origin with request’s origin,
          //   and request’s response tainting is "basic"
          sameOrigin(currentURL, request2.url) && request2.responseTainting === "basic" || // request’s current URL’s scheme is "data"
          currentURL.protocol === "data:" || // - request’s mode is "navigate" or "websocket"
          (request2.mode === "navigate" || request2.mode === "websocket")
        ) {
          request2.responseTainting = "basic";
          return await schemeFetch(fetchParams);
        }
        if (request2.mode === "same-origin") {
          return makeNetworkError('request mode cannot be "same-origin"');
        }
        if (request2.mode === "no-cors") {
          if (request2.redirect !== "follow") {
            return makeNetworkError(
              'redirect mode cannot be "follow" for "no-cors" request'
            );
          }
          request2.responseTainting = "opaque";
          return await schemeFetch(fetchParams);
        }
        if (!urlIsHttpHttpsScheme(requestCurrentURL(request2))) {
          return makeNetworkError("URL scheme must be a HTTP(S) scheme");
        }
        request2.responseTainting = "cors";
        return await httpFetch(fetchParams);
      })();
    }
    if (recursive) {
      return response2;
    }
    if (response2.status !== 0 && !response2.internalResponse) {
      if (request2.responseTainting === "cors")
        ;
      if (request2.responseTainting === "basic") {
        response2 = filterResponse(response2, "basic");
      } else if (request2.responseTainting === "cors") {
        response2 = filterResponse(response2, "cors");
      } else if (request2.responseTainting === "opaque") {
        response2 = filterResponse(response2, "opaque");
      } else {
        assert2(false);
      }
    }
    let internalResponse = response2.status === 0 ? response2 : response2.internalResponse;
    if (internalResponse.urlList.length === 0) {
      internalResponse.urlList.push(...request2.urlList);
    }
    if (!request2.timingAllowFailed) {
      response2.timingAllowPassed = true;
    }
    if (response2.type === "opaque" && internalResponse.status === 206 && internalResponse.rangeRequested && !request2.headers.contains("range")) {
      response2 = internalResponse = makeNetworkError();
    }
    if (response2.status !== 0 && (request2.method === "HEAD" || request2.method === "CONNECT" || nullBodyStatus.includes(internalResponse.status))) {
      internalResponse.body = null;
      fetchParams.controller.dump = true;
    }
    if (request2.integrity) {
      const processBodyError = (reason) => fetchFinale(fetchParams, makeNetworkError(reason));
      if (request2.responseTainting === "opaque" || response2.body == null) {
        processBodyError(response2.error);
        return;
      }
      const processBody = (bytes) => {
        if (!bytesMatch(bytes, request2.integrity)) {
          processBodyError("integrity mismatch");
          return;
        }
        response2.body = safelyExtractBody(bytes)[0];
        fetchFinale(fetchParams, response2);
      };
      await fullyReadBody(response2.body, processBody, processBodyError);
    } else {
      fetchFinale(fetchParams, response2);
    }
  }
  async function schemeFetch(fetchParams) {
    if (isCancelled(fetchParams) && fetchParams.request.redirectCount === 0) {
      return makeAppropriateNetworkError(fetchParams);
    }
    const { request: request2 } = fetchParams;
    const { protocol: scheme } = requestCurrentURL(request2);
    switch (scheme) {
      case "about:": {
        return makeNetworkError("about scheme is not supported");
      }
      case "blob:": {
        if (!resolveObjectURL) {
          resolveObjectURL = require$$7.resolveObjectURL;
        }
        const blobURLEntry = requestCurrentURL(request2);
        if (blobURLEntry.search.length !== 0) {
          return makeNetworkError("NetworkError when attempting to fetch resource.");
        }
        const blobURLEntryObject = resolveObjectURL(blobURLEntry.toString());
        if (request2.method !== "GET" || !isBlobLike2(blobURLEntryObject)) {
          return makeNetworkError("invalid method");
        }
        const bodyWithType = safelyExtractBody(blobURLEntryObject);
        const body2 = bodyWithType[0];
        const length = isomorphicEncode(`${body2.length}`);
        const type = bodyWithType[1] ?? "";
        const response2 = makeResponse({
          statusText: "OK",
          headersList: [
            ["content-length", { name: "Content-Length", value: length }],
            ["content-type", { name: "Content-Type", value: type }]
          ]
        });
        response2.body = body2;
        return response2;
      }
      case "data:": {
        const currentURL = requestCurrentURL(request2);
        const dataURLStruct = dataURLProcessor(currentURL);
        if (dataURLStruct === "failure") {
          return makeNetworkError("failed to fetch the data URL");
        }
        const mimeType = serializeAMimeType(dataURLStruct.mimeType);
        return makeResponse({
          statusText: "OK",
          headersList: [
            ["content-type", { name: "Content-Type", value: mimeType }]
          ],
          body: safelyExtractBody(dataURLStruct.body)[0]
        });
      }
      case "file:": {
        return makeNetworkError("not implemented... yet...");
      }
      case "http:":
      case "https:": {
        return await httpFetch(fetchParams).catch((err) => makeNetworkError(err));
      }
      default: {
        return makeNetworkError("unknown scheme");
      }
    }
  }
  function finalizeResponse(fetchParams, response2) {
    fetchParams.request.done = true;
    if (fetchParams.processResponseDone != null) {
      queueMicrotask(() => fetchParams.processResponseDone(response2));
    }
  }
  async function fetchFinale(fetchParams, response2) {
    if (response2.type === "error") {
      response2.urlList = [fetchParams.request.urlList[0]];
      response2.timingInfo = createOpaqueTimingInfo({
        startTime: fetchParams.timingInfo.startTime
      });
    }
    const processResponseEndOfBody = () => {
      fetchParams.request.done = true;
      if (fetchParams.processResponseEndOfBody != null) {
        queueMicrotask(() => fetchParams.processResponseEndOfBody(response2));
      }
    };
    if (fetchParams.processResponse != null) {
      queueMicrotask(() => fetchParams.processResponse(response2));
    }
    if (response2.body == null) {
      processResponseEndOfBody();
    } else {
      const identityTransformAlgorithm = (chunk, controller) => {
        controller.enqueue(chunk);
      };
      const transformStream = new TransformStream({
        start() {
        },
        transform: identityTransformAlgorithm,
        flush: processResponseEndOfBody
      }, {
        size() {
          return 1;
        }
      }, {
        size() {
          return 1;
        }
      });
      response2.body = { stream: response2.body.stream.pipeThrough(transformStream) };
    }
    if (fetchParams.processResponseConsumeBody != null) {
      const processBody = (nullOrBytes) => fetchParams.processResponseConsumeBody(response2, nullOrBytes);
      const processBodyError = (failure) => fetchParams.processResponseConsumeBody(response2, failure);
      if (response2.body == null) {
        queueMicrotask(() => processBody(null));
      } else {
        await fullyReadBody(response2.body, processBody, processBodyError);
      }
    }
  }
  async function httpFetch(fetchParams) {
    const request2 = fetchParams.request;
    let response2 = null;
    let actualResponse = null;
    const timingInfo = fetchParams.timingInfo;
    if (request2.serviceWorkers === "all")
      ;
    if (response2 === null) {
      if (request2.redirect === "follow") {
        request2.serviceWorkers = "none";
      }
      actualResponse = response2 = await httpNetworkOrCacheFetch(fetchParams);
      if (request2.responseTainting === "cors" && corsCheck(request2, response2) === "failure") {
        return makeNetworkError("cors failure");
      }
      if (TAOCheck(request2, response2) === "failure") {
        request2.timingAllowFailed = true;
      }
    }
    if ((request2.responseTainting === "opaque" || response2.type === "opaque") && crossOriginResourcePolicyCheck(
      request2.origin,
      request2.client,
      request2.destination,
      actualResponse
    ) === "blocked") {
      return makeNetworkError("blocked");
    }
    if (redirectStatus.includes(actualResponse.status)) {
      if (request2.redirect !== "manual") {
        fetchParams.controller.connection.destroy();
      }
      if (request2.redirect === "error") {
        response2 = makeNetworkError("unexpected redirect");
      } else if (request2.redirect === "manual") {
        response2 = actualResponse;
      } else if (request2.redirect === "follow") {
        response2 = await httpRedirectFetch(fetchParams, response2);
      } else {
        assert2(false);
      }
    }
    response2.timingInfo = timingInfo;
    return response2;
  }
  async function httpRedirectFetch(fetchParams, response2) {
    const request2 = fetchParams.request;
    const actualResponse = response2.internalResponse ? response2.internalResponse : response2;
    let locationURL;
    try {
      locationURL = responseLocationURL(
        actualResponse,
        requestCurrentURL(request2).hash
      );
      if (locationURL == null) {
        return response2;
      }
    } catch (err) {
      return makeNetworkError(err);
    }
    if (!urlIsHttpHttpsScheme(locationURL)) {
      return makeNetworkError("URL scheme must be a HTTP(S) scheme");
    }
    if (request2.redirectCount === 20) {
      return makeNetworkError("redirect count exceeded");
    }
    request2.redirectCount += 1;
    if (request2.mode === "cors" && (locationURL.username || locationURL.password) && !sameOrigin(request2, locationURL)) {
      return makeNetworkError('cross origin not allowed for request mode "cors"');
    }
    if (request2.responseTainting === "cors" && (locationURL.username || locationURL.password)) {
      return makeNetworkError(
        'URL cannot contain credentials for request mode "cors"'
      );
    }
    if (actualResponse.status !== 303 && request2.body != null && request2.body.source == null) {
      return makeNetworkError();
    }
    if ([301, 302].includes(actualResponse.status) && request2.method === "POST" || actualResponse.status === 303 && !["GET", "HEAD"].includes(request2.method)) {
      request2.method = "GET";
      request2.body = null;
      for (const headerName of requestBodyHeader) {
        request2.headersList.delete(headerName);
      }
    }
    if (!sameOrigin(requestCurrentURL(request2), locationURL)) {
      request2.headersList.delete("authorization");
    }
    if (request2.body != null) {
      assert2(request2.body.source != null);
      request2.body = safelyExtractBody(request2.body.source)[0];
    }
    const timingInfo = fetchParams.timingInfo;
    timingInfo.redirectEndTime = timingInfo.postRedirectStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
    if (timingInfo.redirectStartTime === 0) {
      timingInfo.redirectStartTime = timingInfo.startTime;
    }
    request2.urlList.push(locationURL);
    setRequestReferrerPolicyOnRedirect(request2, actualResponse);
    return mainFetch(fetchParams, true);
  }
  async function httpNetworkOrCacheFetch(fetchParams, isAuthenticationFetch = false, isNewConnectionFetch = false) {
    const request2 = fetchParams.request;
    let httpFetchParams = null;
    let httpRequest = null;
    let response2 = null;
    if (request2.window === "no-window" && request2.redirect === "error") {
      httpFetchParams = fetchParams;
      httpRequest = request2;
    } else {
      httpRequest = makeRequest(request2);
      httpFetchParams = { ...fetchParams };
      httpFetchParams.request = httpRequest;
    }
    const includeCredentials = request2.credentials === "include" || request2.credentials === "same-origin" && request2.responseTainting === "basic";
    const contentLength = httpRequest.body ? httpRequest.body.length : null;
    let contentLengthHeaderValue = null;
    if (httpRequest.body == null && ["POST", "PUT"].includes(httpRequest.method)) {
      contentLengthHeaderValue = "0";
    }
    if (contentLength != null) {
      contentLengthHeaderValue = isomorphicEncode(`${contentLength}`);
    }
    if (contentLengthHeaderValue != null) {
      httpRequest.headersList.append("content-length", contentLengthHeaderValue);
    }
    if (contentLength != null && httpRequest.keepalive)
      ;
    if (httpRequest.referrer instanceof URL) {
      httpRequest.headersList.append("referer", isomorphicEncode(httpRequest.referrer.href));
    }
    appendRequestOriginHeader(httpRequest);
    appendFetchMetadata(httpRequest);
    if (!httpRequest.headersList.contains("user-agent")) {
      httpRequest.headersList.append("user-agent", "undici");
    }
    if (httpRequest.cache === "default" && (httpRequest.headersList.contains("if-modified-since") || httpRequest.headersList.contains("if-none-match") || httpRequest.headersList.contains("if-unmodified-since") || httpRequest.headersList.contains("if-match") || httpRequest.headersList.contains("if-range"))) {
      httpRequest.cache = "no-store";
    }
    if (httpRequest.cache === "no-cache" && !httpRequest.preventNoCacheCacheControlHeaderModification && !httpRequest.headersList.contains("cache-control")) {
      httpRequest.headersList.append("cache-control", "max-age=0");
    }
    if (httpRequest.cache === "no-store" || httpRequest.cache === "reload") {
      if (!httpRequest.headersList.contains("pragma")) {
        httpRequest.headersList.append("pragma", "no-cache");
      }
      if (!httpRequest.headersList.contains("cache-control")) {
        httpRequest.headersList.append("cache-control", "no-cache");
      }
    }
    if (httpRequest.headersList.contains("range")) {
      httpRequest.headersList.append("accept-encoding", "identity");
    }
    if (!httpRequest.headersList.contains("accept-encoding")) {
      if (urlHasHttpsScheme(requestCurrentURL(httpRequest))) {
        httpRequest.headersList.append("accept-encoding", "br, gzip, deflate");
      } else {
        httpRequest.headersList.append("accept-encoding", "gzip, deflate");
      }
    }
    {
      httpRequest.cache = "no-store";
    }
    if (httpRequest.mode !== "no-store" && httpRequest.mode !== "reload")
      ;
    if (response2 == null) {
      if (httpRequest.mode === "only-if-cached") {
        return makeNetworkError("only if cached");
      }
      const forwardResponse = await httpNetworkFetch(
        httpFetchParams,
        includeCredentials,
        isNewConnectionFetch
      );
      if (!safeMethods.includes(httpRequest.method) && forwardResponse.status >= 200 && forwardResponse.status <= 399)
        ;
      if (response2 == null) {
        response2 = forwardResponse;
      }
    }
    response2.urlList = [...httpRequest.urlList];
    if (httpRequest.headersList.contains("range")) {
      response2.rangeRequested = true;
    }
    response2.requestIncludesCredentials = includeCredentials;
    if (response2.status === 407) {
      if (request2.window === "no-window") {
        return makeNetworkError();
      }
      if (isCancelled(fetchParams)) {
        return makeAppropriateNetworkError(fetchParams);
      }
      return makeNetworkError("proxy authentication required");
    }
    if (
      // response’s status is 421
      response2.status === 421 && // isNewConnectionFetch is false
      !isNewConnectionFetch && // request’s body is null, or request’s body is non-null and request’s body’s source is non-null
      (request2.body == null || request2.body.source != null)
    ) {
      if (isCancelled(fetchParams)) {
        return makeAppropriateNetworkError(fetchParams);
      }
      fetchParams.controller.connection.destroy();
      response2 = await httpNetworkOrCacheFetch(
        fetchParams,
        isAuthenticationFetch,
        true
      );
    }
    return response2;
  }
  async function httpNetworkFetch(fetchParams, includeCredentials = false, forceNewConnection = false) {
    assert2(!fetchParams.controller.connection || fetchParams.controller.connection.destroyed);
    fetchParams.controller.connection = {
      abort: null,
      destroyed: false,
      destroy(err) {
        var _a2;
        if (!this.destroyed) {
          this.destroyed = true;
          (_a2 = this.abort) == null ? void 0 : _a2.call(this, err ?? new DOMException2("The operation was aborted.", "AbortError"));
        }
      }
    };
    const request2 = fetchParams.request;
    let response2 = null;
    const timingInfo = fetchParams.timingInfo;
    {
      request2.cache = "no-store";
    }
    if (request2.mode === "websocket")
      ;
    let requestBody2 = null;
    if (request2.body == null && fetchParams.processRequestEndOfBody) {
      queueMicrotask(() => fetchParams.processRequestEndOfBody());
    } else if (request2.body != null) {
      const processBodyChunk = async function* (bytes) {
        var _a2;
        if (isCancelled(fetchParams)) {
          return;
        }
        yield bytes;
        (_a2 = fetchParams.processRequestBodyChunkLength) == null ? void 0 : _a2.call(fetchParams, bytes.byteLength);
      };
      const processEndOfBody = () => {
        if (isCancelled(fetchParams)) {
          return;
        }
        if (fetchParams.processRequestEndOfBody) {
          fetchParams.processRequestEndOfBody();
        }
      };
      const processBodyError = (e) => {
        if (isCancelled(fetchParams)) {
          return;
        }
        if (e.name === "AbortError") {
          fetchParams.controller.abort();
        } else {
          fetchParams.controller.terminate(e);
        }
      };
      requestBody2 = async function* () {
        try {
          for await (const bytes of request2.body.stream) {
            yield* processBodyChunk(bytes);
          }
          processEndOfBody();
        } catch (err) {
          processBodyError(err);
        }
      }();
    }
    try {
      const { body: body2, status, statusText, headersList, socket } = await dispatch({ body: requestBody2 });
      if (socket) {
        response2 = makeResponse({ status, statusText, headersList, socket });
      } else {
        const iterator = body2[Symbol.asyncIterator]();
        fetchParams.controller.next = () => iterator.next();
        response2 = makeResponse({ status, statusText, headersList });
      }
    } catch (err) {
      if (err.name === "AbortError") {
        fetchParams.controller.connection.destroy();
        return makeAppropriateNetworkError(fetchParams);
      }
      return makeNetworkError(err);
    }
    const pullAlgorithm = () => {
      fetchParams.controller.resume();
    };
    const cancelAlgorithm = (reason) => {
      fetchParams.controller.abort(reason);
    };
    if (!ReadableStream2) {
      ReadableStream2 = require$$13.ReadableStream;
    }
    const stream2 = new ReadableStream2(
      {
        async start(controller) {
          fetchParams.controller.controller = controller;
        },
        async pull(controller) {
          await pullAlgorithm();
        },
        async cancel(reason) {
          await cancelAlgorithm(reason);
        }
      },
      {
        highWaterMark: 0,
        size() {
          return 1;
        }
      }
    );
    response2.body = { stream: stream2 };
    fetchParams.controller.on("terminated", onAborted);
    fetchParams.controller.resume = async () => {
      while (true) {
        let bytes;
        let isFailure;
        try {
          const { done, value } = await fetchParams.controller.next();
          if (isAborted(fetchParams)) {
            break;
          }
          bytes = done ? void 0 : value;
        } catch (err) {
          if (fetchParams.controller.ended && !timingInfo.encodedBodySize) {
            bytes = void 0;
          } else {
            bytes = err;
            isFailure = true;
          }
        }
        if (bytes === void 0) {
          readableStreamClose(fetchParams.controller.controller);
          finalizeResponse(fetchParams, response2);
          return;
        }
        timingInfo.decodedBodySize += (bytes == null ? void 0 : bytes.byteLength) ?? 0;
        if (isFailure) {
          fetchParams.controller.terminate(bytes);
          return;
        }
        fetchParams.controller.controller.enqueue(new Uint8Array(bytes));
        if (isErrored2(stream2)) {
          fetchParams.controller.terminate();
          return;
        }
        if (!fetchParams.controller.controller.desiredSize) {
          return;
        }
      }
    };
    function onAborted(reason) {
      if (isAborted(fetchParams)) {
        response2.aborted = true;
        if (isReadable2(stream2)) {
          fetchParams.controller.controller.error(
            fetchParams.controller.serializedAbortReason
          );
        }
      } else {
        if (isReadable2(stream2)) {
          fetchParams.controller.controller.error(new TypeError("terminated", {
            cause: isErrorLike(reason) ? reason : void 0
          }));
        }
      }
      fetchParams.controller.connection.destroy();
    }
    return response2;
    async function dispatch({ body: body2 }) {
      const url2 = requestCurrentURL(request2);
      const agent2 = fetchParams.controller.dispatcher;
      return new Promise((resolve, reject) => agent2.dispatch(
        {
          path: url2.pathname + url2.search,
          origin: url2.origin,
          method: request2.method,
          body: fetchParams.controller.dispatcher.isMockActive ? request2.body && request2.body.source : body2,
          headers: request2.headersList.entries,
          maxRedirections: 0,
          upgrade: request2.mode === "websocket" ? "websocket" : void 0
        },
        {
          body: null,
          abort: null,
          onConnect(abort2) {
            const { connection: connection2 } = fetchParams.controller;
            if (connection2.destroyed) {
              abort2(new DOMException2("The operation was aborted.", "AbortError"));
            } else {
              fetchParams.controller.on("terminated", abort2);
              this.abort = connection2.abort = abort2;
            }
          },
          onHeaders(status, headersList, resume2, statusText) {
            if (status < 200) {
              return;
            }
            let codings = [];
            let location = "";
            const headers2 = new Headers2();
            for (let n = 0; n < headersList.length; n += 2) {
              const key = headersList[n + 0].toString("latin1");
              const val = headersList[n + 1].toString("latin1");
              if (key.toLowerCase() === "content-encoding") {
                codings = val.toLowerCase().split(",").map((x) => x.trim());
              } else if (key.toLowerCase() === "location") {
                location = val;
              }
              headers2.append(key, val);
            }
            this.body = new Readable2({ read: resume2 });
            const decoders = [];
            const willFollow = request2.redirect === "follow" && location && redirectStatus.includes(status);
            if (request2.method !== "HEAD" && request2.method !== "CONNECT" && !nullBodyStatus.includes(status) && !willFollow) {
              for (const coding of codings) {
                if (coding === "x-gzip" || coding === "gzip") {
                  decoders.push(zlib.createGunzip());
                } else if (coding === "deflate") {
                  decoders.push(zlib.createInflate());
                } else if (coding === "br") {
                  decoders.push(zlib.createBrotliDecompress());
                } else {
                  decoders.length = 0;
                  break;
                }
              }
            }
            resolve({
              status,
              statusText,
              headersList: headers2[kHeadersList],
              body: decoders.length ? pipeline2(this.body, ...decoders, () => {
              }) : this.body.on("error", () => {
              })
            });
            return true;
          },
          onData(chunk) {
            if (fetchParams.controller.dump) {
              return;
            }
            const bytes = chunk;
            timingInfo.encodedBodySize += bytes.byteLength;
            return this.body.push(bytes);
          },
          onComplete() {
            if (this.abort) {
              fetchParams.controller.off("terminated", this.abort);
            }
            fetchParams.controller.ended = true;
            this.body.push(null);
          },
          onError(error) {
            var _a2;
            if (this.abort) {
              fetchParams.controller.off("terminated", this.abort);
            }
            (_a2 = this.body) == null ? void 0 : _a2.destroy(error);
            fetchParams.controller.terminate(error);
            reject(error);
          },
          onUpgrade(status, headersList, socket) {
            if (status !== 101) {
              return;
            }
            const headers2 = new Headers2();
            for (let n = 0; n < headersList.length; n += 2) {
              const key = headersList[n + 0].toString("latin1");
              const val = headersList[n + 1].toString("latin1");
              headers2.append(key, val);
            }
            resolve({
              status,
              statusText: STATUS_CODES2[status],
              headersList: headers2[kHeadersList],
              socket
            });
            return true;
          }
        }
      ));
    }
  }
  fetch_1 = {
    fetch: fetch2,
    Fetch,
    fetching,
    finalizeAndReportTiming
  };
  return fetch_1;
}
var symbols$2;
var hasRequiredSymbols$2;
function requireSymbols$2() {
  if (hasRequiredSymbols$2)
    return symbols$2;
  hasRequiredSymbols$2 = 1;
  symbols$2 = {
    kState: Symbol("FileReader state"),
    kResult: Symbol("FileReader result"),
    kError: Symbol("FileReader error"),
    kLastProgressEventFired: Symbol("FileReader last progress event fired timestamp"),
    kEvents: Symbol("FileReader events"),
    kAborted: Symbol("FileReader aborted")
  };
  return symbols$2;
}
var progressevent;
var hasRequiredProgressevent;
function requireProgressevent() {
  if (hasRequiredProgressevent)
    return progressevent;
  hasRequiredProgressevent = 1;
  const { webidl } = requireWebidl();
  const kState = Symbol("ProgressEvent state");
  class ProgressEvent extends Event {
    constructor(type, eventInitDict = {}) {
      type = webidl.converters.DOMString(type);
      eventInitDict = webidl.converters.ProgressEventInit(eventInitDict ?? {});
      super(type, eventInitDict);
      this[kState] = {
        lengthComputable: eventInitDict.lengthComputable,
        loaded: eventInitDict.loaded,
        total: eventInitDict.total
      };
    }
    get lengthComputable() {
      webidl.brandCheck(this, ProgressEvent);
      return this[kState].lengthComputable;
    }
    get loaded() {
      webidl.brandCheck(this, ProgressEvent);
      return this[kState].loaded;
    }
    get total() {
      webidl.brandCheck(this, ProgressEvent);
      return this[kState].total;
    }
  }
  webidl.converters.ProgressEventInit = webidl.dictionaryConverter([
    {
      key: "lengthComputable",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "loaded",
      converter: webidl.converters["unsigned long long"],
      defaultValue: 0
    },
    {
      key: "total",
      converter: webidl.converters["unsigned long long"],
      defaultValue: 0
    },
    {
      key: "bubbles",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "cancelable",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "composed",
      converter: webidl.converters.boolean,
      defaultValue: false
    }
  ]);
  progressevent = {
    ProgressEvent
  };
  return progressevent;
}
var encoding;
var hasRequiredEncoding;
function requireEncoding() {
  if (hasRequiredEncoding)
    return encoding;
  hasRequiredEncoding = 1;
  function getEncoding(label) {
    if (!label) {
      return "failure";
    }
    switch (label.trim().toLowerCase()) {
      case "unicode-1-1-utf-8":
      case "unicode11utf8":
      case "unicode20utf8":
      case "utf-8":
      case "utf8":
      case "x-unicode20utf8":
        return "UTF-8";
      case "866":
      case "cp866":
      case "csibm866":
      case "ibm866":
        return "IBM866";
      case "csisolatin2":
      case "iso-8859-2":
      case "iso-ir-101":
      case "iso8859-2":
      case "iso88592":
      case "iso_8859-2":
      case "iso_8859-2:1987":
      case "l2":
      case "latin2":
        return "ISO-8859-2";
      case "csisolatin3":
      case "iso-8859-3":
      case "iso-ir-109":
      case "iso8859-3":
      case "iso88593":
      case "iso_8859-3":
      case "iso_8859-3:1988":
      case "l3":
      case "latin3":
        return "ISO-8859-3";
      case "csisolatin4":
      case "iso-8859-4":
      case "iso-ir-110":
      case "iso8859-4":
      case "iso88594":
      case "iso_8859-4":
      case "iso_8859-4:1988":
      case "l4":
      case "latin4":
        return "ISO-8859-4";
      case "csisolatincyrillic":
      case "cyrillic":
      case "iso-8859-5":
      case "iso-ir-144":
      case "iso8859-5":
      case "iso88595":
      case "iso_8859-5":
      case "iso_8859-5:1988":
        return "ISO-8859-5";
      case "arabic":
      case "asmo-708":
      case "csiso88596e":
      case "csiso88596i":
      case "csisolatinarabic":
      case "ecma-114":
      case "iso-8859-6":
      case "iso-8859-6-e":
      case "iso-8859-6-i":
      case "iso-ir-127":
      case "iso8859-6":
      case "iso88596":
      case "iso_8859-6":
      case "iso_8859-6:1987":
        return "ISO-8859-6";
      case "csisolatingreek":
      case "ecma-118":
      case "elot_928":
      case "greek":
      case "greek8":
      case "iso-8859-7":
      case "iso-ir-126":
      case "iso8859-7":
      case "iso88597":
      case "iso_8859-7":
      case "iso_8859-7:1987":
      case "sun_eu_greek":
        return "ISO-8859-7";
      case "csiso88598e":
      case "csisolatinhebrew":
      case "hebrew":
      case "iso-8859-8":
      case "iso-8859-8-e":
      case "iso-ir-138":
      case "iso8859-8":
      case "iso88598":
      case "iso_8859-8":
      case "iso_8859-8:1988":
      case "visual":
        return "ISO-8859-8";
      case "csiso88598i":
      case "iso-8859-8-i":
      case "logical":
        return "ISO-8859-8-I";
      case "csisolatin6":
      case "iso-8859-10":
      case "iso-ir-157":
      case "iso8859-10":
      case "iso885910":
      case "l6":
      case "latin6":
        return "ISO-8859-10";
      case "iso-8859-13":
      case "iso8859-13":
      case "iso885913":
        return "ISO-8859-13";
      case "iso-8859-14":
      case "iso8859-14":
      case "iso885914":
        return "ISO-8859-14";
      case "csisolatin9":
      case "iso-8859-15":
      case "iso8859-15":
      case "iso885915":
      case "iso_8859-15":
      case "l9":
        return "ISO-8859-15";
      case "iso-8859-16":
        return "ISO-8859-16";
      case "cskoi8r":
      case "koi":
      case "koi8":
      case "koi8-r":
      case "koi8_r":
        return "KOI8-R";
      case "koi8-ru":
      case "koi8-u":
        return "KOI8-U";
      case "csmacintosh":
      case "mac":
      case "macintosh":
      case "x-mac-roman":
        return "macintosh";
      case "iso-8859-11":
      case "iso8859-11":
      case "iso885911":
      case "tis-620":
      case "windows-874":
        return "windows-874";
      case "cp1250":
      case "windows-1250":
      case "x-cp1250":
        return "windows-1250";
      case "cp1251":
      case "windows-1251":
      case "x-cp1251":
        return "windows-1251";
      case "ansi_x3.4-1968":
      case "ascii":
      case "cp1252":
      case "cp819":
      case "csisolatin1":
      case "ibm819":
      case "iso-8859-1":
      case "iso-ir-100":
      case "iso8859-1":
      case "iso88591":
      case "iso_8859-1":
      case "iso_8859-1:1987":
      case "l1":
      case "latin1":
      case "us-ascii":
      case "windows-1252":
      case "x-cp1252":
        return "windows-1252";
      case "cp1253":
      case "windows-1253":
      case "x-cp1253":
        return "windows-1253";
      case "cp1254":
      case "csisolatin5":
      case "iso-8859-9":
      case "iso-ir-148":
      case "iso8859-9":
      case "iso88599":
      case "iso_8859-9":
      case "iso_8859-9:1989":
      case "l5":
      case "latin5":
      case "windows-1254":
      case "x-cp1254":
        return "windows-1254";
      case "cp1255":
      case "windows-1255":
      case "x-cp1255":
        return "windows-1255";
      case "cp1256":
      case "windows-1256":
      case "x-cp1256":
        return "windows-1256";
      case "cp1257":
      case "windows-1257":
      case "x-cp1257":
        return "windows-1257";
      case "cp1258":
      case "windows-1258":
      case "x-cp1258":
        return "windows-1258";
      case "x-mac-cyrillic":
      case "x-mac-ukrainian":
        return "x-mac-cyrillic";
      case "chinese":
      case "csgb2312":
      case "csiso58gb231280":
      case "gb2312":
      case "gb_2312":
      case "gb_2312-80":
      case "gbk":
      case "iso-ir-58":
      case "x-gbk":
        return "GBK";
      case "gb18030":
        return "gb18030";
      case "big5":
      case "big5-hkscs":
      case "cn-big5":
      case "csbig5":
      case "x-x-big5":
        return "Big5";
      case "cseucpkdfmtjapanese":
      case "euc-jp":
      case "x-euc-jp":
        return "EUC-JP";
      case "csiso2022jp":
      case "iso-2022-jp":
        return "ISO-2022-JP";
      case "csshiftjis":
      case "ms932":
      case "ms_kanji":
      case "shift-jis":
      case "shift_jis":
      case "sjis":
      case "windows-31j":
      case "x-sjis":
        return "Shift_JIS";
      case "cseuckr":
      case "csksc56011987":
      case "euc-kr":
      case "iso-ir-149":
      case "korean":
      case "ks_c_5601-1987":
      case "ks_c_5601-1989":
      case "ksc5601":
      case "ksc_5601":
      case "windows-949":
        return "EUC-KR";
      case "csiso2022kr":
      case "hz-gb-2312":
      case "iso-2022-cn":
      case "iso-2022-cn-ext":
      case "iso-2022-kr":
      case "replacement":
        return "replacement";
      case "unicodefffe":
      case "utf-16be":
        return "UTF-16BE";
      case "csunicode":
      case "iso-10646-ucs-2":
      case "ucs-2":
      case "unicode":
      case "unicodefeff":
      case "utf-16":
      case "utf-16le":
        return "UTF-16LE";
      case "x-user-defined":
        return "x-user-defined";
      default:
        return "failure";
    }
  }
  encoding = {
    getEncoding
  };
  return encoding;
}
var util$4;
var hasRequiredUtil$3;
function requireUtil$3() {
  if (hasRequiredUtil$3)
    return util$4;
  hasRequiredUtil$3 = 1;
  const {
    kState,
    kError: kError2,
    kResult,
    kAborted,
    kLastProgressEventFired
  } = requireSymbols$2();
  const { ProgressEvent } = requireProgressevent();
  const { getEncoding } = requireEncoding();
  const { DOMException: DOMException2 } = requireConstants$3();
  const { serializeAMimeType, parseMIMEType } = requireDataURL();
  const { types } = require$$0$4;
  const { StringDecoder } = require$$6;
  const { btoa } = require$$7;
  const staticPropertyDescriptors = {
    enumerable: true,
    writable: false,
    configurable: false
  };
  function readOperation(fr, blob, type, encodingName) {
    if (fr[kState] === "loading") {
      throw new DOMException2("Invalid state", "InvalidStateError");
    }
    fr[kState] = "loading";
    fr[kResult] = null;
    fr[kError2] = null;
    const stream2 = blob.stream();
    const reader = stream2.getReader();
    const bytes = [];
    let chunkPromise = reader.read();
    let isFirstChunk = true;
    (async () => {
      while (!fr[kAborted]) {
        try {
          const { done, value } = await chunkPromise;
          if (isFirstChunk && !fr[kAborted]) {
            queueMicrotask(() => {
              fireAProgressEvent("loadstart", fr);
            });
          }
          isFirstChunk = false;
          if (!done && types.isUint8Array(value)) {
            bytes.push(value);
            if ((fr[kLastProgressEventFired] === void 0 || Date.now() - fr[kLastProgressEventFired] >= 50) && !fr[kAborted]) {
              fr[kLastProgressEventFired] = Date.now();
              queueMicrotask(() => {
                fireAProgressEvent("progress", fr);
              });
            }
            chunkPromise = reader.read();
          } else if (done) {
            queueMicrotask(() => {
              fr[kState] = "done";
              try {
                const result = packageData(bytes, type, blob.type, encodingName);
                if (fr[kAborted]) {
                  return;
                }
                fr[kResult] = result;
                fireAProgressEvent("load", fr);
              } catch (error) {
                fr[kError2] = error;
                fireAProgressEvent("error", fr);
              }
              if (fr[kState] !== "loading") {
                fireAProgressEvent("loadend", fr);
              }
            });
            break;
          }
        } catch (error) {
          if (fr[kAborted]) {
            return;
          }
          queueMicrotask(() => {
            fr[kState] = "done";
            fr[kError2] = error;
            fireAProgressEvent("error", fr);
            if (fr[kState] !== "loading") {
              fireAProgressEvent("loadend", fr);
            }
          });
          break;
        }
      }
    })();
  }
  function fireAProgressEvent(e, reader) {
    const event = new ProgressEvent(e, {
      bubbles: false,
      cancelable: false
    });
    reader.dispatchEvent(event);
  }
  function packageData(bytes, type, mimeType, encodingName) {
    switch (type) {
      case "DataURL": {
        let dataURL2 = "data:";
        const parsed = parseMIMEType(mimeType || "application/octet-stream");
        if (parsed !== "failure") {
          dataURL2 += serializeAMimeType(parsed);
        }
        dataURL2 += ";base64,";
        const decoder = new StringDecoder("latin1");
        for (const chunk of bytes) {
          dataURL2 += btoa(decoder.write(chunk));
        }
        dataURL2 += btoa(decoder.end());
        return dataURL2;
      }
      case "Text": {
        let encoding2 = "failure";
        if (encodingName) {
          encoding2 = getEncoding(encodingName);
        }
        if (encoding2 === "failure" && mimeType) {
          const type2 = parseMIMEType(mimeType);
          if (type2 !== "failure") {
            encoding2 = getEncoding(type2.parameters.get("charset"));
          }
        }
        if (encoding2 === "failure") {
          encoding2 = "UTF-8";
        }
        return decode(bytes, encoding2);
      }
      case "ArrayBuffer": {
        const sequence = combineByteSequences(bytes);
        return sequence.buffer;
      }
      case "BinaryString": {
        let binaryString = "";
        const decoder = new StringDecoder("latin1");
        for (const chunk of bytes) {
          binaryString += decoder.write(chunk);
        }
        binaryString += decoder.end();
        return binaryString;
      }
    }
  }
  function decode(ioQueue, encoding2) {
    const bytes = combineByteSequences(ioQueue);
    const BOMEncoding = BOMSniffing(bytes);
    let slice = 0;
    if (BOMEncoding !== null) {
      encoding2 = BOMEncoding;
      slice = BOMEncoding === "UTF-8" ? 3 : 2;
    }
    const sliced = bytes.slice(slice);
    return new TextDecoder(encoding2).decode(sliced);
  }
  function BOMSniffing(ioQueue) {
    const [a, b, c] = ioQueue;
    if (a === 239 && b === 187 && c === 191) {
      return "UTF-8";
    } else if (a === 254 && b === 255) {
      return "UTF-16BE";
    } else if (a === 255 && b === 254) {
      return "UTF-16LE";
    }
    return null;
  }
  function combineByteSequences(sequences) {
    const size = sequences.reduce((a, b) => {
      return a + b.byteLength;
    }, 0);
    let offset = 0;
    return sequences.reduce((a, b) => {
      a.set(b, offset);
      offset += b.byteLength;
      return a;
    }, new Uint8Array(size));
  }
  util$4 = {
    staticPropertyDescriptors,
    readOperation,
    fireAProgressEvent
  };
  return util$4;
}
var filereader;
var hasRequiredFilereader;
function requireFilereader() {
  if (hasRequiredFilereader)
    return filereader;
  hasRequiredFilereader = 1;
  const {
    staticPropertyDescriptors,
    readOperation,
    fireAProgressEvent
  } = requireUtil$3();
  const {
    kState,
    kError: kError2,
    kResult,
    kEvents,
    kAborted
  } = requireSymbols$2();
  const { webidl } = requireWebidl();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$j;
  class FileReader extends EventTarget {
    constructor() {
      super();
      this[kState] = "empty";
      this[kResult] = null;
      this[kError2] = null;
      this[kEvents] = {
        loadend: null,
        error: null,
        abort: null,
        load: null,
        progress: null,
        loadstart: null
      };
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dfn-readAsArrayBuffer
     * @param {import('buffer').Blob} blob
     */
    readAsArrayBuffer(blob) {
      webidl.brandCheck(this, FileReader);
      webidl.argumentLengthCheck(arguments, 1, { header: "FileReader.readAsArrayBuffer" });
      blob = webidl.converters.Blob(blob, { strict: false });
      readOperation(this, blob, "ArrayBuffer");
    }
    /**
     * @see https://w3c.github.io/FileAPI/#readAsBinaryString
     * @param {import('buffer').Blob} blob
     */
    readAsBinaryString(blob) {
      webidl.brandCheck(this, FileReader);
      webidl.argumentLengthCheck(arguments, 1, { header: "FileReader.readAsBinaryString" });
      blob = webidl.converters.Blob(blob, { strict: false });
      readOperation(this, blob, "BinaryString");
    }
    /**
     * @see https://w3c.github.io/FileAPI/#readAsDataText
     * @param {import('buffer').Blob} blob
     * @param {string?} encoding
     */
    readAsText(blob, encoding2 = void 0) {
      webidl.brandCheck(this, FileReader);
      webidl.argumentLengthCheck(arguments, 1, { header: "FileReader.readAsText" });
      blob = webidl.converters.Blob(blob, { strict: false });
      if (encoding2 !== void 0) {
        encoding2 = webidl.converters.DOMString(encoding2);
      }
      readOperation(this, blob, "Text", encoding2);
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dfn-readAsDataURL
     * @param {import('buffer').Blob} blob
     */
    readAsDataURL(blob) {
      webidl.brandCheck(this, FileReader);
      webidl.argumentLengthCheck(arguments, 1, { header: "FileReader.readAsDataURL" });
      blob = webidl.converters.Blob(blob, { strict: false });
      readOperation(this, blob, "DataURL");
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dfn-abort
     */
    abort() {
      if (this[kState] === "empty" || this[kState] === "done") {
        this[kResult] = null;
        return;
      }
      if (this[kState] === "loading") {
        this[kState] = "done";
        this[kResult] = null;
      }
      this[kAborted] = true;
      fireAProgressEvent("abort", this);
      if (this[kState] !== "loading") {
        fireAProgressEvent("loadend", this);
      }
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dom-filereader-readystate
     */
    get readyState() {
      webidl.brandCheck(this, FileReader);
      switch (this[kState]) {
        case "empty":
          return this.EMPTY;
        case "loading":
          return this.LOADING;
        case "done":
          return this.DONE;
      }
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dom-filereader-result
     */
    get result() {
      webidl.brandCheck(this, FileReader);
      return this[kResult];
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dom-filereader-error
     */
    get error() {
      webidl.brandCheck(this, FileReader);
      return this[kError2];
    }
    get onloadend() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].loadend;
    }
    set onloadend(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].loadend) {
        this.removeEventListener("loadend", this[kEvents].loadend);
      }
      if (typeof fn === "function") {
        this[kEvents].loadend = fn;
        this.addEventListener("loadend", fn);
      } else {
        this[kEvents].loadend = null;
      }
    }
    get onerror() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].error;
    }
    set onerror(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].error) {
        this.removeEventListener("error", this[kEvents].error);
      }
      if (typeof fn === "function") {
        this[kEvents].error = fn;
        this.addEventListener("error", fn);
      } else {
        this[kEvents].error = null;
      }
    }
    get onloadstart() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].loadstart;
    }
    set onloadstart(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].loadstart) {
        this.removeEventListener("loadstart", this[kEvents].loadstart);
      }
      if (typeof fn === "function") {
        this[kEvents].loadstart = fn;
        this.addEventListener("loadstart", fn);
      } else {
        this[kEvents].loadstart = null;
      }
    }
    get onprogress() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].progress;
    }
    set onprogress(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].progress) {
        this.removeEventListener("progress", this[kEvents].progress);
      }
      if (typeof fn === "function") {
        this[kEvents].progress = fn;
        this.addEventListener("progress", fn);
      } else {
        this[kEvents].progress = null;
      }
    }
    get onload() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].load;
    }
    set onload(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].load) {
        this.removeEventListener("load", this[kEvents].load);
      }
      if (typeof fn === "function") {
        this[kEvents].load = fn;
        this.addEventListener("load", fn);
      } else {
        this[kEvents].load = null;
      }
    }
    get onabort() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].abort;
    }
    set onabort(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].abort) {
        this.removeEventListener("abort", this[kEvents].abort);
      }
      if (typeof fn === "function") {
        this[kEvents].abort = fn;
        this.addEventListener("abort", fn);
      } else {
        this[kEvents].abort = null;
      }
    }
  }
  FileReader.EMPTY = FileReader.prototype.EMPTY = 0;
  FileReader.LOADING = FileReader.prototype.LOADING = 1;
  FileReader.DONE = FileReader.prototype.DONE = 2;
  Object.defineProperties(FileReader.prototype, {
    EMPTY: staticPropertyDescriptors,
    LOADING: staticPropertyDescriptors,
    DONE: staticPropertyDescriptors,
    readAsArrayBuffer: kEnumerableProperty2,
    readAsBinaryString: kEnumerableProperty2,
    readAsText: kEnumerableProperty2,
    readAsDataURL: kEnumerableProperty2,
    abort: kEnumerableProperty2,
    readyState: kEnumerableProperty2,
    result: kEnumerableProperty2,
    error: kEnumerableProperty2,
    onloadstart: kEnumerableProperty2,
    onprogress: kEnumerableProperty2,
    onload: kEnumerableProperty2,
    onabort: kEnumerableProperty2,
    onerror: kEnumerableProperty2,
    onloadend: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "FileReader",
      writable: false,
      enumerable: false,
      configurable: true
    }
  });
  Object.defineProperties(FileReader, {
    EMPTY: staticPropertyDescriptors,
    LOADING: staticPropertyDescriptors,
    DONE: staticPropertyDescriptors
  });
  filereader = {
    FileReader
  };
  return filereader;
}
var symbols$1;
var hasRequiredSymbols$1;
function requireSymbols$1() {
  if (hasRequiredSymbols$1)
    return symbols$1;
  hasRequiredSymbols$1 = 1;
  symbols$1 = {
    kConstruct: Symbol("constructable")
  };
  return symbols$1;
}
var util$3;
var hasRequiredUtil$2;
function requireUtil$2() {
  if (hasRequiredUtil$2)
    return util$3;
  hasRequiredUtil$2 = 1;
  const assert2 = require$$0$1;
  const { URLSerializer } = requireDataURL();
  const { isValidHeaderName } = requireUtil$4();
  function urlEquals(A, B, excludeFragment = false) {
    const serializedA = URLSerializer(A, excludeFragment);
    const serializedB = URLSerializer(B, excludeFragment);
    return serializedA === serializedB;
  }
  function fieldValues(header) {
    assert2(header !== null);
    const values = [];
    for (let value of header.split(",")) {
      value = value.trim();
      if (!value.length) {
        continue;
      } else if (!isValidHeaderName(value)) {
        continue;
      }
      values.push(value);
    }
    return values;
  }
  util$3 = {
    urlEquals,
    fieldValues
  };
  return util$3;
}
var cache;
var hasRequiredCache;
function requireCache() {
  var _relevantRequestResponseList, _batchCacheOperations, batchCacheOperations_fn, _queryCache, queryCache_fn, _requestMatchesCachedItem, requestMatchesCachedItem_fn;
  if (hasRequiredCache)
    return cache;
  hasRequiredCache = 1;
  const { kConstruct } = requireSymbols$1();
  const { urlEquals, fieldValues: getFieldValues } = requireUtil$2();
  const { kEnumerableProperty: kEnumerableProperty2, isDisturbed: isDisturbed2 } = util$j;
  const { kHeadersList } = symbols$4;
  const { webidl } = requireWebidl();
  const { Response: Response2, cloneResponse } = requireResponse();
  const { Request: Request3 } = requireRequest();
  const { kState, kHeaders, kGuard, kRealm } = requireSymbols$3();
  const { fetching } = requireFetch();
  const { urlIsHttpHttpsScheme, createDeferredPromise, readAllBytes } = requireUtil$4();
  const assert2 = require$$0$1;
  const { getGlobalDispatcher: getGlobalDispatcher2 } = global$1;
  const _Cache = class _Cache {
    constructor() {
      /**
       * @see https://w3c.github.io/ServiceWorker/#batch-cache-operations-algorithm
       * @param {CacheBatchOperation[]} operations
       * @returns {requestResponseList}
       */
      __privateAdd(this, _batchCacheOperations);
      /**
       * @see https://w3c.github.io/ServiceWorker/#query-cache
       * @param {any} requestQuery
       * @param {import('../../types/cache').CacheQueryOptions} options
       * @param {requestResponseList} targetStorage
       * @returns {requestResponseList}
       */
      __privateAdd(this, _queryCache);
      /**
       * @see https://w3c.github.io/ServiceWorker/#request-matches-cached-item-algorithm
       * @param {any} requestQuery
       * @param {any} request
       * @param {any | null} response
       * @param {import('../../types/cache').CacheQueryOptions | undefined} options
       * @returns {boolean}
       */
      __privateAdd(this, _requestMatchesCachedItem);
      /**
       * @see https://w3c.github.io/ServiceWorker/#dfn-relevant-request-response-list
       * @type {requestResponseList}
       */
      __privateAdd(this, _relevantRequestResponseList, void 0);
      if (arguments[0] !== kConstruct) {
        webidl.illegalConstructor();
      }
      __privateSet(this, _relevantRequestResponseList, arguments[1]);
    }
    async match(request2, options = {}) {
      webidl.brandCheck(this, _Cache);
      webidl.argumentLengthCheck(arguments, 1, { header: "Cache.match" });
      request2 = webidl.converters.RequestInfo(request2);
      options = webidl.converters.CacheQueryOptions(options);
      const p = await this.matchAll(request2, options);
      if (p.length === 0) {
        return;
      }
      return p[0];
    }
    async matchAll(request2 = void 0, options = {}) {
      var _a2;
      webidl.brandCheck(this, _Cache);
      if (request2 !== void 0)
        request2 = webidl.converters.RequestInfo(request2);
      options = webidl.converters.CacheQueryOptions(options);
      let r = null;
      if (request2 !== void 0) {
        if (request2 instanceof Request3) {
          r = request2[kState];
          if (r.method !== "GET" && !options.ignoreMethod) {
            return [];
          }
        } else if (typeof request2 === "string") {
          r = new Request3(request2)[kState];
        }
      }
      const responses = [];
      if (request2 === void 0) {
        for (const requestResponse of __privateGet(this, _relevantRequestResponseList)) {
          responses.push(requestResponse[1]);
        }
      } else {
        const requestResponses = __privateMethod(this, _queryCache, queryCache_fn).call(this, r, options);
        for (const requestResponse of requestResponses) {
          responses.push(requestResponse[1]);
        }
      }
      const responseList = [];
      for (const response2 of responses) {
        const responseObject = new Response2(((_a2 = response2.body) == null ? void 0 : _a2.source) ?? null);
        const body2 = responseObject[kState].body;
        responseObject[kState] = response2;
        responseObject[kState].body = body2;
        responseObject[kHeaders][kHeadersList] = response2.headersList;
        responseObject[kHeaders][kGuard] = "immutable";
        responseList.push(responseObject);
      }
      return Object.freeze(responseList);
    }
    async add(request2) {
      webidl.brandCheck(this, _Cache);
      webidl.argumentLengthCheck(arguments, 1, { header: "Cache.add" });
      request2 = webidl.converters.RequestInfo(request2);
      const requests = [request2];
      const responseArrayPromise = this.addAll(requests);
      return await responseArrayPromise;
    }
    async addAll(requests) {
      webidl.brandCheck(this, _Cache);
      webidl.argumentLengthCheck(arguments, 1, { header: "Cache.addAll" });
      requests = webidl.converters["sequence<RequestInfo>"](requests);
      const responsePromises = [];
      const requestList = [];
      for (const request2 of requests) {
        if (typeof request2 === "string") {
          continue;
        }
        const r = request2[kState];
        if (!urlIsHttpHttpsScheme(r.url) || r.method !== "GET") {
          throw webidl.errors.exception({
            header: "Cache.addAll",
            message: "Expected http/s scheme when method is not GET."
          });
        }
      }
      const fetchControllers = [];
      for (const request2 of requests) {
        const r = new Request3(request2)[kState];
        if (!urlIsHttpHttpsScheme(r.url)) {
          throw webidl.errors.exception({
            header: "Cache.addAll",
            message: "Expected http/s scheme."
          });
        }
        r.initiator = "fetch";
        r.destination = "subresource";
        requestList.push(r);
        const responsePromise = createDeferredPromise();
        fetchControllers.push(fetching({
          request: r,
          dispatcher: getGlobalDispatcher2(),
          processResponse(response2) {
            if (response2.type === "error" || response2.status === 206 || response2.status < 200 || response2.status > 299) {
              responsePromise.reject(webidl.errors.exception({
                header: "Cache.addAll",
                message: "Received an invalid status code or the request failed."
              }));
            } else if (response2.headersList.contains("vary")) {
              const fieldValues = getFieldValues(response2.headersList.get("vary"));
              for (const fieldValue of fieldValues) {
                if (fieldValue === "*") {
                  responsePromise.reject(webidl.errors.exception({
                    header: "Cache.addAll",
                    message: "invalid vary field value"
                  }));
                  for (const controller of fetchControllers) {
                    controller.abort();
                  }
                  return;
                }
              }
            }
          },
          processResponseEndOfBody(response2) {
            if (response2.aborted) {
              responsePromise.reject(new DOMException("aborted", "AbortError"));
              return;
            }
            responsePromise.resolve(response2);
          }
        }));
        responsePromises.push(responsePromise.promise);
      }
      const p = Promise.all(responsePromises);
      const responses = await p;
      const operations = [];
      let index = 0;
      for (const response2 of responses) {
        const operation = {
          type: "put",
          // 7.3.2
          request: requestList[index],
          // 7.3.3
          response: response2
          // 7.3.4
        };
        operations.push(operation);
        index++;
      }
      const cacheJobPromise = createDeferredPromise();
      let errorData = null;
      try {
        __privateMethod(this, _batchCacheOperations, batchCacheOperations_fn).call(this, operations);
      } catch (e) {
        errorData = e;
      }
      queueMicrotask(() => {
        if (errorData === null) {
          cacheJobPromise.resolve(void 0);
        } else {
          cacheJobPromise.reject(errorData);
        }
      });
      return cacheJobPromise.promise;
    }
    async put(request2, response2) {
      webidl.brandCheck(this, _Cache);
      webidl.argumentLengthCheck(arguments, 2, { header: "Cache.put" });
      request2 = webidl.converters.RequestInfo(request2);
      response2 = webidl.converters.Response(response2);
      let innerRequest = null;
      if (request2 instanceof Request3) {
        innerRequest = request2[kState];
      } else {
        innerRequest = new Request3(request2)[kState];
      }
      if (!urlIsHttpHttpsScheme(innerRequest.url) || innerRequest.method !== "GET") {
        throw webidl.errors.exception({
          header: "Cache.put",
          message: "Expected an http/s scheme when method is not GET"
        });
      }
      const innerResponse = response2[kState];
      if (innerResponse.status === 206) {
        throw webidl.errors.exception({
          header: "Cache.put",
          message: "Got 206 status"
        });
      }
      if (innerResponse.headersList.contains("vary")) {
        const fieldValues = getFieldValues(innerResponse.headersList.get("vary"));
        for (const fieldValue of fieldValues) {
          if (fieldValue === "*") {
            throw webidl.errors.exception({
              header: "Cache.put",
              message: "Got * vary field value"
            });
          }
        }
      }
      if (innerResponse.body && (isDisturbed2(innerResponse.body.stream) || innerResponse.body.stream.locked)) {
        throw webidl.errors.exception({
          header: "Cache.put",
          message: "Response body is locked or disturbed"
        });
      }
      const clonedResponse = cloneResponse(innerResponse);
      const bodyReadPromise = createDeferredPromise();
      if (innerResponse.body != null) {
        const stream2 = innerResponse.body.stream;
        const reader = stream2.getReader();
        readAllBytes(
          reader,
          (bytes2) => bodyReadPromise.resolve(bytes2),
          (error) => bodyReadPromise.reject(error)
        );
      } else {
        bodyReadPromise.resolve(void 0);
      }
      const operations = [];
      const operation = {
        type: "put",
        // 14.
        request: innerRequest,
        // 15.
        response: clonedResponse
        // 16.
      };
      operations.push(operation);
      const bytes = await bodyReadPromise.promise;
      if (clonedResponse.body != null) {
        clonedResponse.body.source = bytes;
      }
      const cacheJobPromise = createDeferredPromise();
      let errorData = null;
      try {
        __privateMethod(this, _batchCacheOperations, batchCacheOperations_fn).call(this, operations);
      } catch (e) {
        errorData = e;
      }
      queueMicrotask(() => {
        if (errorData === null) {
          cacheJobPromise.resolve();
        } else {
          cacheJobPromise.reject(errorData);
        }
      });
      return cacheJobPromise.promise;
    }
    async delete(request2, options = {}) {
      webidl.brandCheck(this, _Cache);
      webidl.argumentLengthCheck(arguments, 1, { header: "Cache.delete" });
      request2 = webidl.converters.RequestInfo(request2);
      options = webidl.converters.CacheQueryOptions(options);
      let r = null;
      if (request2 instanceof Request3) {
        r = request2[kState];
        if (r.method !== "GET" && !options.ignoreMethod) {
          return false;
        }
      } else {
        assert2(typeof request2 === "string");
        r = new Request3(request2)[kState];
      }
      const operations = [];
      const operation = {
        type: "delete",
        request: r,
        options
      };
      operations.push(operation);
      const cacheJobPromise = createDeferredPromise();
      let errorData = null;
      let requestResponses;
      try {
        requestResponses = __privateMethod(this, _batchCacheOperations, batchCacheOperations_fn).call(this, operations);
      } catch (e) {
        errorData = e;
      }
      queueMicrotask(() => {
        if (errorData === null) {
          cacheJobPromise.resolve(!!(requestResponses == null ? void 0 : requestResponses.length));
        } else {
          cacheJobPromise.reject(errorData);
        }
      });
      return cacheJobPromise.promise;
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#dom-cache-keys
     * @param {any} request
     * @param {import('../../types/cache').CacheQueryOptions} options
     * @returns {readonly Request[]}
     */
    async keys(request2 = void 0, options = {}) {
      webidl.brandCheck(this, _Cache);
      if (request2 !== void 0)
        request2 = webidl.converters.RequestInfo(request2);
      options = webidl.converters.CacheQueryOptions(options);
      let r = null;
      if (request2 !== void 0) {
        if (request2 instanceof Request3) {
          r = request2[kState];
          if (r.method !== "GET" && !options.ignoreMethod) {
            return [];
          }
        } else if (typeof request2 === "string") {
          r = new Request3(request2)[kState];
        }
      }
      const promise = createDeferredPromise();
      const requests = [];
      if (request2 === void 0) {
        for (const requestResponse of __privateGet(this, _relevantRequestResponseList)) {
          requests.push(requestResponse[0]);
        }
      } else {
        const requestResponses = __privateMethod(this, _queryCache, queryCache_fn).call(this, r, options);
        for (const requestResponse of requestResponses) {
          requests.push(requestResponse[0]);
        }
      }
      queueMicrotask(() => {
        const requestList = [];
        for (const request3 of requests) {
          const requestObject = new Request3("https://a");
          requestObject[kState] = request3;
          requestObject[kHeaders][kHeadersList] = request3.headersList;
          requestObject[kHeaders][kGuard] = "immutable";
          requestObject[kRealm] = request3.client;
          requestList.push(requestObject);
        }
        promise.resolve(Object.freeze(requestList));
      });
      return promise.promise;
    }
  };
  _relevantRequestResponseList = new WeakMap();
  _batchCacheOperations = new WeakSet();
  batchCacheOperations_fn = function(operations) {
    const cache2 = __privateGet(this, _relevantRequestResponseList);
    const backupCache = [...cache2];
    const addedItems = [];
    const resultList = [];
    try {
      for (const operation of operations) {
        if (operation.type !== "delete" && operation.type !== "put") {
          throw webidl.errors.exception({
            header: "Cache.#batchCacheOperations",
            message: 'operation type does not match "delete" or "put"'
          });
        }
        if (operation.type === "delete" && operation.response != null) {
          throw webidl.errors.exception({
            header: "Cache.#batchCacheOperations",
            message: "delete operation should not have an associated response"
          });
        }
        if (__privateMethod(this, _queryCache, queryCache_fn).call(this, operation.request, operation.options, addedItems).length) {
          throw new DOMException("???", "InvalidStateError");
        }
        let requestResponses;
        if (operation.type === "delete") {
          requestResponses = __privateMethod(this, _queryCache, queryCache_fn).call(this, operation.request, operation.options);
          if (requestResponses.length === 0) {
            return [];
          }
          for (const requestResponse of requestResponses) {
            const idx = cache2.indexOf(requestResponse);
            assert2(idx !== -1);
            cache2.splice(idx, 1);
          }
        } else if (operation.type === "put") {
          if (operation.response == null) {
            throw webidl.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "put operation should have an associated response"
            });
          }
          const r = operation.request;
          if (!urlIsHttpHttpsScheme(r.url)) {
            throw webidl.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "expected http or https scheme"
            });
          }
          if (r.method !== "GET") {
            throw webidl.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "not get method"
            });
          }
          if (operation.options != null) {
            throw webidl.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "options must not be defined"
            });
          }
          requestResponses = __privateMethod(this, _queryCache, queryCache_fn).call(this, operation.request);
          for (const requestResponse of requestResponses) {
            const idx = cache2.indexOf(requestResponse);
            assert2(idx !== -1);
            cache2.splice(idx, 1);
          }
          cache2.push([operation.request, operation.response]);
          addedItems.push([operation.request, operation.response]);
        }
        resultList.push([operation.request, operation.response]);
      }
      return resultList;
    } catch (e) {
      __privateGet(this, _relevantRequestResponseList).length = 0;
      __privateSet(this, _relevantRequestResponseList, backupCache);
      throw e;
    }
  };
  _queryCache = new WeakSet();
  queryCache_fn = function(requestQuery, options, targetStorage) {
    const resultList = [];
    const storage = targetStorage ?? __privateGet(this, _relevantRequestResponseList);
    for (const requestResponse of storage) {
      const [cachedRequest, cachedResponse] = requestResponse;
      if (__privateMethod(this, _requestMatchesCachedItem, requestMatchesCachedItem_fn).call(this, requestQuery, cachedRequest, cachedResponse, options)) {
        resultList.push(requestResponse);
      }
    }
    return resultList;
  };
  _requestMatchesCachedItem = new WeakSet();
  requestMatchesCachedItem_fn = function(requestQuery, request2, response2 = null, options) {
    const queryURL = new URL(requestQuery.url);
    const cachedURL = new URL(request2.url);
    if (options == null ? void 0 : options.ignoreSearch) {
      cachedURL.search = "";
      queryURL.search = "";
    }
    if (!urlEquals(queryURL, cachedURL, true)) {
      return false;
    }
    if (response2 == null || (options == null ? void 0 : options.ignoreVary) || !response2.headersList.contains("vary")) {
      return true;
    }
    const fieldValues = getFieldValues(response2.headersList.get("vary"));
    for (const fieldValue of fieldValues) {
      if (fieldValue === "*") {
        return false;
      }
      const requestValue = request2.headersList.get(fieldValue);
      const queryValue = requestQuery.headersList.get(fieldValue);
      if (requestValue !== queryValue) {
        return false;
      }
    }
    return true;
  };
  let Cache = _Cache;
  Object.defineProperties(Cache.prototype, {
    [Symbol.toStringTag]: {
      value: "Cache",
      configurable: true
    },
    match: kEnumerableProperty2,
    matchAll: kEnumerableProperty2,
    add: kEnumerableProperty2,
    addAll: kEnumerableProperty2,
    put: kEnumerableProperty2,
    delete: kEnumerableProperty2,
    keys: kEnumerableProperty2
  });
  const cacheQueryOptionConverters = [
    {
      key: "ignoreSearch",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "ignoreMethod",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "ignoreVary",
      converter: webidl.converters.boolean,
      defaultValue: false
    }
  ];
  webidl.converters.CacheQueryOptions = webidl.dictionaryConverter(cacheQueryOptionConverters);
  webidl.converters.MultiCacheQueryOptions = webidl.dictionaryConverter([
    ...cacheQueryOptionConverters,
    {
      key: "cacheName",
      converter: webidl.converters.DOMString
    }
  ]);
  webidl.converters.Response = webidl.interfaceConverter(Response2);
  webidl.converters["sequence<RequestInfo>"] = webidl.sequenceConverter(
    webidl.converters.RequestInfo
  );
  cache = {
    Cache
  };
  return cache;
}
var cachestorage;
var hasRequiredCachestorage;
function requireCachestorage() {
  var _caches;
  if (hasRequiredCachestorage)
    return cachestorage;
  hasRequiredCachestorage = 1;
  const { kConstruct } = requireSymbols$1();
  const { Cache } = requireCache();
  const { webidl } = requireWebidl();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$j;
  const _CacheStorage = class _CacheStorage {
    constructor() {
      /**
       * @see https://w3c.github.io/ServiceWorker/#dfn-relevant-name-to-cache-map
       * @type {Map<string, import('./cache').requestResponseList}
       */
      __privateAdd(this, _caches, /* @__PURE__ */ new Map());
      if (arguments[0] !== kConstruct) {
        webidl.illegalConstructor();
      }
    }
    async match(request2, options = {}) {
      webidl.brandCheck(this, _CacheStorage);
      webidl.argumentLengthCheck(arguments, 1, { header: "CacheStorage.match" });
      request2 = webidl.converters.RequestInfo(request2);
      options = webidl.converters.MultiCacheQueryOptions(options);
      if (options.cacheName != null) {
        if (__privateGet(this, _caches).has(options.cacheName)) {
          const cacheList = __privateGet(this, _caches).get(options.cacheName);
          const cache2 = new Cache(kConstruct, cacheList);
          return await cache2.match(request2, options);
        }
      } else {
        for (const cacheList of __privateGet(this, _caches).values()) {
          const cache2 = new Cache(kConstruct, cacheList);
          const response2 = await cache2.match(request2, options);
          if (response2 !== void 0) {
            return response2;
          }
        }
      }
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#cache-storage-has
     * @param {string} cacheName
     * @returns {Promise<boolean>}
     */
    async has(cacheName) {
      webidl.brandCheck(this, _CacheStorage);
      webidl.argumentLengthCheck(arguments, 1, { header: "CacheStorage.has" });
      cacheName = webidl.converters.DOMString(cacheName);
      return __privateGet(this, _caches).has(cacheName);
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#dom-cachestorage-open
     * @param {string} cacheName
     * @returns {Promise<Cache>}
     */
    async open(cacheName) {
      webidl.brandCheck(this, _CacheStorage);
      webidl.argumentLengthCheck(arguments, 1, { header: "CacheStorage.open" });
      cacheName = webidl.converters.DOMString(cacheName);
      if (__privateGet(this, _caches).has(cacheName)) {
        const cache3 = __privateGet(this, _caches).get(cacheName);
        return new Cache(kConstruct, cache3);
      }
      const cache2 = [];
      __privateGet(this, _caches).set(cacheName, cache2);
      return new Cache(kConstruct, cache2);
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#cache-storage-delete
     * @param {string} cacheName
     * @returns {Promise<boolean>}
     */
    async delete(cacheName) {
      webidl.brandCheck(this, _CacheStorage);
      webidl.argumentLengthCheck(arguments, 1, { header: "CacheStorage.delete" });
      cacheName = webidl.converters.DOMString(cacheName);
      return __privateGet(this, _caches).delete(cacheName);
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#cache-storage-keys
     * @returns {string[]}
     */
    async keys() {
      webidl.brandCheck(this, _CacheStorage);
      const keys = __privateGet(this, _caches).keys();
      return [...keys];
    }
  };
  _caches = new WeakMap();
  let CacheStorage = _CacheStorage;
  Object.defineProperties(CacheStorage.prototype, {
    [Symbol.toStringTag]: {
      value: "CacheStorage",
      configurable: true
    },
    match: kEnumerableProperty2,
    has: kEnumerableProperty2,
    open: kEnumerableProperty2,
    delete: kEnumerableProperty2,
    keys: kEnumerableProperty2
  });
  cachestorage = {
    CacheStorage
  };
  return cachestorage;
}
var constants$1;
var hasRequiredConstants$1;
function requireConstants$1() {
  if (hasRequiredConstants$1)
    return constants$1;
  hasRequiredConstants$1 = 1;
  const maxAttributeValueSize = 1024;
  const maxNameValuePairSize = 4096;
  constants$1 = {
    maxAttributeValueSize,
    maxNameValuePairSize
  };
  return constants$1;
}
var util$2;
var hasRequiredUtil$1;
function requireUtil$1() {
  if (hasRequiredUtil$1)
    return util$2;
  hasRequiredUtil$1 = 1;
  const assert2 = require$$0$1;
  const { kHeadersList } = symbols$4;
  function isCTLExcludingHtab(value) {
    if (value.length === 0) {
      return false;
    }
    for (const char of value) {
      const code = char.charCodeAt(0);
      if (code >= 0 || code <= 8 || (code >= 10 || code <= 31) || code === 127) {
        return false;
      }
    }
  }
  function validateCookieName(name) {
    for (const char of name) {
      const code = char.charCodeAt(0);
      if (code <= 32 || code > 127 || char === "(" || char === ")" || char === ">" || char === "<" || char === "@" || char === "," || char === ";" || char === ":" || char === "\\" || char === '"' || char === "/" || char === "[" || char === "]" || char === "?" || char === "=" || char === "{" || char === "}") {
        throw new Error("Invalid cookie name");
      }
    }
  }
  function validateCookieValue(value) {
    for (const char of value) {
      const code = char.charCodeAt(0);
      if (code < 33 || // exclude CTLs (0-31)
      code === 34 || code === 44 || code === 59 || code === 92 || code > 126) {
        throw new Error("Invalid header value");
      }
    }
  }
  function validateCookiePath(path) {
    for (const char of path) {
      const code = char.charCodeAt(0);
      if (code < 33 || char === ";") {
        throw new Error("Invalid cookie path");
      }
    }
  }
  function validateCookieDomain(domain) {
    if (domain.startsWith("-") || domain.endsWith(".") || domain.endsWith("-")) {
      throw new Error("Invalid cookie domain");
    }
  }
  function toIMFDate(date) {
    if (typeof date === "number") {
      date = new Date(date);
    }
    const days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const dayName = days[date.getUTCDay()];
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hour = date.getUTCHours().toString().padStart(2, "0");
    const minute = date.getUTCMinutes().toString().padStart(2, "0");
    const second = date.getUTCSeconds().toString().padStart(2, "0");
    return `${dayName}, ${day} ${month} ${year} ${hour}:${minute}:${second} GMT`;
  }
  function validateCookieMaxAge(maxAge) {
    if (maxAge < 0) {
      throw new Error("Invalid cookie max-age");
    }
  }
  function stringify2(cookie) {
    if (cookie.name.length === 0) {
      return null;
    }
    validateCookieName(cookie.name);
    validateCookieValue(cookie.value);
    const out = [`${cookie.name}=${cookie.value}`];
    if (cookie.name.startsWith("__Secure-")) {
      cookie.secure = true;
    }
    if (cookie.name.startsWith("__Host-")) {
      cookie.secure = true;
      cookie.domain = null;
      cookie.path = "/";
    }
    if (cookie.secure) {
      out.push("Secure");
    }
    if (cookie.httpOnly) {
      out.push("HttpOnly");
    }
    if (typeof cookie.maxAge === "number") {
      validateCookieMaxAge(cookie.maxAge);
      out.push(`Max-Age=${cookie.maxAge}`);
    }
    if (cookie.domain) {
      validateCookieDomain(cookie.domain);
      out.push(`Domain=${cookie.domain}`);
    }
    if (cookie.path) {
      validateCookiePath(cookie.path);
      out.push(`Path=${cookie.path}`);
    }
    if (cookie.expires && cookie.expires.toString() !== "Invalid Date") {
      out.push(`Expires=${toIMFDate(cookie.expires)}`);
    }
    if (cookie.sameSite) {
      out.push(`SameSite=${cookie.sameSite}`);
    }
    for (const part of cookie.unparsed) {
      if (!part.includes("=")) {
        throw new Error("Invalid unparsed");
      }
      const [key, ...value] = part.split("=");
      out.push(`${key.trim()}=${value.join("=")}`);
    }
    return out.join("; ");
  }
  let kHeadersListNode;
  function getHeadersList(headers2) {
    if (headers2[kHeadersList]) {
      return headers2[kHeadersList];
    }
    if (!kHeadersListNode) {
      kHeadersListNode = Object.getOwnPropertySymbols(headers2).find(
        (symbol) => symbol.description === "headers list"
      );
      assert2(kHeadersListNode, "Headers cannot be parsed");
    }
    const headersList = headers2[kHeadersListNode];
    assert2(headersList);
    return headersList;
  }
  util$2 = {
    isCTLExcludingHtab,
    stringify: stringify2,
    getHeadersList
  };
  return util$2;
}
var parse;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse)
    return parse;
  hasRequiredParse = 1;
  const { maxNameValuePairSize, maxAttributeValueSize } = requireConstants$1();
  const { isCTLExcludingHtab } = requireUtil$1();
  const { collectASequenceOfCodePointsFast } = requireDataURL();
  const assert2 = require$$0$1;
  function parseSetCookie(header) {
    if (isCTLExcludingHtab(header)) {
      return null;
    }
    let nameValuePair = "";
    let unparsedAttributes = "";
    let name = "";
    let value = "";
    if (header.includes(";")) {
      const position = { position: 0 };
      nameValuePair = collectASequenceOfCodePointsFast(";", header, position);
      unparsedAttributes = header.slice(position.position);
    } else {
      nameValuePair = header;
    }
    if (!nameValuePair.includes("=")) {
      value = nameValuePair;
    } else {
      const position = { position: 0 };
      name = collectASequenceOfCodePointsFast(
        "=",
        nameValuePair,
        position
      );
      value = nameValuePair.slice(position.position + 1);
    }
    name = name.trim();
    value = value.trim();
    if (name.length + value.length > maxNameValuePairSize) {
      return null;
    }
    return {
      name,
      value,
      ...parseUnparsedAttributes(unparsedAttributes)
    };
  }
  function parseUnparsedAttributes(unparsedAttributes, cookieAttributeList = {}) {
    if (unparsedAttributes.length === 0) {
      return cookieAttributeList;
    }
    assert2(unparsedAttributes[0] === ";");
    unparsedAttributes = unparsedAttributes.slice(1);
    let cookieAv = "";
    if (unparsedAttributes.includes(";")) {
      cookieAv = collectASequenceOfCodePointsFast(
        ";",
        unparsedAttributes,
        { position: 0 }
      );
      unparsedAttributes = unparsedAttributes.slice(cookieAv.length);
    } else {
      cookieAv = unparsedAttributes;
      unparsedAttributes = "";
    }
    let attributeName = "";
    let attributeValue = "";
    if (cookieAv.includes("=")) {
      const position = { position: 0 };
      attributeName = collectASequenceOfCodePointsFast(
        "=",
        cookieAv,
        position
      );
      attributeValue = cookieAv.slice(position.position + 1);
    } else {
      attributeName = cookieAv;
    }
    attributeName = attributeName.trim();
    attributeValue = attributeValue.trim();
    if (attributeValue.length > maxAttributeValueSize) {
      return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
    }
    const attributeNameLowercase = attributeName.toLowerCase();
    if (attributeNameLowercase === "expires") {
      const expiryTime = new Date(attributeValue);
      cookieAttributeList.expires = expiryTime;
    } else if (attributeNameLowercase === "max-age") {
      const charCode = attributeValue.charCodeAt(0);
      if ((charCode < 48 || charCode > 57) && attributeValue[0] !== "-") {
        return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
      }
      if (!/^\d+$/.test(attributeValue)) {
        return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
      }
      const deltaSeconds = Number(attributeValue);
      cookieAttributeList.maxAge = deltaSeconds;
    } else if (attributeNameLowercase === "domain") {
      let cookieDomain = attributeValue;
      if (cookieDomain[0] === ".") {
        cookieDomain = cookieDomain.slice(1);
      }
      cookieDomain = cookieDomain.toLowerCase();
      cookieAttributeList.domain = cookieDomain;
    } else if (attributeNameLowercase === "path") {
      let cookiePath = "";
      if (attributeValue.length === 0 || attributeValue[0] !== "/") {
        cookiePath = "/";
      } else {
        cookiePath = attributeValue;
      }
      cookieAttributeList.path = cookiePath;
    } else if (attributeNameLowercase === "secure") {
      cookieAttributeList.secure = true;
    } else if (attributeNameLowercase === "httponly") {
      cookieAttributeList.httpOnly = true;
    } else if (attributeNameLowercase === "samesite") {
      let enforcement = "Default";
      const attributeValueLowercase = attributeValue.toLowerCase();
      if (attributeValueLowercase.includes("none")) {
        enforcement = "None";
      }
      if (attributeValueLowercase.includes("strict")) {
        enforcement = "Strict";
      }
      if (attributeValueLowercase.includes("lax")) {
        enforcement = "Lax";
      }
      cookieAttributeList.sameSite = enforcement;
    } else {
      cookieAttributeList.unparsed ?? (cookieAttributeList.unparsed = []);
      cookieAttributeList.unparsed.push(`${attributeName}=${attributeValue}`);
    }
    return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
  }
  parse = {
    parseSetCookie,
    parseUnparsedAttributes
  };
  return parse;
}
var cookies;
var hasRequiredCookies;
function requireCookies() {
  if (hasRequiredCookies)
    return cookies;
  hasRequiredCookies = 1;
  const { parseSetCookie } = requireParse();
  const { stringify: stringify2, getHeadersList } = requireUtil$1();
  const { webidl } = requireWebidl();
  const { Headers: Headers2 } = requireHeaders();
  function getCookies(headers2) {
    webidl.argumentLengthCheck(arguments, 1, { header: "getCookies" });
    webidl.brandCheck(headers2, Headers2, { strict: false });
    const cookie = headers2.get("cookie");
    const out = {};
    if (!cookie) {
      return out;
    }
    for (const piece of cookie.split(";")) {
      const [name, ...value] = piece.split("=");
      out[name.trim()] = value.join("=");
    }
    return out;
  }
  function deleteCookie(headers2, name, attributes) {
    webidl.argumentLengthCheck(arguments, 2, { header: "deleteCookie" });
    webidl.brandCheck(headers2, Headers2, { strict: false });
    name = webidl.converters.DOMString(name);
    attributes = webidl.converters.DeleteCookieAttributes(attributes);
    setCookie(headers2, {
      name,
      value: "",
      expires: /* @__PURE__ */ new Date(0),
      ...attributes
    });
  }
  function getSetCookies(headers2) {
    webidl.argumentLengthCheck(arguments, 1, { header: "getSetCookies" });
    webidl.brandCheck(headers2, Headers2, { strict: false });
    const cookies2 = getHeadersList(headers2).cookies;
    if (!cookies2) {
      return [];
    }
    return cookies2.map((pair) => parseSetCookie(Array.isArray(pair) ? pair[1] : pair));
  }
  function setCookie(headers2, cookie) {
    webidl.argumentLengthCheck(arguments, 2, { header: "setCookie" });
    webidl.brandCheck(headers2, Headers2, { strict: false });
    cookie = webidl.converters.Cookie(cookie);
    const str = stringify2(cookie);
    if (str) {
      headers2.append("Set-Cookie", stringify2(cookie));
    }
  }
  webidl.converters.DeleteCookieAttributes = webidl.dictionaryConverter([
    {
      converter: webidl.nullableConverter(webidl.converters.DOMString),
      key: "path",
      defaultValue: null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.DOMString),
      key: "domain",
      defaultValue: null
    }
  ]);
  webidl.converters.Cookie = webidl.dictionaryConverter([
    {
      converter: webidl.converters.DOMString,
      key: "name"
    },
    {
      converter: webidl.converters.DOMString,
      key: "value"
    },
    {
      converter: webidl.nullableConverter((value) => {
        if (typeof value === "number") {
          return webidl.converters["unsigned long long"](value);
        }
        return new Date(value);
      }),
      key: "expires",
      defaultValue: null
    },
    {
      converter: webidl.nullableConverter(webidl.converters["long long"]),
      key: "maxAge",
      defaultValue: null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.DOMString),
      key: "domain",
      defaultValue: null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.DOMString),
      key: "path",
      defaultValue: null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.boolean),
      key: "secure",
      defaultValue: null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.boolean),
      key: "httpOnly",
      defaultValue: null
    },
    {
      converter: webidl.converters.USVString,
      key: "sameSite",
      allowedValues: ["Strict", "Lax", "None"]
    },
    {
      converter: webidl.sequenceConverter(webidl.converters.DOMString),
      key: "unparsed",
      defaultValue: []
    }
  ]);
  cookies = {
    getCookies,
    deleteCookie,
    getSetCookies,
    setCookie
  };
  return cookies;
}
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants)
    return constants;
  hasRequiredConstants = 1;
  const uid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
  const staticPropertyDescriptors = {
    enumerable: true,
    writable: false,
    configurable: false
  };
  const states = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
  };
  const opcodes = {
    CONTINUATION: 0,
    TEXT: 1,
    BINARY: 2,
    CLOSE: 8,
    PING: 9,
    PONG: 10
  };
  const maxUnsigned16Bit = 2 ** 16 - 1;
  const parserStates = {
    INFO: 0,
    PAYLOADLENGTH_16: 2,
    PAYLOADLENGTH_64: 3,
    READ_DATA: 4
  };
  const emptyBuffer = Buffer.allocUnsafe(0);
  constants = {
    uid,
    staticPropertyDescriptors,
    states,
    opcodes,
    maxUnsigned16Bit,
    parserStates,
    emptyBuffer
  };
  return constants;
}
var symbols;
var hasRequiredSymbols;
function requireSymbols() {
  if (hasRequiredSymbols)
    return symbols;
  hasRequiredSymbols = 1;
  symbols = {
    kWebSocketURL: Symbol("url"),
    kReadyState: Symbol("ready state"),
    kController: Symbol("controller"),
    kResponse: Symbol("response"),
    kBinaryType: Symbol("binary type"),
    kSentClose: Symbol("sent close"),
    kReceivedClose: Symbol("received close"),
    kByteParser: Symbol("byte parser")
  };
  return symbols;
}
var events;
var hasRequiredEvents;
function requireEvents() {
  var _eventInit, _eventInit2, _eventInit3;
  if (hasRequiredEvents)
    return events;
  hasRequiredEvents = 1;
  const { webidl } = requireWebidl();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$j;
  const { MessagePort } = require$$0$5;
  const _MessageEvent = class _MessageEvent extends Event {
    constructor(type, eventInitDict = {}) {
      webidl.argumentLengthCheck(arguments, 1, { header: "MessageEvent constructor" });
      type = webidl.converters.DOMString(type);
      eventInitDict = webidl.converters.MessageEventInit(eventInitDict);
      super(type, eventInitDict);
      __privateAdd(this, _eventInit, void 0);
      __privateSet(this, _eventInit, eventInitDict);
    }
    get data() {
      webidl.brandCheck(this, _MessageEvent);
      return __privateGet(this, _eventInit).data;
    }
    get origin() {
      webidl.brandCheck(this, _MessageEvent);
      return __privateGet(this, _eventInit).origin;
    }
    get lastEventId() {
      webidl.brandCheck(this, _MessageEvent);
      return __privateGet(this, _eventInit).lastEventId;
    }
    get source() {
      webidl.brandCheck(this, _MessageEvent);
      return __privateGet(this, _eventInit).source;
    }
    get ports() {
      webidl.brandCheck(this, _MessageEvent);
      if (!Object.isFrozen(__privateGet(this, _eventInit).ports)) {
        Object.freeze(__privateGet(this, _eventInit).ports);
      }
      return __privateGet(this, _eventInit).ports;
    }
    initMessageEvent(type, bubbles = false, cancelable = false, data = null, origin = "", lastEventId = "", source = null, ports = []) {
      webidl.brandCheck(this, _MessageEvent);
      webidl.argumentLengthCheck(arguments, 1, { header: "MessageEvent.initMessageEvent" });
      return new _MessageEvent(type, {
        bubbles,
        cancelable,
        data,
        origin,
        lastEventId,
        source,
        ports
      });
    }
  };
  _eventInit = new WeakMap();
  let MessageEvent = _MessageEvent;
  const _CloseEvent = class _CloseEvent extends Event {
    constructor(type, eventInitDict = {}) {
      webidl.argumentLengthCheck(arguments, 1, { header: "CloseEvent constructor" });
      type = webidl.converters.DOMString(type);
      eventInitDict = webidl.converters.CloseEventInit(eventInitDict);
      super(type, eventInitDict);
      __privateAdd(this, _eventInit2, void 0);
      __privateSet(this, _eventInit2, eventInitDict);
    }
    get wasClean() {
      webidl.brandCheck(this, _CloseEvent);
      return __privateGet(this, _eventInit2).wasClean;
    }
    get code() {
      webidl.brandCheck(this, _CloseEvent);
      return __privateGet(this, _eventInit2).code;
    }
    get reason() {
      webidl.brandCheck(this, _CloseEvent);
      return __privateGet(this, _eventInit2).reason;
    }
  };
  _eventInit2 = new WeakMap();
  let CloseEvent = _CloseEvent;
  const _ErrorEvent = class _ErrorEvent extends Event {
    constructor(type, eventInitDict) {
      webidl.argumentLengthCheck(arguments, 1, { header: "ErrorEvent constructor" });
      super(type, eventInitDict);
      __privateAdd(this, _eventInit3, void 0);
      type = webidl.converters.DOMString(type);
      eventInitDict = webidl.converters.ErrorEventInit(eventInitDict ?? {});
      __privateSet(this, _eventInit3, eventInitDict);
    }
    get message() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).message;
    }
    get filename() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).filename;
    }
    get lineno() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).lineno;
    }
    get colno() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).colno;
    }
    get error() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).error;
    }
  };
  _eventInit3 = new WeakMap();
  let ErrorEvent = _ErrorEvent;
  Object.defineProperties(MessageEvent.prototype, {
    [Symbol.toStringTag]: {
      value: "MessageEvent",
      configurable: true
    },
    data: kEnumerableProperty2,
    origin: kEnumerableProperty2,
    lastEventId: kEnumerableProperty2,
    source: kEnumerableProperty2,
    ports: kEnumerableProperty2,
    initMessageEvent: kEnumerableProperty2
  });
  Object.defineProperties(CloseEvent.prototype, {
    [Symbol.toStringTag]: {
      value: "CloseEvent",
      configurable: true
    },
    reason: kEnumerableProperty2,
    code: kEnumerableProperty2,
    wasClean: kEnumerableProperty2
  });
  Object.defineProperties(ErrorEvent.prototype, {
    [Symbol.toStringTag]: {
      value: "ErrorEvent",
      configurable: true
    },
    message: kEnumerableProperty2,
    filename: kEnumerableProperty2,
    lineno: kEnumerableProperty2,
    colno: kEnumerableProperty2,
    error: kEnumerableProperty2
  });
  webidl.converters.MessagePort = webidl.interfaceConverter(MessagePort);
  webidl.converters["sequence<MessagePort>"] = webidl.sequenceConverter(
    webidl.converters.MessagePort
  );
  const eventInit = [
    {
      key: "bubbles",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "cancelable",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "composed",
      converter: webidl.converters.boolean,
      defaultValue: false
    }
  ];
  webidl.converters.MessageEventInit = webidl.dictionaryConverter([
    ...eventInit,
    {
      key: "data",
      converter: webidl.converters.any,
      defaultValue: null
    },
    {
      key: "origin",
      converter: webidl.converters.USVString,
      defaultValue: ""
    },
    {
      key: "lastEventId",
      converter: webidl.converters.DOMString,
      defaultValue: ""
    },
    {
      key: "source",
      // Node doesn't implement WindowProxy or ServiceWorker, so the only
      // valid value for source is a MessagePort.
      converter: webidl.nullableConverter(webidl.converters.MessagePort),
      defaultValue: null
    },
    {
      key: "ports",
      converter: webidl.converters["sequence<MessagePort>"],
      get defaultValue() {
        return [];
      }
    }
  ]);
  webidl.converters.CloseEventInit = webidl.dictionaryConverter([
    ...eventInit,
    {
      key: "wasClean",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "code",
      converter: webidl.converters["unsigned short"],
      defaultValue: 0
    },
    {
      key: "reason",
      converter: webidl.converters.USVString,
      defaultValue: ""
    }
  ]);
  webidl.converters.ErrorEventInit = webidl.dictionaryConverter([
    ...eventInit,
    {
      key: "message",
      converter: webidl.converters.DOMString,
      defaultValue: ""
    },
    {
      key: "filename",
      converter: webidl.converters.USVString,
      defaultValue: ""
    },
    {
      key: "lineno",
      converter: webidl.converters["unsigned long"],
      defaultValue: 0
    },
    {
      key: "colno",
      converter: webidl.converters["unsigned long"],
      defaultValue: 0
    },
    {
      key: "error",
      converter: webidl.converters.any
    }
  ]);
  events = {
    MessageEvent,
    CloseEvent,
    ErrorEvent
  };
  return events;
}
var util$1;
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil)
    return util$1;
  hasRequiredUtil = 1;
  const { kReadyState, kController, kResponse, kBinaryType, kWebSocketURL } = requireSymbols();
  const { states, opcodes } = requireConstants();
  const { MessageEvent, ErrorEvent } = requireEvents();
  function isEstablished(ws) {
    return ws[kReadyState] === states.OPEN;
  }
  function isClosing(ws) {
    return ws[kReadyState] === states.CLOSING;
  }
  function isClosed(ws) {
    return ws[kReadyState] === states.CLOSED;
  }
  function fireEvent(e, target, eventConstructor = Event, eventInitDict) {
    const event = new eventConstructor(e, eventInitDict);
    target.dispatchEvent(event);
  }
  function websocketMessageReceived(ws, type, data) {
    if (ws[kReadyState] !== states.OPEN) {
      return;
    }
    let dataForEvent;
    if (type === opcodes.TEXT) {
      try {
        dataForEvent = new TextDecoder("utf-8", { fatal: true }).decode(data);
      } catch {
        failWebsocketConnection(ws, "Received invalid UTF-8 in text frame.");
        return;
      }
    } else if (type === opcodes.BINARY) {
      if (ws[kBinaryType] === "blob") {
        dataForEvent = new Blob([data]);
      } else {
        dataForEvent = new Uint8Array(data).buffer;
      }
    }
    fireEvent("message", ws, MessageEvent, {
      origin: ws[kWebSocketURL].origin,
      data: dataForEvent
    });
  }
  function isValidSubprotocol(protocol) {
    if (protocol.length === 0) {
      return false;
    }
    for (const char of protocol) {
      const code = char.charCodeAt(0);
      if (code < 33 || code > 126 || char === "(" || char === ")" || char === "<" || char === ">" || char === "@" || char === "," || char === ";" || char === ":" || char === "\\" || char === '"' || char === "/" || char === "[" || char === "]" || char === "?" || char === "=" || char === "{" || char === "}" || code === 32 || // SP
      code === 9) {
        return false;
      }
    }
    return true;
  }
  function isValidStatusCode(code) {
    if (code >= 1e3 && code < 1015) {
      return code !== 1004 && // reserved
      code !== 1005 && // "MUST NOT be set as a status code"
      code !== 1006;
    }
    return code >= 3e3 && code <= 4999;
  }
  function failWebsocketConnection(ws, reason) {
    const { [kController]: controller, [kResponse]: response2 } = ws;
    controller.abort();
    if ((response2 == null ? void 0 : response2.socket) && !response2.socket.destroyed) {
      response2.socket.destroy();
    }
    if (reason) {
      fireEvent("error", ws, ErrorEvent, {
        error: new Error(reason)
      });
    }
  }
  util$1 = {
    isEstablished,
    isClosing,
    isClosed,
    fireEvent,
    isValidSubprotocol,
    isValidStatusCode,
    failWebsocketConnection,
    websocketMessageReceived
  };
  return util$1;
}
var connection;
var hasRequiredConnection;
function requireConnection() {
  if (hasRequiredConnection)
    return connection;
  hasRequiredConnection = 1;
  const { randomBytes, createHash } = require$$0$7;
  const diagnosticsChannel = require$$1$1;
  const { uid, states } = requireConstants();
  const {
    kReadyState,
    kSentClose,
    kByteParser,
    kReceivedClose
  } = requireSymbols();
  const { fireEvent, failWebsocketConnection } = requireUtil();
  const { CloseEvent } = requireEvents();
  const { makeRequest } = requireRequest();
  const { fetching } = requireFetch();
  const { Headers: Headers2 } = requireHeaders();
  const { getGlobalDispatcher: getGlobalDispatcher2 } = global$1;
  const { kHeadersList } = symbols$4;
  const channels2 = {};
  channels2.open = diagnosticsChannel.channel("undici:websocket:open");
  channels2.close = diagnosticsChannel.channel("undici:websocket:close");
  channels2.socketError = diagnosticsChannel.channel("undici:websocket:socket_error");
  function establishWebSocketConnection(url2, protocols, ws, onEstablish, options) {
    const requestURL = url2;
    requestURL.protocol = url2.protocol === "ws:" ? "http:" : "https:";
    const request2 = makeRequest({
      urlList: [requestURL],
      serviceWorkers: "none",
      referrer: "no-referrer",
      mode: "websocket",
      credentials: "include",
      cache: "no-store",
      redirect: "error"
    });
    if (options.headers) {
      const headersList = new Headers2(options.headers)[kHeadersList];
      request2.headersList = headersList;
    }
    const keyValue = randomBytes(16).toString("base64");
    request2.headersList.append("sec-websocket-key", keyValue);
    request2.headersList.append("sec-websocket-version", "13");
    for (const protocol of protocols) {
      request2.headersList.append("sec-websocket-protocol", protocol);
    }
    const permessageDeflate = "";
    const controller = fetching({
      request: request2,
      useParallelQueue: true,
      dispatcher: options.dispatcher ?? getGlobalDispatcher2(),
      processResponse(response2) {
        var _a2, _b2;
        if (response2.type === "error" || response2.status !== 101) {
          failWebsocketConnection(ws, "Received network error or non-101 status code.");
          return;
        }
        if (protocols.length !== 0 && !response2.headersList.get("Sec-WebSocket-Protocol")) {
          failWebsocketConnection(ws, "Server did not respond with sent protocols.");
          return;
        }
        if (((_a2 = response2.headersList.get("Upgrade")) == null ? void 0 : _a2.toLowerCase()) !== "websocket") {
          failWebsocketConnection(ws, 'Server did not set Upgrade header to "websocket".');
          return;
        }
        if (((_b2 = response2.headersList.get("Connection")) == null ? void 0 : _b2.toLowerCase()) !== "upgrade") {
          failWebsocketConnection(ws, 'Server did not set Connection header to "upgrade".');
          return;
        }
        const secWSAccept = response2.headersList.get("Sec-WebSocket-Accept");
        const digest = createHash("sha1").update(keyValue + uid).digest("base64");
        if (secWSAccept !== digest) {
          failWebsocketConnection(ws, "Incorrect hash received in Sec-WebSocket-Accept header.");
          return;
        }
        const secExtension = response2.headersList.get("Sec-WebSocket-Extensions");
        if (secExtension !== null && secExtension !== permessageDeflate) {
          failWebsocketConnection(ws, "Received different permessage-deflate than the one set.");
          return;
        }
        const secProtocol = response2.headersList.get("Sec-WebSocket-Protocol");
        if (secProtocol !== null && secProtocol !== request2.headersList.get("Sec-WebSocket-Protocol")) {
          failWebsocketConnection(ws, "Protocol was not set in the opening handshake.");
          return;
        }
        response2.socket.on("data", onSocketData);
        response2.socket.on("close", onSocketClose2);
        response2.socket.on("error", onSocketError2);
        if (channels2.open.hasSubscribers) {
          channels2.open.publish({
            address: response2.socket.address(),
            protocol: secProtocol,
            extensions: secExtension
          });
        }
        onEstablish(response2);
      }
    });
    return controller;
  }
  function onSocketData(chunk) {
    if (!this.ws[kByteParser].write(chunk)) {
      this.pause();
    }
  }
  function onSocketClose2() {
    const { ws } = this;
    const wasClean = ws[kSentClose] && ws[kReceivedClose];
    let code = 1005;
    let reason = "";
    const result = ws[kByteParser].closingInfo;
    if (result) {
      code = result.code ?? 1005;
      reason = result.reason;
    } else if (!ws[kSentClose]) {
      code = 1006;
    }
    ws[kReadyState] = states.CLOSED;
    fireEvent("close", ws, CloseEvent, {
      wasClean,
      code,
      reason
    });
    if (channels2.close.hasSubscribers) {
      channels2.close.publish({
        websocket: ws,
        code,
        reason
      });
    }
  }
  function onSocketError2(error) {
    const { ws } = this;
    ws[kReadyState] = states.CLOSING;
    if (channels2.socketError.hasSubscribers) {
      channels2.socketError.publish(error);
    }
    this.destroy();
  }
  connection = {
    establishWebSocketConnection
  };
  return connection;
}
var frame;
var hasRequiredFrame;
function requireFrame() {
  if (hasRequiredFrame)
    return frame;
  hasRequiredFrame = 1;
  const { randomBytes } = require$$0$7;
  const { maxUnsigned16Bit } = requireConstants();
  class WebsocketFrameSend {
    /**
     * @param {Buffer|undefined} data
     */
    constructor(data) {
      this.frameData = data;
      this.maskKey = randomBytes(4);
    }
    createFrame(opcode) {
      var _a2;
      const bodyLength2 = ((_a2 = this.frameData) == null ? void 0 : _a2.byteLength) ?? 0;
      let payloadLength = bodyLength2;
      let offset = 6;
      if (bodyLength2 > maxUnsigned16Bit) {
        offset += 8;
        payloadLength = 127;
      } else if (bodyLength2 > 125) {
        offset += 2;
        payloadLength = 126;
      }
      const buffer = Buffer.allocUnsafe(bodyLength2 + offset);
      buffer[0] = buffer[1] = 0;
      buffer[0] |= 128;
      buffer[0] = (buffer[0] & 240) + opcode;
      /*! ws. MIT License. Einar Otto Stangvik <einaros@gmail.com> */
      buffer[offset - 4] = this.maskKey[0];
      buffer[offset - 3] = this.maskKey[1];
      buffer[offset - 2] = this.maskKey[2];
      buffer[offset - 1] = this.maskKey[3];
      buffer[1] = payloadLength;
      if (payloadLength === 126) {
        buffer.writeUInt16BE(bodyLength2, 2);
      } else if (payloadLength === 127) {
        buffer[2] = buffer[3] = 0;
        buffer.writeUIntBE(bodyLength2, 4, 6);
      }
      buffer[1] |= 128;
      for (let i = 0; i < bodyLength2; i++) {
        buffer[offset + i] = this.frameData[i] ^ this.maskKey[i % 4];
      }
      return buffer;
    }
  }
  frame = {
    WebsocketFrameSend
  };
  return frame;
}
var receiver;
var hasRequiredReceiver;
function requireReceiver() {
  var _buffers, _byteOffset, _state, _info, _fragments;
  if (hasRequiredReceiver)
    return receiver;
  hasRequiredReceiver = 1;
  const { Writable } = require$$0$3;
  const diagnosticsChannel = require$$1$1;
  const { parserStates, opcodes, states, emptyBuffer } = requireConstants();
  const { kReadyState, kSentClose, kResponse, kReceivedClose } = requireSymbols();
  const { isValidStatusCode, failWebsocketConnection, websocketMessageReceived } = requireUtil();
  const { WebsocketFrameSend } = requireFrame();
  const channels2 = {};
  channels2.ping = diagnosticsChannel.channel("undici:websocket:ping");
  channels2.pong = diagnosticsChannel.channel("undici:websocket:pong");
  class ByteParser extends Writable {
    constructor(ws) {
      super();
      __privateAdd(this, _buffers, []);
      __privateAdd(this, _byteOffset, 0);
      __privateAdd(this, _state, parserStates.INFO);
      __privateAdd(this, _info, {});
      __privateAdd(this, _fragments, []);
      this.ws = ws;
    }
    /**
     * @param {Buffer} chunk
     * @param {() => void} callback
     */
    _write(chunk, _, callback) {
      __privateGet(this, _buffers).push(chunk);
      __privateSet(this, _byteOffset, __privateGet(this, _byteOffset) + chunk.length);
      this.run(callback);
    }
    /**
     * Runs whenever a new chunk is received.
     * Callback is called whenever there are no more chunks buffering,
     * or not enough bytes are buffered to parse.
     */
    run(callback) {
      var _a2;
      while (true) {
        if (__privateGet(this, _state) === parserStates.INFO) {
          if (__privateGet(this, _byteOffset) < 2) {
            return callback();
          }
          const buffer = this.consume(2);
          __privateGet(this, _info).fin = (buffer[0] & 128) !== 0;
          __privateGet(this, _info).opcode = buffer[0] & 15;
          (_a2 = __privateGet(this, _info)).originalOpcode ?? (_a2.originalOpcode = __privateGet(this, _info).opcode);
          __privateGet(this, _info).fragmented = !__privateGet(this, _info).fin && __privateGet(this, _info).opcode !== opcodes.CONTINUATION;
          if (__privateGet(this, _info).fragmented && __privateGet(this, _info).opcode !== opcodes.BINARY && __privateGet(this, _info).opcode !== opcodes.TEXT) {
            failWebsocketConnection(this.ws, "Invalid frame type was fragmented.");
            return;
          }
          const payloadLength = buffer[1] & 127;
          if (payloadLength <= 125) {
            __privateGet(this, _info).payloadLength = payloadLength;
            __privateSet(this, _state, parserStates.READ_DATA);
          } else if (payloadLength === 126) {
            __privateSet(this, _state, parserStates.PAYLOADLENGTH_16);
          } else if (payloadLength === 127) {
            __privateSet(this, _state, parserStates.PAYLOADLENGTH_64);
          }
          if (__privateGet(this, _info).fragmented && payloadLength > 125) {
            failWebsocketConnection(this.ws, "Fragmented frame exceeded 125 bytes.");
            return;
          } else if ((__privateGet(this, _info).opcode === opcodes.PING || __privateGet(this, _info).opcode === opcodes.PONG || __privateGet(this, _info).opcode === opcodes.CLOSE) && payloadLength > 125) {
            failWebsocketConnection(this.ws, "Payload length for control frame exceeded 125 bytes.");
            return;
          } else if (__privateGet(this, _info).opcode === opcodes.CLOSE) {
            if (payloadLength === 1) {
              failWebsocketConnection(this.ws, "Received close frame with a 1-byte body.");
              return;
            }
            const body2 = this.consume(payloadLength);
            __privateGet(this, _info).closeInfo = this.parseCloseBody(false, body2);
            if (!this.ws[kSentClose]) {
              const body3 = Buffer.allocUnsafe(2);
              body3.writeUInt16BE(__privateGet(this, _info).closeInfo.code, 0);
              const closeFrame = new WebsocketFrameSend(body3);
              this.ws[kResponse].socket.write(
                closeFrame.createFrame(opcodes.CLOSE),
                (err) => {
                  if (!err) {
                    this.ws[kSentClose] = true;
                  }
                }
              );
            }
            this.ws[kReadyState] = states.CLOSING;
            this.ws[kReceivedClose] = true;
            this.end();
            return;
          } else if (__privateGet(this, _info).opcode === opcodes.PING) {
            const body2 = this.consume(payloadLength);
            if (!this.ws[kReceivedClose]) {
              const frame2 = new WebsocketFrameSend(body2);
              this.ws[kResponse].socket.write(frame2.createFrame(opcodes.PONG));
              if (channels2.ping.hasSubscribers) {
                channels2.ping.publish({
                  payload: body2
                });
              }
            }
            __privateSet(this, _state, parserStates.INFO);
            if (__privateGet(this, _byteOffset) > 0) {
              continue;
            } else {
              callback();
              return;
            }
          } else if (__privateGet(this, _info).opcode === opcodes.PONG) {
            const body2 = this.consume(payloadLength);
            if (channels2.pong.hasSubscribers) {
              channels2.pong.publish({
                payload: body2
              });
            }
            if (__privateGet(this, _byteOffset) > 0) {
              continue;
            } else {
              callback();
              return;
            }
          }
        } else if (__privateGet(this, _state) === parserStates.PAYLOADLENGTH_16) {
          if (__privateGet(this, _byteOffset) < 2) {
            return callback();
          }
          const buffer = this.consume(2);
          __privateGet(this, _info).payloadLength = buffer.readUInt16BE(0);
          __privateSet(this, _state, parserStates.READ_DATA);
        } else if (__privateGet(this, _state) === parserStates.PAYLOADLENGTH_64) {
          if (__privateGet(this, _byteOffset) < 8) {
            return callback();
          }
          const buffer = this.consume(8);
          const upper = buffer.readUInt32BE(0);
          if (upper > 2 ** 31 - 1) {
            failWebsocketConnection(this.ws, "Received payload length > 2^31 bytes.");
            return;
          }
          const lower = buffer.readUInt32BE(4);
          __privateGet(this, _info).payloadLength = (upper << 8) + lower;
          __privateSet(this, _state, parserStates.READ_DATA);
        } else if (__privateGet(this, _state) === parserStates.READ_DATA) {
          if (__privateGet(this, _byteOffset) < __privateGet(this, _info).payloadLength) {
            return callback();
          } else if (__privateGet(this, _byteOffset) >= __privateGet(this, _info).payloadLength) {
            const body2 = this.consume(__privateGet(this, _info).payloadLength);
            __privateGet(this, _fragments).push(body2);
            if (!__privateGet(this, _info).fragmented || __privateGet(this, _info).fin && __privateGet(this, _info).opcode === opcodes.CONTINUATION) {
              const fullMessage = Buffer.concat(__privateGet(this, _fragments));
              websocketMessageReceived(this.ws, __privateGet(this, _info).originalOpcode, fullMessage);
              __privateSet(this, _info, {});
              __privateGet(this, _fragments).length = 0;
            }
            __privateSet(this, _state, parserStates.INFO);
          }
        }
        if (__privateGet(this, _byteOffset) > 0) {
          continue;
        } else {
          callback();
          break;
        }
      }
    }
    /**
     * Take n bytes from the buffered Buffers
     * @param {number} n
     * @returns {Buffer|null}
     */
    consume(n) {
      if (n > __privateGet(this, _byteOffset)) {
        return null;
      } else if (n === 0) {
        return emptyBuffer;
      }
      if (__privateGet(this, _buffers)[0].length === n) {
        __privateSet(this, _byteOffset, __privateGet(this, _byteOffset) - __privateGet(this, _buffers)[0].length);
        return __privateGet(this, _buffers).shift();
      }
      const buffer = Buffer.allocUnsafe(n);
      let offset = 0;
      while (offset !== n) {
        const next = __privateGet(this, _buffers)[0];
        const { length } = next;
        if (length + offset === n) {
          buffer.set(__privateGet(this, _buffers).shift(), offset);
          break;
        } else if (length + offset > n) {
          buffer.set(next.subarray(0, n - offset), offset);
          __privateGet(this, _buffers)[0] = next.subarray(n - offset);
          break;
        } else {
          buffer.set(__privateGet(this, _buffers).shift(), offset);
          offset += next.length;
        }
      }
      __privateSet(this, _byteOffset, __privateGet(this, _byteOffset) - n);
      return buffer;
    }
    parseCloseBody(onlyCode, data) {
      let code;
      if (data.length >= 2) {
        code = data.readUInt16BE(0);
      }
      if (onlyCode) {
        if (!isValidStatusCode(code)) {
          return null;
        }
        return { code };
      }
      let reason = data.subarray(2);
      if (reason[0] === 239 && reason[1] === 187 && reason[2] === 191) {
        reason = reason.subarray(3);
      }
      if (code !== void 0 && !isValidStatusCode(code)) {
        return null;
      }
      try {
        reason = new TextDecoder("utf-8", { fatal: true }).decode(reason);
      } catch {
        return null;
      }
      return { code, reason };
    }
    get closingInfo() {
      return __privateGet(this, _info).closeInfo;
    }
  }
  _buffers = new WeakMap();
  _byteOffset = new WeakMap();
  _state = new WeakMap();
  _info = new WeakMap();
  _fragments = new WeakMap();
  receiver = {
    ByteParser
  };
  return receiver;
}
var websocket;
var hasRequiredWebsocket;
function requireWebsocket() {
  var _events, _bufferedAmount, _protocol, _extensions, _onConnectionEstablished, onConnectionEstablished_fn;
  if (hasRequiredWebsocket)
    return websocket;
  hasRequiredWebsocket = 1;
  const { webidl } = requireWebidl();
  const { DOMException: DOMException2 } = requireConstants$3();
  const { URLSerializer } = requireDataURL();
  const { staticPropertyDescriptors, states, opcodes, emptyBuffer } = requireConstants();
  const {
    kWebSocketURL,
    kReadyState,
    kController,
    kBinaryType,
    kResponse,
    kSentClose,
    kByteParser
  } = requireSymbols();
  const { isEstablished, isClosing, isValidSubprotocol, failWebsocketConnection, fireEvent } = requireUtil();
  const { establishWebSocketConnection } = requireConnection();
  const { WebsocketFrameSend } = requireFrame();
  const { ByteParser } = requireReceiver();
  const { kEnumerableProperty: kEnumerableProperty2, isBlobLike: isBlobLike2 } = util$j;
  const { getGlobalDispatcher: getGlobalDispatcher2 } = global$1;
  const { types } = require$$0$4;
  let experimentalWarned = false;
  const _WebSocket = class _WebSocket extends EventTarget {
    /**
     * @param {string} url
     * @param {string|string[]} protocols
     */
    constructor(url2, protocols = []) {
      super();
      /**
       * @see https://websockets.spec.whatwg.org/#feedback-from-the-protocol
       */
      __privateAdd(this, _onConnectionEstablished);
      __privateAdd(this, _events, {
        open: null,
        error: null,
        close: null,
        message: null
      });
      __privateAdd(this, _bufferedAmount, 0);
      __privateAdd(this, _protocol, "");
      __privateAdd(this, _extensions, "");
      webidl.argumentLengthCheck(arguments, 1, { header: "WebSocket constructor" });
      if (!experimentalWarned) {
        experimentalWarned = true;
        process.emitWarning("WebSockets are experimental, expect them to change at any time.", {
          code: "UNDICI-WS"
        });
      }
      const options = webidl.converters["DOMString or sequence<DOMString> or WebSocketInit"](protocols);
      url2 = webidl.converters.USVString(url2);
      protocols = options.protocols;
      let urlRecord;
      try {
        urlRecord = new URL(url2);
      } catch (e) {
        throw new DOMException2(e, "SyntaxError");
      }
      if (urlRecord.protocol !== "ws:" && urlRecord.protocol !== "wss:") {
        throw new DOMException2(
          `Expected a ws: or wss: protocol, got ${urlRecord.protocol}`,
          "SyntaxError"
        );
      }
      if (urlRecord.hash) {
        throw new DOMException2("Got fragment", "SyntaxError");
      }
      if (typeof protocols === "string") {
        protocols = [protocols];
      }
      if (protocols.length !== new Set(protocols.map((p) => p.toLowerCase())).size) {
        throw new DOMException2("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
      }
      if (protocols.length > 0 && !protocols.every((p) => isValidSubprotocol(p))) {
        throw new DOMException2("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
      }
      this[kWebSocketURL] = urlRecord;
      this[kController] = establishWebSocketConnection(
        urlRecord,
        protocols,
        this,
        (response2) => __privateMethod(this, _onConnectionEstablished, onConnectionEstablished_fn).call(this, response2),
        options
      );
      this[kReadyState] = _WebSocket.CONNECTING;
      this[kBinaryType] = "blob";
    }
    /**
     * @see https://websockets.spec.whatwg.org/#dom-websocket-close
     * @param {number|undefined} code
     * @param {string|undefined} reason
     */
    close(code = void 0, reason = void 0) {
      webidl.brandCheck(this, _WebSocket);
      if (code !== void 0) {
        code = webidl.converters["unsigned short"](code, { clamp: true });
      }
      if (reason !== void 0) {
        reason = webidl.converters.USVString(reason);
      }
      if (code !== void 0) {
        if (code !== 1e3 && (code < 3e3 || code > 4999)) {
          throw new DOMException2("invalid code", "InvalidAccessError");
        }
      }
      let reasonByteLength = 0;
      if (reason !== void 0) {
        reasonByteLength = Buffer.byteLength(reason);
        if (reasonByteLength > 123) {
          throw new DOMException2(
            `Reason must be less than 123 bytes; received ${reasonByteLength}`,
            "SyntaxError"
          );
        }
      }
      if (this[kReadyState] === _WebSocket.CLOSING || this[kReadyState] === _WebSocket.CLOSED)
        ;
      else if (!isEstablished(this)) {
        failWebsocketConnection(this, "Connection was closed before it was established.");
        this[kReadyState] = _WebSocket.CLOSING;
      } else if (!isClosing(this)) {
        const frame2 = new WebsocketFrameSend();
        if (code !== void 0 && reason === void 0) {
          frame2.frameData = Buffer.allocUnsafe(2);
          frame2.frameData.writeUInt16BE(code, 0);
        } else if (code !== void 0 && reason !== void 0) {
          frame2.frameData = Buffer.allocUnsafe(2 + reasonByteLength);
          frame2.frameData.writeUInt16BE(code, 0);
          frame2.frameData.write(reason, 2, "utf-8");
        } else {
          frame2.frameData = emptyBuffer;
        }
        const socket = this[kResponse].socket;
        socket.write(frame2.createFrame(opcodes.CLOSE), (err) => {
          if (!err) {
            this[kSentClose] = true;
          }
        });
        this[kReadyState] = states.CLOSING;
      } else {
        this[kReadyState] = _WebSocket.CLOSING;
      }
    }
    /**
     * @see https://websockets.spec.whatwg.org/#dom-websocket-send
     * @param {NodeJS.TypedArray|ArrayBuffer|Blob|string} data
     */
    send(data) {
      webidl.brandCheck(this, _WebSocket);
      webidl.argumentLengthCheck(arguments, 1, { header: "WebSocket.send" });
      data = webidl.converters.WebSocketSendData(data);
      if (this[kReadyState] === _WebSocket.CONNECTING) {
        throw new DOMException2("Sent before connected.", "InvalidStateError");
      }
      if (!isEstablished(this) || isClosing(this)) {
        return;
      }
      const socket = this[kResponse].socket;
      if (typeof data === "string") {
        const value = Buffer.from(data);
        const frame2 = new WebsocketFrameSend(value);
        const buffer = frame2.createFrame(opcodes.TEXT);
        __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + value.byteLength);
        socket.write(buffer, () => {
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - value.byteLength);
        });
      } else if (types.isArrayBuffer(data)) {
        const value = Buffer.from(data);
        const frame2 = new WebsocketFrameSend(value);
        const buffer = frame2.createFrame(opcodes.BINARY);
        __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + value.byteLength);
        socket.write(buffer, () => {
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - value.byteLength);
        });
      } else if (ArrayBuffer.isView(data)) {
        const ab = Buffer.from(data, data.byteOffset, data.byteLength);
        const frame2 = new WebsocketFrameSend(ab);
        const buffer = frame2.createFrame(opcodes.BINARY);
        __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + ab.byteLength);
        socket.write(buffer, () => {
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - ab.byteLength);
        });
      } else if (isBlobLike2(data)) {
        const frame2 = new WebsocketFrameSend();
        data.arrayBuffer().then((ab) => {
          const value = Buffer.from(ab);
          frame2.frameData = value;
          const buffer = frame2.createFrame(opcodes.BINARY);
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + value.byteLength);
          socket.write(buffer, () => {
            __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - value.byteLength);
          });
        });
      }
    }
    get readyState() {
      webidl.brandCheck(this, _WebSocket);
      return this[kReadyState];
    }
    get bufferedAmount() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _bufferedAmount);
    }
    get url() {
      webidl.brandCheck(this, _WebSocket);
      return URLSerializer(this[kWebSocketURL]);
    }
    get extensions() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _extensions);
    }
    get protocol() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _protocol);
    }
    get onopen() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _events).open;
    }
    set onopen(fn) {
      webidl.brandCheck(this, _WebSocket);
      if (__privateGet(this, _events).open) {
        this.removeEventListener("open", __privateGet(this, _events).open);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).open = fn;
        this.addEventListener("open", fn);
      } else {
        __privateGet(this, _events).open = null;
      }
    }
    get onerror() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _events).error;
    }
    set onerror(fn) {
      webidl.brandCheck(this, _WebSocket);
      if (__privateGet(this, _events).error) {
        this.removeEventListener("error", __privateGet(this, _events).error);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).error = fn;
        this.addEventListener("error", fn);
      } else {
        __privateGet(this, _events).error = null;
      }
    }
    get onclose() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _events).close;
    }
    set onclose(fn) {
      webidl.brandCheck(this, _WebSocket);
      if (__privateGet(this, _events).close) {
        this.removeEventListener("close", __privateGet(this, _events).close);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).close = fn;
        this.addEventListener("close", fn);
      } else {
        __privateGet(this, _events).close = null;
      }
    }
    get onmessage() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _events).message;
    }
    set onmessage(fn) {
      webidl.brandCheck(this, _WebSocket);
      if (__privateGet(this, _events).message) {
        this.removeEventListener("message", __privateGet(this, _events).message);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).message = fn;
        this.addEventListener("message", fn);
      } else {
        __privateGet(this, _events).message = null;
      }
    }
    get binaryType() {
      webidl.brandCheck(this, _WebSocket);
      return this[kBinaryType];
    }
    set binaryType(type) {
      webidl.brandCheck(this, _WebSocket);
      if (type !== "blob" && type !== "arraybuffer") {
        this[kBinaryType] = "blob";
      } else {
        this[kBinaryType] = type;
      }
    }
  };
  _events = new WeakMap();
  _bufferedAmount = new WeakMap();
  _protocol = new WeakMap();
  _extensions = new WeakMap();
  _onConnectionEstablished = new WeakSet();
  onConnectionEstablished_fn = function(response2) {
    this[kResponse] = response2;
    const parser = new ByteParser(this);
    parser.on("drain", function onParserDrain() {
      this.ws[kResponse].socket.resume();
    });
    response2.socket.ws = this;
    this[kByteParser] = parser;
    this[kReadyState] = states.OPEN;
    const extensions = response2.headersList.get("sec-websocket-extensions");
    if (extensions !== null) {
      __privateSet(this, _extensions, extensions);
    }
    const protocol = response2.headersList.get("sec-websocket-protocol");
    if (protocol !== null) {
      __privateSet(this, _protocol, protocol);
    }
    fireEvent("open", this);
  };
  let WebSocket = _WebSocket;
  WebSocket.CONNECTING = WebSocket.prototype.CONNECTING = states.CONNECTING;
  WebSocket.OPEN = WebSocket.prototype.OPEN = states.OPEN;
  WebSocket.CLOSING = WebSocket.prototype.CLOSING = states.CLOSING;
  WebSocket.CLOSED = WebSocket.prototype.CLOSED = states.CLOSED;
  Object.defineProperties(WebSocket.prototype, {
    CONNECTING: staticPropertyDescriptors,
    OPEN: staticPropertyDescriptors,
    CLOSING: staticPropertyDescriptors,
    CLOSED: staticPropertyDescriptors,
    url: kEnumerableProperty2,
    readyState: kEnumerableProperty2,
    bufferedAmount: kEnumerableProperty2,
    onopen: kEnumerableProperty2,
    onerror: kEnumerableProperty2,
    onclose: kEnumerableProperty2,
    close: kEnumerableProperty2,
    onmessage: kEnumerableProperty2,
    binaryType: kEnumerableProperty2,
    send: kEnumerableProperty2,
    extensions: kEnumerableProperty2,
    protocol: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "WebSocket",
      writable: false,
      enumerable: false,
      configurable: true
    }
  });
  Object.defineProperties(WebSocket, {
    CONNECTING: staticPropertyDescriptors,
    OPEN: staticPropertyDescriptors,
    CLOSING: staticPropertyDescriptors,
    CLOSED: staticPropertyDescriptors
  });
  webidl.converters["sequence<DOMString>"] = webidl.sequenceConverter(
    webidl.converters.DOMString
  );
  webidl.converters["DOMString or sequence<DOMString>"] = function(V) {
    if (webidl.util.Type(V) === "Object" && Symbol.iterator in V) {
      return webidl.converters["sequence<DOMString>"](V);
    }
    return webidl.converters.DOMString(V);
  };
  webidl.converters.WebSocketInit = webidl.dictionaryConverter([
    {
      key: "protocols",
      converter: webidl.converters["DOMString or sequence<DOMString>"],
      get defaultValue() {
        return [];
      }
    },
    {
      key: "dispatcher",
      converter: (V) => V,
      get defaultValue() {
        return getGlobalDispatcher2();
      }
    },
    {
      key: "headers",
      converter: webidl.nullableConverter(webidl.converters.HeadersInit)
    }
  ]);
  webidl.converters["DOMString or sequence<DOMString> or WebSocketInit"] = function(V) {
    if (webidl.util.Type(V) === "Object" && !(Symbol.iterator in V)) {
      return webidl.converters.WebSocketInit(V);
    }
    return { protocols: webidl.converters["DOMString or sequence<DOMString>"](V) };
  };
  webidl.converters.WebSocketSendData = function(V) {
    if (webidl.util.Type(V) === "Object") {
      if (isBlobLike2(V)) {
        return webidl.converters.Blob(V, { strict: false });
      }
      if (ArrayBuffer.isView(V) || types.isAnyArrayBuffer(V)) {
        return webidl.converters.BufferSource(V);
      }
    }
    return webidl.converters.USVString(V);
  };
  websocket = {
    WebSocket
  };
  return websocket;
}
var FormData;
var Request$3;
var Response$3;
var Headers$1;
var fetch;
const Dispatcher2 = dispatcher;
const errors = errors$1;
const util = util$j;
const { InvalidArgumentError: InvalidArgumentError2 } = errors;
const api = api$1;
const { getGlobalDispatcher, setGlobalDispatcher } = global$1;
let hasCrypto;
try {
  require("crypto");
  hasCrypto = true;
} catch {
  hasCrypto = false;
}
Object.assign(Dispatcher2.prototype, api);
function makeDispatcher(fn) {
  return (url2, opts, handler) => {
    if (typeof opts === "function") {
      handler = opts;
      opts = null;
    }
    if (!url2 || typeof url2 !== "string" && typeof url2 !== "object" && !(url2 instanceof URL)) {
      throw new InvalidArgumentError2("invalid url");
    }
    if (opts != null && typeof opts !== "object") {
      throw new InvalidArgumentError2("invalid opts");
    }
    if (opts && opts.path != null) {
      if (typeof opts.path !== "string") {
        throw new InvalidArgumentError2("invalid opts.path");
      }
      let path = opts.path;
      if (!opts.path.startsWith("/")) {
        path = `/${path}`;
      }
      url2 = new URL(util.parseOrigin(url2).origin + path);
    } else {
      if (!opts) {
        opts = typeof url2 === "object" ? url2 : {};
      }
      url2 = util.parseURL(url2);
    }
    const { agent: agent2, dispatcher: dispatcher2 = getGlobalDispatcher() } = opts;
    if (agent2) {
      throw new InvalidArgumentError2("unsupported opts.agent. Did you mean opts.client?");
    }
    return fn.call(dispatcher2, {
      ...opts,
      origin: url2.origin,
      path: url2.search ? `${url2.pathname}${url2.search}` : url2.pathname,
      method: opts.method || (opts.body ? "PUT" : "GET")
    }, handler);
  };
}
if (util.nodeMajor > 16 || util.nodeMajor === 16 && util.nodeMinor >= 8) {
  let fetchImpl = null;
  fetch = async function fetch2(resource) {
    if (!fetchImpl) {
      fetchImpl = requireFetch().fetch;
    }
    try {
      return await fetchImpl(...arguments);
    } catch (err) {
      Error.captureStackTrace(err, this);
      throw err;
    }
  };
  Headers$1 = requireHeaders().Headers;
  Response$3 = requireResponse().Response;
  Request$3 = requireRequest().Request;
  FormData = requireFormdata().FormData;
  requireFile().File;
  requireFilereader().FileReader;
  requireGlobal();
  const { CacheStorage } = requireCachestorage();
  const { kConstruct } = requireSymbols$1();
  new CacheStorage(kConstruct);
}
if (util.nodeMajor >= 16) {
  requireCookies();
  requireDataURL();
}
if (util.nodeMajor >= 18 && hasCrypto) {
  requireWebsocket();
}
makeDispatcher(api.request);
makeDispatcher(api.stream);
makeDispatcher(api.pipeline);
makeDispatcher(api.connect);
makeDispatcher(api.upgrade);
function computeOrigin(req, opts) {
  var _a2;
  return ((_a2 = opts == null ? void 0 : opts.getOrigin) == null ? void 0 : _a2.call(opts, req)) ?? (opts == null ? void 0 : opts.origin) ?? process.env.ORIGIN ?? fallbackOrigin(req);
}
function fallbackOrigin(req) {
  const { PROTOCOL_HEADER, HOST_HEADER } = process.env;
  const headers2 = req.headers;
  const protocol = PROTOCOL_HEADER && headers2[PROTOCOL_HEADER] || (req.socket.encrypted || req.connection.encrypted ? "https" : "http");
  const hostHeader = HOST_HEADER ?? (req instanceof Http2ServerRequest ? ":authority" : "host");
  const host = headers2[hostHeader];
  return `${protocol}://${host}`;
}
function getUrl$1(req, origin) {
  return normalizeUrl(req.originalUrl || req.url || "/", origin);
}
var DOUBLE_SLASH_REG = /\/\/|\\\\/g;
function normalizeUrl(url2, base) {
  return new URL(url2.replace(DOUBLE_SLASH_REG, "/"), base);
}
async function fromNodeHttp(url2, req, res, mode, getClientConn) {
  const requestHeaders2 = new Headers();
  const nodeRequestHeaders = req.headers;
  for (const key in nodeRequestHeaders) {
    const value = nodeRequestHeaders[key];
    if (typeof value === "string") {
      requestHeaders2.set(key, value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        requestHeaders2.append(key, v);
      }
    }
  }
  const getRequestBody = async function* () {
    for await (const chunk of req) {
      yield chunk;
    }
  };
  const body2 = req.method === "HEAD" || req.method === "GET" ? void 0 : getRequestBody();
  const controller = new AbortController();
  const options = {
    method: req.method,
    headers: requestHeaders2,
    body: body2,
    signal: controller.signal,
    duplex: "half"
  };
  res.on("close", () => {
    controller.abort();
  });
  const serverRequestEv = {
    mode,
    url: url2,
    request: new Request(url2.href, options),
    env: {
      get(key) {
        return process.env[key];
      }
    },
    getWritableStream: (status, headers2, cookies2) => {
      res.statusCode = status;
      headers2.forEach((value, key) => res.setHeader(key, value));
      const cookieHeaders = cookies2.headers();
      if (cookieHeaders.length > 0) {
        res.setHeader("Set-Cookie", cookieHeaders);
      }
      return new WritableStream({
        write(chunk) {
          res.write(chunk, (error) => {
            if (error) {
              console.error(error);
            }
          });
        },
        close() {
          res.end();
        }
      });
    },
    getClientConn: () => {
      return getClientConn ? getClientConn(req) : {
        ip: req.socket.remoteAddress
      };
    },
    platform: {
      ssr: true,
      incomingMessage: req,
      node: process.versions.node
    },
    locale: void 0
  };
  return serverRequestEv;
}
var MIME_TYPES = {
  "3gp": "video/3gpp",
  "3gpp": "video/3gpp",
  asf: "video/x-ms-asf",
  asx: "video/x-ms-asf",
  avi: "video/x-msvideo",
  avif: "image/avif",
  bmp: "image/x-ms-bmp",
  css: "text/css",
  flv: "video/x-flv",
  gif: "image/gif",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  jng: "image/x-jng",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "application/javascript",
  json: "application/json",
  kar: "audio/midi",
  m4a: "audio/x-m4a",
  m4v: "video/x-m4v",
  mid: "audio/midi",
  midi: "audio/midi",
  mng: "video/x-mng",
  mov: "video/quicktime",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  mpeg: "video/mpeg",
  mpg: "video/mpeg",
  ogg: "audio/ogg",
  pdf: "application/pdf",
  png: "image/png",
  rar: "application/x-rar-compressed",
  shtml: "text/html",
  svg: "image/svg+xml",
  svgz: "image/svg+xml",
  tif: "image/tiff",
  tiff: "image/tiff",
  ts: "video/mp2t",
  txt: "text/plain",
  wbmp: "image/vnd.wap.wbmp",
  webm: "video/webm",
  webp: "image/webp",
  wmv: "video/x-ms-wmv",
  woff: "font/woff",
  woff2: "font/woff2",
  xml: "text/xml",
  zip: "application/zip"
};
function patchGlobalThis() {
  if (typeof global !== "undefined" && typeof globalThis.fetch !== "function" && typeof process !== "undefined" && process.versions.node) {
    globalThis.fetch = fetch;
    globalThis.Headers = Headers$1;
    globalThis.Request = Request$3;
    globalThis.Response = Response$3;
    globalThis.FormData = FormData;
  }
  if (typeof globalThis.TextEncoderStream === "undefined") {
    globalThis.TextEncoderStream = TextEncoderStream$1;
    globalThis.TextDecoderStream = TextDecoderStream;
  }
  if (typeof globalThis.WritableStream === "undefined") {
    globalThis.WritableStream = WritableStream$1;
    globalThis.ReadableStream = ReadableStream$1;
  }
  if (typeof globalThis.crypto === "undefined") {
    globalThis.crypto = require$$0$7.webcrypto;
  }
}
function createQwikCity(opts) {
  var _a2;
  patchGlobalThis();
  const qwikSerializer = {
    _deserializeData,
    _serializeData,
    _verifySerializable: verifySerializable$1
  };
  if (opts.manifest) {
    setServerPlatform2(opts.manifest);
  }
  const staticFolder = ((_a2 = opts.static) == null ? void 0 : _a2.root) ?? join(fileURLToPath(import.meta.url), "..", "..", "dist");
  const router2 = async (req, res, next) => {
    try {
      const origin = computeOrigin(req, opts);
      const serverRequestEv = await fromNodeHttp(
        getUrl$1(req, origin),
        req,
        res,
        "server",
        opts.getClientConn
      );
      const handled = await requestHandler(serverRequestEv, opts, qwikSerializer);
      if (handled) {
        const err = await handled.completion;
        if (err) {
          throw err;
        }
        if (handled.requestEv.headersSent) {
          return;
        }
      }
      next();
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
  const notFound2 = async (req, res, next) => {
    try {
      if (!res.headersSent) {
        const origin = computeOrigin(req, opts);
        const url2 = getUrl$1(req, origin);
        const notFoundHtml = getNotFound(url2.pathname);
        res.writeHead(404, {
          "Content-Type": "text/html; charset=utf-8",
          "X-Not-Found": url2.pathname
        });
        res.end(notFoundHtml);
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
  const staticFile2 = async (req, res, next) => {
    var _a22;
    try {
      const origin = computeOrigin(req, opts);
      const url2 = getUrl$1(req, origin);
      if (isStaticPath(req.method || "GET", url2)) {
        const pathname = url2.pathname;
        let filePath;
        if (basename(pathname).includes(".")) {
          filePath = join(staticFolder, pathname);
        } else if (opts.qwikCityPlan.trailingSlash) {
          filePath = join(staticFolder, pathname + "index.html");
        } else {
          filePath = join(staticFolder, pathname, "index.html");
        }
        const stream2 = createReadStream(filePath);
        const ext = extname(filePath).replace(/^\./, "");
        const contentType = MIME_TYPES[ext];
        if (contentType) {
          res.setHeader("Content-Type", contentType);
        }
        if ((_a22 = opts.static) == null ? void 0 : _a22.cacheControl) {
          res.setHeader("Cache-Control", opts.static.cacheControl);
        }
        stream2.on("error", next);
        stream2.pipe(res);
        return;
      }
      return next();
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
  return {
    router: router2,
    notFound: notFound2,
    staticFile: staticFile2
  };
}
var finish$1 = async function finish(item, transform, ...details) {
  await new Promise((resolve, reject) => {
    if (item.finished || item.complete) {
      resolve();
      return;
    }
    let finished2 = false;
    function done(err) {
      if (finished2) {
        return;
      }
      finished2 = true;
      item.removeListener("error", done);
      item.removeListener("end", done);
      item.removeListener("finish", done);
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    }
    item.once("error", done);
    item.once("end", done);
    item.once("finish", done);
  });
  if (typeof transform === "function") {
    await transform(item, ...details);
  } else if (typeof transform === "object" && transform !== null) {
    Object.assign(item, transform);
  }
  return item;
};
const http$2 = require$$0$2;
const headerEnd = "\r\n\r\n";
const BODY = Symbol();
const HEADERS = Symbol();
function getString(data) {
  if (Buffer.isBuffer(data)) {
    return data.toString("utf8");
  } else if (typeof data === "string") {
    return data;
  } else {
    throw new Error(`response.write() of unexpected type: ${typeof data}`);
  }
}
function addData(stream2, data) {
  if (Buffer.isBuffer(data) || typeof data === "string" || data instanceof Uint8Array) {
    stream2[BODY].push(Buffer.from(data));
  } else {
    throw new Error(`response.write() of unexpected type: ${typeof data}`);
  }
}
var response = class ServerlessResponse extends http$2.ServerResponse {
  static from(res) {
    const response2 = new ServerlessResponse(res);
    response2.statusCode = res.statusCode;
    response2[HEADERS] = res.headers;
    response2[BODY] = [Buffer.from(res.body)];
    response2.end();
    return response2;
  }
  static body(res) {
    return Buffer.concat(res[BODY]);
  }
  static headers(res) {
    const headers2 = typeof res.getHeaders === "function" ? res.getHeaders() : res._headers;
    return Object.assign(headers2, res[HEADERS]);
  }
  get headers() {
    return this[HEADERS];
  }
  setHeader(key, value) {
    if (this._wroteHeader) {
      this[HEADERS][key] = value;
    } else {
      super.setHeader(key, value);
    }
  }
  writeHead(statusCode, reason, obj) {
    const headers2 = typeof reason === "string" ? obj : reason;
    for (const name in headers2) {
      this.setHeader(name, headers2[name]);
      if (!this._wroteHeader) {
        break;
      }
    }
    super.writeHead(statusCode, reason, obj);
  }
  constructor({ method }) {
    super({ method });
    this[BODY] = [];
    this[HEADERS] = {};
    this.useChunkedEncodingByDefault = false;
    this.chunkedEncoding = false;
    this._header = "";
    this.assignSocket({
      _writableState: {},
      writable: true,
      on: Function.prototype,
      removeListener: Function.prototype,
      destroy: Function.prototype,
      cork: Function.prototype,
      uncork: Function.prototype,
      write: (data, encoding2, cb) => {
        if (typeof encoding2 === "function") {
          cb = encoding2;
          encoding2 = null;
        }
        if (this._header === "" || this._wroteHeader) {
          addData(this, data);
        } else {
          const string = getString(data);
          const index = string.indexOf(headerEnd);
          if (index !== -1) {
            const remainder = string.slice(index + headerEnd.length);
            if (remainder) {
              addData(this, remainder);
            }
            this._wroteHeader = true;
          }
        }
        if (typeof cb === "function") {
          cb();
        }
      }
    });
    this.once("finish", () => {
      this.emit("close");
    });
  }
};
const http$1 = require$$0$2;
const Response$2 = response;
function common(cb) {
  return (request2) => {
    const response2 = new Response$2(request2);
    cb(request2, response2);
    return response2;
  };
}
var getFramework$1 = function getFramework(app) {
  if (app instanceof http$1.Server) {
    return (request2) => {
      const response2 = new Response$2(request2);
      app.emit("request", request2, response2);
      return response2;
    };
  }
  if (typeof app.callback === "function") {
    return common(app.callback());
  }
  if (typeof app.handle === "function") {
    return common((request2, response2) => {
      app.handle(request2, response2);
    });
  }
  if (typeof app.handler === "function") {
    return common((request2, response2) => {
      app.handler(request2, response2);
    });
  }
  if (typeof app._onRequest === "function") {
    return common((request2, response2) => {
      app._onRequest(request2, response2);
    });
  }
  if (typeof app === "function") {
    return common(app);
  }
  if (app.router && typeof app.router.route == "function") {
    return common((req, res) => {
      const { url: url2, method, headers: headers2, body: body2 } = req;
      app.router.route({ url: url2, method, headers: headers2, body: body2 }, res);
    });
  }
  if (app._core && typeof app._core._dispatch === "function") {
    return common(app._core._dispatch({
      app
    }));
  }
  if (typeof app.inject === "function") {
    return async (request2) => {
      const { method, url: url2, headers: headers2, body: body2 } = request2;
      const res = await app.inject({ method, url: url2, headers: headers2, payload: body2 });
      return Response$2.from(res);
    };
  }
  if (typeof app.main === "function") {
    return common(app.main);
  }
  throw new Error("Unsupported framework");
};
function removeBasePath(path = "/", basePath) {
  if (basePath) {
    const basePathIndex = path.indexOf(basePath);
    if (basePathIndex > -1) {
      return path.substr(basePathIndex + basePath.length) || "/";
    }
  }
  return path;
}
function isString(value) {
  return typeof value === "string" || value instanceof String;
}
function specialDecodeURIComponent(value) {
  if (!isString(value)) {
    return value;
  }
  let decoded;
  try {
    decoded = decodeURIComponent(value.replace(/[+]/g, "%20"));
  } catch (err) {
    decoded = value.replace(/[+]/g, "%20");
  }
  return decoded;
}
function recursiveURLDecode(value) {
  if (isString(value)) {
    return specialDecodeURIComponent(value);
  } else if (Array.isArray(value)) {
    const decodedArray = [];
    for (let index in value) {
      decodedArray.push(recursiveURLDecode(value[index]));
    }
    return decodedArray;
  } else if (value instanceof Object) {
    const decodedObject = {};
    for (let key of Object.keys(value)) {
      decodedObject[specialDecodeURIComponent(key)] = recursiveURLDecode(value[key]);
    }
    return decodedObject;
  }
  return value;
}
var cleanUpEvent$1 = function cleanupEvent(evt, options) {
  const event = evt || {};
  event.requestContext = event.requestContext || {};
  event.body = event.body || "";
  event.headers = event.headers || {};
  if ("elb" in event.requestContext) {
    if (event.multiValueQueryStringParameters) {
      event.multiValueQueryStringParameters = recursiveURLDecode(event.multiValueQueryStringParameters);
    }
    if (event.queryStringParameters) {
      event.queryStringParameters = recursiveURLDecode(event.queryStringParameters);
    }
  }
  if (event.version === "2.0") {
    event.requestContext.authorizer = event.requestContext.authorizer || {};
    event.requestContext.http.method = event.requestContext.http.method || "GET";
    event.rawPath = removeBasePath(event.requestPath || event.rawPath, options.basePath);
  } else {
    event.requestContext.identity = event.requestContext.identity || {};
    event.httpMethod = event.httpMethod || "GET";
    event.path = removeBasePath(event.requestPath || event.path, options.basePath);
  }
  return event;
};
const http = require$$0$2;
var request = class ServerlessRequest extends http.IncomingMessage {
  constructor({ method, url: url2, headers: headers2, body: body2, remoteAddress }) {
    super({
      encrypted: true,
      readable: false,
      remoteAddress,
      address: () => ({ port: 443 }),
      end: Function.prototype,
      destroy: Function.prototype
    });
    if (typeof headers2["content-length"] === "undefined") {
      headers2["content-length"] = Buffer.byteLength(body2);
    }
    Object.assign(this, {
      ip: remoteAddress,
      complete: true,
      httpVersion: "1.1",
      httpVersionMajor: "1",
      httpVersionMinor: "1",
      method,
      headers: headers2,
      body: body2,
      url: url2
    });
    this._read = () => {
      this.push(body2);
      this.push(null);
    };
  }
};
const URL$1 = require$$0$8;
const Request$2 = request;
function requestMethod(event) {
  if (event.version === "2.0") {
    return event.requestContext.http.method;
  }
  return event.httpMethod;
}
function requestRemoteAddress(event) {
  if (event.version === "2.0") {
    return event.requestContext.http.sourceIp;
  }
  return event.requestContext.identity.sourceIp;
}
function requestHeaders$1(event) {
  const initialHeader = event.version === "2.0" && Array.isArray(event.cookies) ? { cookie: event.cookies.join("; ") } : {};
  if (event.multiValueHeaders) {
    Object.keys(event.multiValueHeaders).reduce((headers2, key) => {
      headers2[key.toLowerCase()] = event.multiValueHeaders[key].join(", ");
      return headers2;
    }, initialHeader);
  }
  return Object.keys(event.headers).reduce((headers2, key) => {
    headers2[key.toLowerCase()] = event.headers[key];
    return headers2;
  }, initialHeader);
}
function requestBody$1(event) {
  const type = typeof event.body;
  if (Buffer.isBuffer(event.body)) {
    return event.body;
  } else if (type === "string") {
    return Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8");
  } else if (type === "object") {
    return Buffer.from(JSON.stringify(event.body));
  }
  throw new Error(`Unexpected event.body type: ${typeof event.body}`);
}
function requestUrl(event) {
  if (event.version === "2.0") {
    return URL$1.format({
      pathname: event.rawPath,
      search: event.rawQueryString
    });
  }
  const query = event.multiValueQueryStringParameters || {};
  if (event.queryStringParameters) {
    Object.keys(event.queryStringParameters).forEach((key) => {
      if (Array.isArray(query[key])) {
        if (!query[key].includes(event.queryStringParameters[key])) {
          query[key].push(event.queryStringParameters[key]);
        }
      } else {
        query[key] = [event.queryStringParameters[key]];
      }
    });
  }
  return URL$1.format({
    pathname: event.path,
    query
  });
}
var createRequest$3 = (event, context, options) => {
  const method = requestMethod(event);
  const remoteAddress = requestRemoteAddress(event);
  const headers2 = requestHeaders$1(event);
  const body2 = requestBody$1(event);
  const url2 = requestUrl(event);
  if (typeof options.requestId === "string" && options.requestId.length > 0) {
    const header = options.requestId.toLowerCase();
    const requestId = headers2[header] || event.requestContext.requestId;
    if (requestId) {
      headers2[header] = requestId;
    }
  }
  const req = new Request$2({
    method,
    headers: headers2,
    body: body2,
    remoteAddress,
    url: url2
  });
  req.requestContext = event.requestContext;
  req.apiGateway = {
    event,
    context
  };
  return req;
};
const BINARY_ENCODINGS$1 = ["gzip", "deflate", "br"];
const BINARY_CONTENT_TYPES$1 = (process.env.BINARY_CONTENT_TYPES || "").split(",");
function isBinaryEncoding$1(headers2) {
  const contentEncoding = headers2["content-encoding"];
  if (typeof contentEncoding === "string") {
    return contentEncoding.split(",").some(
      (value) => BINARY_ENCODINGS$1.some((binaryEncoding) => value.indexOf(binaryEncoding) !== -1)
    );
  }
}
function isBinaryContent$1(headers2, options) {
  const contentTypes = [].concat(
    options.binary ? options.binary : BINARY_CONTENT_TYPES$1
  ).map(
    (candidate) => new RegExp(`^${candidate.replace(/\*/g, ".*")}$`)
  );
  const contentType = (headers2["content-type"] || "").split(";")[0];
  return !!contentType && contentTypes.some((candidate) => candidate.test(contentType));
}
var isBinary$3 = function isBinary(headers2, options) {
  if (options.binary === false) {
    return false;
  }
  if (options.binary === true) {
    return true;
  }
  if (typeof options.binary === "function") {
    return options.binary(headers2);
  }
  return isBinaryEncoding$1(headers2) || isBinaryContent$1(headers2, options);
};
var sanitizeHeaders$3 = function sanitizeHeaders(headers2) {
  return Object.keys(headers2).reduce((memo, key) => {
    const value = headers2[key];
    if (Array.isArray(value)) {
      memo.multiValueHeaders[key] = value;
      if (key.toLowerCase() !== "set-cookie") {
        memo.headers[key] = value.join(", ");
      }
    } else {
      memo.headers[key] = value == null ? "" : value.toString();
    }
    return memo;
  }, {
    headers: {},
    multiValueHeaders: {}
  });
};
const isBinary$2 = isBinary$3;
const Response$1 = response;
const sanitizeHeaders$2 = sanitizeHeaders$3;
var formatResponse$3 = (event, response2, options) => {
  const { statusCode } = response2;
  const { headers: headers2, multiValueHeaders } = sanitizeHeaders$2(Response$1.headers(response2));
  let cookies2 = [];
  if (multiValueHeaders["set-cookie"]) {
    cookies2 = multiValueHeaders["set-cookie"];
  }
  const isBase64Encoded = isBinary$2(headers2, options);
  const encoding2 = isBase64Encoded ? "base64" : "utf8";
  let body2 = Response$1.body(response2).toString(encoding2);
  if (headers2["transfer-encoding"] === "chunked" || response2.chunkedEncoding) {
    const raw = Response$1.body(response2).toString().split("\r\n");
    const parsed = [];
    for (let i = 0; i < raw.length; i += 2) {
      const size = parseInt(raw[i], 16);
      const value = raw[i + 1];
      if (value) {
        parsed.push(value.substring(0, size));
      }
    }
    body2 = parsed.join("");
  }
  let formattedResponse = { statusCode, headers: headers2, isBase64Encoded, body: body2 };
  if (event.version === "2.0" && cookies2.length) {
    formattedResponse["cookies"] = cookies2;
  }
  if ((!event.version || event.version === "1.0") && Object.keys(multiValueHeaders).length) {
    formattedResponse["multiValueHeaders"] = multiValueHeaders;
  }
  return formattedResponse;
};
const cleanUpEvent = cleanUpEvent$1;
const createRequest$2 = createRequest$3;
const formatResponse$2 = formatResponse$3;
var aws$1 = (options) => {
  return (getResponse2) => async (event_, context = {}) => {
    const event = cleanUpEvent(event_, options);
    const request2 = createRequest$2(event, context, options);
    const response2 = await getResponse2(request2, event, context);
    return formatResponse$2(event, response2, options);
  };
};
function getUrl({ requestPath, url: url2 }) {
  if (requestPath) {
    return requestPath;
  }
  return typeof url2 === "string" ? url2 : "/";
}
function getRequestContext(request2) {
  const requestContext = {};
  requestContext.identity = {};
  const forwardedIp = request2.headers["x-forwarded-for"];
  const clientIp = request2.headers["client-ip"];
  const ip = forwardedIp ? forwardedIp : clientIp ? clientIp : "";
  if (ip) {
    requestContext.identity.sourceIp = ip.split(":")[0];
  }
  return requestContext;
}
var cleanUpRequest = function cleanupRequest(req, options) {
  const request2 = req || {};
  request2.requestContext = getRequestContext(req);
  request2.method = request2.method || "GET";
  request2.url = getUrl(request2);
  request2.body = request2.body || "";
  request2.headers = request2.headers || {};
  if (options.basePath) {
    const basePathIndex = request2.url.indexOf(options.basePath);
    if (basePathIndex > -1) {
      request2.url = request2.url.substr(basePathIndex + options.basePath.length);
    }
  }
  return request2;
};
const url = require$$0$8;
const Request$1 = request;
function requestHeaders(request2) {
  return Object.keys(request2.headers).reduce((headers2, key) => {
    headers2[key.toLowerCase()] = request2.headers[key];
    return headers2;
  }, {});
}
function requestBody(request2) {
  const type = typeof request2.rawBody;
  if (Buffer.isBuffer(request2.rawBody)) {
    return request2.rawBody;
  } else if (type === "string") {
    return Buffer.from(request2.rawBody, "utf8");
  } else if (type === "object") {
    return Buffer.from(JSON.stringify(request2.rawBody));
  }
  throw new Error(`Unexpected request.body type: ${typeof request2.rawBody}`);
}
var createRequest$1 = (request2) => {
  const method = request2.method;
  const query = request2.query;
  const headers2 = requestHeaders(request2);
  const body2 = requestBody(request2);
  const req = new Request$1({
    method,
    headers: headers2,
    body: body2,
    url: url.format({
      pathname: request2.url,
      query
    })
  });
  req.requestContext = request2.requestContext;
  return req;
};
const BINARY_ENCODINGS = ["gzip", "deflate", "br"];
const BINARY_CONTENT_TYPES = (process.env.BINARY_CONTENT_TYPES || "").split(",");
function isBinaryEncoding(headers2) {
  const contentEncoding = headers2["content-encoding"];
  if (typeof contentEncoding === "string") {
    return contentEncoding.split(",").some(
      (value) => BINARY_ENCODINGS.some((binaryEncoding) => value.indexOf(binaryEncoding) !== -1)
    );
  }
}
function isBinaryContent(headers2, options) {
  const contentTypes = [].concat(
    options.binary ? options.binary : BINARY_CONTENT_TYPES
  ).map(
    (candidate) => new RegExp(`^${candidate.replace(/\*/g, ".*")}$`)
  );
  const contentType = (headers2["content-type"] || "").split(";")[0];
  return !!contentType && contentTypes.some((candidate) => candidate.test(contentType));
}
var isBinary$1 = function isBinary2(headers2, options) {
  if (options.binary === false) {
    return false;
  }
  if (options.binary === true) {
    return true;
  }
  if (typeof options.binary === "function") {
    return options.binary(headers2);
  }
  return isBinaryEncoding(headers2) || isBinaryContent(headers2, options);
};
const variations = [
  "set-cookie",
  "Set-cookie",
  "sEt-cookie",
  "SEt-cookie",
  "seT-cookie",
  "SeT-cookie",
  "sET-cookie",
  "SET-cookie",
  "set-Cookie",
  "Set-Cookie",
  "sEt-Cookie",
  "SEt-Cookie",
  "seT-Cookie",
  "SeT-Cookie",
  "sET-Cookie",
  "SET-Cookie",
  "set-cOokie",
  "Set-cOokie",
  "sEt-cOokie",
  "SEt-cOokie",
  "seT-cOokie",
  "SeT-cOokie",
  "sET-cOokie",
  "SET-cOokie",
  "set-COokie",
  "Set-COokie",
  "sEt-COokie",
  "SEt-COokie",
  "seT-COokie",
  "SeT-COokie",
  "sET-COokie",
  "SET-COokie",
  "set-coOkie",
  "Set-coOkie",
  "sEt-coOkie",
  "SEt-coOkie",
  "seT-coOkie",
  "SeT-coOkie",
  "sET-coOkie",
  "SET-coOkie",
  "set-CoOkie",
  "Set-CoOkie",
  "sEt-CoOkie",
  "SEt-CoOkie",
  "seT-CoOkie",
  "SeT-CoOkie",
  "sET-CoOkie",
  "SET-CoOkie",
  "set-cOOkie",
  "Set-cOOkie",
  "sEt-cOOkie",
  "SEt-cOOkie",
  "seT-cOOkie",
  "SeT-cOOkie",
  "sET-cOOkie",
  "SET-cOOkie",
  "set-COOkie",
  "Set-COOkie",
  "sEt-COOkie",
  "SEt-COOkie",
  "seT-COOkie",
  "SeT-COOkie",
  "sET-COOkie",
  "SET-COOkie",
  "set-cooKie",
  "Set-cooKie",
  "sEt-cooKie",
  "SEt-cooKie",
  "seT-cooKie",
  "SeT-cooKie",
  "sET-cooKie",
  "SET-cooKie",
  "set-CooKie",
  "Set-CooKie",
  "sEt-CooKie",
  "SEt-CooKie",
  "seT-CooKie",
  "SeT-CooKie",
  "sET-CooKie",
  "SET-CooKie",
  "set-cOoKie",
  "Set-cOoKie",
  "sEt-cOoKie",
  "SEt-cOoKie",
  "seT-cOoKie",
  "SeT-cOoKie",
  "sET-cOoKie",
  "SET-cOoKie",
  "set-COoKie",
  "Set-COoKie",
  "sEt-COoKie",
  "SEt-COoKie",
  "seT-COoKie",
  "SeT-COoKie",
  "sET-COoKie",
  "SET-COoKie",
  "set-coOKie",
  "Set-coOKie",
  "sEt-coOKie",
  "SEt-coOKie",
  "seT-coOKie",
  "SeT-coOKie",
  "sET-coOKie",
  "SET-coOKie",
  "set-CoOKie",
  "Set-CoOKie",
  "sEt-CoOKie",
  "SEt-CoOKie",
  "seT-CoOKie",
  "SeT-CoOKie",
  "sET-CoOKie",
  "SET-CoOKie",
  "set-cOOKie",
  "Set-cOOKie",
  "sEt-cOOKie",
  "SEt-cOOKie",
  "seT-cOOKie",
  "SeT-cOOKie",
  "sET-cOOKie",
  "SET-cOOKie",
  "set-COOKie",
  "Set-COOKie",
  "sEt-COOKie",
  "SEt-COOKie",
  "seT-COOKie",
  "SeT-COOKie",
  "sET-COOKie",
  "SET-COOKie",
  "set-cookIe",
  "Set-cookIe",
  "sEt-cookIe",
  "SEt-cookIe",
  "seT-cookIe",
  "SeT-cookIe",
  "sET-cookIe",
  "SET-cookIe",
  "set-CookIe",
  "Set-CookIe",
  "sEt-CookIe",
  "SEt-CookIe",
  "seT-CookIe",
  "SeT-CookIe",
  "sET-CookIe",
  "SET-CookIe",
  "set-cOokIe",
  "Set-cOokIe",
  "sEt-cOokIe",
  "SEt-cOokIe",
  "seT-cOokIe",
  "SeT-cOokIe",
  "sET-cOokIe",
  "SET-cOokIe",
  "set-COokIe",
  "Set-COokIe",
  "sEt-COokIe",
  "SEt-COokIe",
  "seT-COokIe",
  "SeT-COokIe",
  "sET-COokIe",
  "SET-COokIe",
  "set-coOkIe",
  "Set-coOkIe",
  "sEt-coOkIe",
  "SEt-coOkIe",
  "seT-coOkIe",
  "SeT-coOkIe",
  "sET-coOkIe",
  "SET-coOkIe",
  "set-CoOkIe",
  "Set-CoOkIe",
  "sEt-CoOkIe",
  "SEt-CoOkIe",
  "seT-CoOkIe",
  "SeT-CoOkIe",
  "sET-CoOkIe",
  "SET-CoOkIe",
  "set-cOOkIe",
  "Set-cOOkIe",
  "sEt-cOOkIe",
  "SEt-cOOkIe",
  "seT-cOOkIe",
  "SeT-cOOkIe",
  "sET-cOOkIe",
  "SET-cOOkIe",
  "set-COOkIe",
  "Set-COOkIe",
  "sEt-COOkIe",
  "SEt-COOkIe",
  "seT-COOkIe",
  "SeT-COOkIe",
  "sET-COOkIe",
  "SET-COOkIe",
  "set-cooKIe",
  "Set-cooKIe",
  "sEt-cooKIe",
  "SEt-cooKIe",
  "seT-cooKIe",
  "SeT-cooKIe",
  "sET-cooKIe",
  "SET-cooKIe",
  "set-CooKIe",
  "Set-CooKIe",
  "sEt-CooKIe",
  "SEt-CooKIe",
  "seT-CooKIe",
  "SeT-CooKIe",
  "sET-CooKIe",
  "SET-CooKIe",
  "set-cOoKIe",
  "Set-cOoKIe",
  "sEt-cOoKIe",
  "SEt-cOoKIe",
  "seT-cOoKIe",
  "SeT-cOoKIe",
  "sET-cOoKIe",
  "SET-cOoKIe",
  "set-COoKIe",
  "Set-COoKIe",
  "sEt-COoKIe",
  "SEt-COoKIe",
  "seT-COoKIe",
  "SeT-COoKIe",
  "sET-COoKIe",
  "SET-COoKIe",
  "set-coOKIe",
  "Set-coOKIe",
  "sEt-coOKIe",
  "SEt-coOKIe",
  "seT-coOKIe",
  "SeT-coOKIe",
  "sET-coOKIe",
  "SET-coOKIe",
  "set-CoOKIe",
  "Set-CoOKIe",
  "sEt-CoOKIe",
  "SEt-CoOKIe",
  "seT-CoOKIe",
  "SeT-CoOKIe",
  "sET-CoOKIe",
  "SET-CoOKIe",
  "set-cOOKIe",
  "Set-cOOKIe",
  "sEt-cOOKIe",
  "SEt-cOOKIe",
  "seT-cOOKIe",
  "SeT-cOOKIe",
  "sET-cOOKIe",
  "SET-cOOKIe",
  "set-COOKIe",
  "Set-COOKIe",
  "sEt-COOKIe",
  "SEt-COOKIe",
  "seT-COOKIe",
  "SeT-COOKIe",
  "sET-COOKIe",
  "SET-COOKIe",
  "set-cookiE",
  "Set-cookiE",
  "sEt-cookiE",
  "SEt-cookiE",
  "seT-cookiE",
  "SeT-cookiE",
  "sET-cookiE",
  "SET-cookiE",
  "set-CookiE",
  "Set-CookiE",
  "sEt-CookiE",
  "SEt-CookiE",
  "seT-CookiE",
  "SeT-CookiE",
  "sET-CookiE",
  "SET-CookiE",
  "set-cOokiE",
  "Set-cOokiE",
  "sEt-cOokiE",
  "SEt-cOokiE",
  "seT-cOokiE",
  "SeT-cOokiE",
  "sET-cOokiE",
  "SET-cOokiE",
  "set-COokiE",
  "Set-COokiE",
  "sEt-COokiE",
  "SEt-COokiE",
  "seT-COokiE",
  "SeT-COokiE",
  "sET-COokiE",
  "SET-COokiE",
  "set-coOkiE",
  "Set-coOkiE",
  "sEt-coOkiE",
  "SEt-coOkiE",
  "seT-coOkiE",
  "SeT-coOkiE",
  "sET-coOkiE",
  "SET-coOkiE",
  "set-CoOkiE",
  "Set-CoOkiE",
  "sEt-CoOkiE",
  "SEt-CoOkiE",
  "seT-CoOkiE",
  "SeT-CoOkiE",
  "sET-CoOkiE",
  "SET-CoOkiE",
  "set-cOOkiE",
  "Set-cOOkiE",
  "sEt-cOOkiE",
  "SEt-cOOkiE",
  "seT-cOOkiE",
  "SeT-cOOkiE",
  "sET-cOOkiE",
  "SET-cOOkiE",
  "set-COOkiE",
  "Set-COOkiE",
  "sEt-COOkiE",
  "SEt-COOkiE",
  "seT-COOkiE",
  "SeT-COOkiE",
  "sET-COOkiE",
  "SET-COOkiE",
  "set-cooKiE",
  "Set-cooKiE",
  "sEt-cooKiE",
  "SEt-cooKiE",
  "seT-cooKiE",
  "SeT-cooKiE",
  "sET-cooKiE",
  "SET-cooKiE",
  "set-CooKiE",
  "Set-CooKiE",
  "sEt-CooKiE",
  "SEt-CooKiE",
  "seT-CooKiE",
  "SeT-CooKiE",
  "sET-CooKiE",
  "SET-CooKiE",
  "set-cOoKiE",
  "Set-cOoKiE",
  "sEt-cOoKiE",
  "SEt-cOoKiE",
  "seT-cOoKiE",
  "SeT-cOoKiE",
  "sET-cOoKiE",
  "SET-cOoKiE",
  "set-COoKiE",
  "Set-COoKiE",
  "sEt-COoKiE",
  "SEt-COoKiE",
  "seT-COoKiE",
  "SeT-COoKiE",
  "sET-COoKiE",
  "SET-COoKiE",
  "set-coOKiE",
  "Set-coOKiE",
  "sEt-coOKiE",
  "SEt-coOKiE",
  "seT-coOKiE",
  "SeT-coOKiE",
  "sET-coOKiE",
  "SET-coOKiE",
  "set-CoOKiE",
  "Set-CoOKiE",
  "sEt-CoOKiE",
  "SEt-CoOKiE",
  "seT-CoOKiE",
  "SeT-CoOKiE",
  "sET-CoOKiE",
  "SET-CoOKiE",
  "set-cOOKiE",
  "Set-cOOKiE",
  "sEt-cOOKiE",
  "SEt-cOOKiE",
  "seT-cOOKiE",
  "SeT-cOOKiE",
  "sET-cOOKiE",
  "SET-cOOKiE",
  "set-COOKiE",
  "Set-COOKiE",
  "sEt-COOKiE",
  "SEt-COOKiE",
  "seT-COOKiE",
  "SeT-COOKiE",
  "sET-COOKiE",
  "SET-COOKiE",
  "set-cookIE",
  "Set-cookIE",
  "sEt-cookIE",
  "SEt-cookIE",
  "seT-cookIE",
  "SeT-cookIE",
  "sET-cookIE",
  "SET-cookIE",
  "set-CookIE",
  "Set-CookIE",
  "sEt-CookIE",
  "SEt-CookIE",
  "seT-CookIE",
  "SeT-CookIE",
  "sET-CookIE",
  "SET-CookIE",
  "set-cOokIE",
  "Set-cOokIE",
  "sEt-cOokIE",
  "SEt-cOokIE",
  "seT-cOokIE",
  "SeT-cOokIE",
  "sET-cOokIE",
  "SET-cOokIE",
  "set-COokIE",
  "Set-COokIE",
  "sEt-COokIE",
  "SEt-COokIE",
  "seT-COokIE",
  "SeT-COokIE",
  "sET-COokIE",
  "SET-COokIE",
  "set-coOkIE",
  "Set-coOkIE",
  "sEt-coOkIE",
  "SEt-coOkIE",
  "seT-coOkIE",
  "SeT-coOkIE",
  "sET-coOkIE",
  "SET-coOkIE",
  "set-CoOkIE",
  "Set-CoOkIE",
  "sEt-CoOkIE",
  "SEt-CoOkIE",
  "seT-CoOkIE",
  "SeT-CoOkIE",
  "sET-CoOkIE",
  "SET-CoOkIE",
  "set-cOOkIE",
  "Set-cOOkIE",
  "sEt-cOOkIE",
  "SEt-cOOkIE",
  "seT-cOOkIE",
  "SeT-cOOkIE",
  "sET-cOOkIE",
  "SET-cOOkIE",
  "set-COOkIE",
  "Set-COOkIE",
  "sEt-COOkIE",
  "SEt-COOkIE",
  "seT-COOkIE",
  "SeT-COOkIE",
  "sET-COOkIE",
  "SET-COOkIE",
  "set-cooKIE",
  "Set-cooKIE",
  "sEt-cooKIE",
  "SEt-cooKIE",
  "seT-cooKIE",
  "SeT-cooKIE",
  "sET-cooKIE",
  "SET-cooKIE",
  "set-CooKIE",
  "Set-CooKIE",
  "sEt-CooKIE",
  "SEt-CooKIE",
  "seT-CooKIE",
  "SeT-CooKIE",
  "sET-CooKIE",
  "SET-CooKIE",
  "set-cOoKIE",
  "Set-cOoKIE",
  "sEt-cOoKIE",
  "SEt-cOoKIE",
  "seT-cOoKIE",
  "SeT-cOoKIE",
  "sET-cOoKIE",
  "SET-cOoKIE",
  "set-COoKIE",
  "Set-COoKIE",
  "sEt-COoKIE",
  "SEt-COoKIE",
  "seT-COoKIE",
  "SeT-COoKIE",
  "sET-COoKIE",
  "SET-COoKIE",
  "set-coOKIE",
  "Set-coOKIE",
  "sEt-coOKIE",
  "SEt-coOKIE",
  "seT-coOKIE",
  "SeT-coOKIE",
  "sET-coOKIE",
  "SET-coOKIE",
  "set-CoOKIE",
  "Set-CoOKIE",
  "sEt-CoOKIE",
  "SEt-CoOKIE",
  "seT-CoOKIE",
  "SeT-CoOKIE",
  "sET-CoOKIE",
  "SET-CoOKIE",
  "set-cOOKIE",
  "Set-cOOKIE",
  "sEt-cOOKIE",
  "SEt-cOOKIE",
  "seT-cOOKIE",
  "SeT-cOOKIE",
  "sET-cOOKIE",
  "SET-cOOKIE",
  "set-COOKIE",
  "Set-COOKIE",
  "sEt-COOKIE",
  "SEt-COOKIE",
  "seT-COOKIE",
  "SeT-COOKIE",
  "sET-COOKIE",
  "SET-COOKIE"
];
const require$$0 = {
  variations
};
const setCookieVariations = require$$0.variations;
var sanitizeHeaders$1 = function sanitizeHeaders2(headers2) {
  return Object.keys(headers2).reduce((memo, key) => {
    const value = headers2[key];
    if (Array.isArray(value)) {
      if (key.toLowerCase() === "set-cookie") {
        value.forEach((cookie, i) => {
          memo[setCookieVariations[i]] = cookie;
        });
      } else {
        memo[key] = value.join(", ");
      }
    } else {
      memo[key] = value == null ? "" : value.toString();
    }
    return memo;
  }, {});
};
const isBinary3 = isBinary$1;
const Response = response;
const sanitizeHeaders3 = sanitizeHeaders$1;
var formatResponse$1 = (response2, options) => {
  const { statusCode } = response2;
  const headers2 = sanitizeHeaders3(Response.headers(response2));
  if (headers2["transfer-encoding"] === "chunked" || response2.chunkedEncoding) {
    throw new Error("chunked encoding not supported");
  }
  const isBase64Encoded = isBinary3(headers2, options);
  const encoding2 = isBase64Encoded ? "base64" : "utf8";
  const body2 = Response.body(response2).toString(encoding2);
  return { status: statusCode, headers: headers2, isBase64Encoded, body: body2 };
};
const cleanupRequest2 = cleanUpRequest;
const createRequest = createRequest$1;
const formatResponse = formatResponse$1;
var azure$1 = (options) => {
  return (getResponse2) => async (context, req) => {
    const event = cleanupRequest2(req, options);
    const request2 = createRequest(event);
    const response2 = await getResponse2(request2, context, event);
    context.log(response2);
    return formatResponse(response2, options);
  };
};
const aws = aws$1;
const azure = azure$1;
const providers = {
  aws,
  azure
};
var getProvider$1 = function getProvider(options) {
  const { provider = "aws" } = options;
  if (provider in providers) {
    return providers[provider](options);
  }
  throw new Error(`Unsupported provider ${provider}`);
};
const finish2 = finish$1;
const getFramework2 = getFramework$1;
const getProvider2 = getProvider$1;
const defaultOptions = {
  requestId: "x-request-id"
};
var serverlessHttp = function(app, opts) {
  const options = Object.assign({}, defaultOptions, opts);
  const framework = getFramework2(app);
  const provider = getProvider2(options);
  return provider(async (request2, ...context) => {
    await finish2(request2, options.request, ...context);
    const response2 = await framework(request2);
    await finish2(response2, options.response, ...context);
    return response2;
  });
};
const serverless = /* @__PURE__ */ getDefaultExportFromCjs(serverlessHttp);
const { router, notFound, staticFile } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
  static: {
    cacheControl: "public, max-age=31557600"
  },
  getOrigin(req) {
    if (process.env.IS_OFFLINE)
      return `http://${req.headers.host}`;
    return null;
  }
});
const bridgeApp = serverless({
  handle: (req, res) => {
    req.url = fixPath(req.url);
    staticFile(req, res, () => {
      router(req, res, () => {
        notFound(req, res, () => {
        });
      });
    });
  }
}, {
  binary: true
});
function fixPath(path) {
  if (qwikCityPlan.trailingSlash) {
    const url2 = new URL(path, `${"https://alpha-bridge.cloud"}`);
    if (url2.pathname.includes(".", url2.pathname.lastIndexOf("/")))
      return path;
    if (!url2.pathname.endsWith("/"))
      return url2.pathname + "/" + url2.search;
  }
  return path;
}
export {
  bridgeApp
};
