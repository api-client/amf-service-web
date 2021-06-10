import { assert } from '@open-wc/testing';
import { ns } from '../../src/Namespace.js';

describe('AMF namespace', () => {
  describe('na exports', () => {
    it('has all keys', () => {
      const keys = Object.keys(ns);
      const compare = ['aml', 'raml', 'w3'];
      assert.deepEqual(keys, compare);
    });
  });

  describe('ns.w3', () => {
    it('is read only', () => {
      assert.throws(() => {
        // @ts-ignore
        ns.w3 = 'test';
      });
    });

    describe('ns.w3.rdfSyntax', () => {
      it('is read only', () => {
        assert.throws(() => {
          // @ts-ignore
          ns.w3.rdfSyntax = 'test';
        });
      });

      [
        'member',
        'Seq',
      ].forEach((name) => {
        assert.equal(ns.w3.rdfSyntax[name], `http://www.w3.org/1999/02/22-rdf-syntax-ns#${name}`, `${name} is set`);
      });
    });

    describe('ns.w3.rdfSchema', () => {
      it('is read only', () => {
        assert.throws(() => {
          // @ts-ignore
          ns.w3.rdfSchema = 'test';
        });
      });

      [
        'member',
        'Seq',
      ].forEach((name) => {
        assert.equal(ns.w3.rdfSchema[name], `http://www.w3.org/2000/01/rdf-schema#${name}`, `${name} is set`);
      });
    });

    describe('ns.w3.xmlSchema', () => {
      it('is read only', () => {
        assert.throws(() => {
          // @ts-ignore
          ns.w3.xmlSchema = 'test';
        });
      });

      [
        'boolean',
        'string',
        'number',
        'integer',
        'long',
        'double',
        'float',
        'nil',
        'dateTime',
        'time',
        'date',
        'base64Binary',
      ].forEach((name) => {
        assert.equal(ns.w3.xmlSchema[name], `http://www.w3.org/2001/XMLSchema#${name}`, `${name} is set`);
      });
    });

    describe('ns.w3.shacl', () => {
      it('is read only', () => {
        assert.throws(() => {
          // @ts-ignore
          ns.w3.shacl = 'test';
        });
      });

      [
        'in',
        'defaultValue',
        'defaultValueStr',
        'pattern',
        'minInclusive',
        'maxInclusive',
        'multipleOf',
        'minLength',
        'maxLength',
        'fileType',
        'and',
        'property',
        'name',
        'raw',
        'datatype',
        'minCount',
        'Shape',
        'NodeShape',
        'SchemaShape',
        'PropertyShape',
        'xone',
        'not',
        'or',
      ].forEach((name) => {
        assert.equal(ns.w3.shacl[name], `http://www.w3.org/ns/shacl#${name}`, `${name} is set`);
      });
    });

    describe('ns.vocabularies.document', () => {
      const key = 'http://a.ml/vocabularies/document#';
      it('is read only', () => {
        assert.throws(() => {
          // @ts-ignore
          ns.aml.vocabularies.document = 'test';
        });
      });

      [
        ['Module', `${key}Module`],
        ['Document', `${key}Document`],
        ['SecuritySchemeFragment', `${key}SecuritySchemeFragment`],
        ['UserDocumentation', `${key}UserDocumentation`],
        ['DataType', `${key}DataType`],
        ['NamedExamples', `${key}NamedExamples`],
        ['DomainElement', `${key}DomainElement`],
        ['customDomainProperties', `${key}customDomainProperties`],
        ['encodes', `${key}encodes`],
        ['declares', `${key}declares`],
        ['references', `${key}references`],
        ['examples', `${key}examples`],
        ['linkTarget', `${key}link-target`],
        ['referenceId', `${key}reference-id`],
        ['structuredValue', `${key}structuredValue`],
        ['raw', `${key}raw`],
        ['extends', `${key}extends`],
        ['value', `${key}value`],
        ['name', `${key}name`],
      ].forEach(([property, value]) => {
        it(`has value for ${property}`, () => {
          assert.equal(ns.aml.vocabularies.document[property], value);
        });
      });
    });

    describe('ns.vocabularies.security', () => {
      const key = 'http://a.ml/vocabularies/security#';
      it('is read only', () => {
        assert.throws(() => {
          // @ts-ignore
          ns.aml.vocabularies.security = 'test';
        });
      });

      [
        ['ParametrizedSecurityScheme', `${key}ParametrizedSecurityScheme`],
        ['SecuritySchemeFragment', `${key}SecuritySchemeFragment`],
        ['SecurityScheme', `${key}SecurityScheme`],
        ['OAuth1Settings', `${key}OAuth1Settings`],
        ['OAuth2Settings', `${key}OAuth2Settings`],
        ['Scope', `${key}Scope`],
        ['Settings', `${key}Settings`],
        ['HttpSettings', `${key}HttpSettings`],
        ['ApiKeySettings', `${key}ApiKeySettings`],
        ['OpenIdConnectSettings', `${key}OpenIdConnectSettings`],
        ['security', `${key}security`],
        ['scheme', `${key}scheme`],
        ['settings', `${key}settings`],
        ['name', `${key}name`],
        ['type', `${key}type`],
        ['scope', `${key}scope`],
        ['accessTokenUri', `${key}accessTokenUri`],
        ['authorizationUri', `${key}authorizationUri`],
        ['authorizationGrant', `${key}authorizationGrant`],
        ['flows', `${key}flows`],
        ['flow', `${key}flow`],
        ['signature', `${key}signature`],
        ['tokenCredentialsUri', `${key}tokenCredentialsUri`],
        ['requestTokenUri', `${key}requestTokenUri`],
        ['SecurityRequirement', `${key}SecurityRequirement`],
        ['openIdConnectUrl', `${key}openIdConnectUrl`],
        ['bearerFormat', `${key}bearerFormat`],
        ['in', `${key}in`],
      ].forEach(([property, value]) => {
        it(`has value for ${property}`, () => {
          assert.equal(ns.aml.vocabularies.security[property], value);
        });
      });
    });

    describe('ns.vocabularies.core', () => {
      const key = 'http://a.ml/vocabularies/core#';
      it('is read only', () => {
        assert.throws(() => {
          // @ts-ignore
          ns.aml.vocabularies.core = 'test';
        });
      });

      [
        ['CreativeWork', `${key}CreativeWork`],
        ['version', `${key}version`],
        ['urlTemplate', `${key}urlTemplate`],
        ['displayName', `${key}displayName`],
        ['title', `${key}title`],
        ['name', `${key}name`],
        ['description', `${key}description`],
        ['documentation', `${key}documentation`],
        ['version', `${key}version`],
        ['provider', `${key}provider`],
        ['email', `${key}email`],
        ['url', `${key}url`],
        ['termsOfService', `${key}termsOfService`],
        ['license', `${key}license`],
        ['mediaType', `${key}mediaType`],
        ['extensionName', `${key}extensionName`],
      ].forEach(([property, value]) => {
        it(`has value for ${property}`, () => {
          assert.equal(ns.aml.vocabularies.core[property], value);
        });
      });
    });

    describe('ns.vocabularies.apiContract', () => {
      const key = 'http://a.ml/vocabularies/apiContract#';
      it('is read only', () => {
        assert.throws(() => {
          // @ts-ignore
          ns.aml.vocabularies.apiContract = 'test';
        });
      });

      [
        ['Payload', `${key}Payload`],
        ['Request', `${key}Request`],
        ['Response', `${key}Response`],
        ['EndPoint', `${key}EndPoint`],
        ['Parameter', `${key}Parameter`],
        ['Operation', `${key}Operation`],
        ['WebAPI', `${key}WebAPI`],
        ['AsyncAPI', `${key}AsyncAPI`],
        ['API', `${key}API`],
        ['UserDocumentationFragment', `${key}UserDocumentationFragment`],
        ['Example', `${key}Example`],
        ['Server', `${key}Server`],
        ['ParametrizedResourceType', `${key}ParametrizedResourceType`],
        ['ParametrizedTrait', `${key}ParametrizedTrait`],
        ['TemplatedLink', `${key}TemplatedLink`],
        ['IriTemplateMapping', `${key}IriTemplateMapping`],
        ['Callback', `${key}Callback`],
        ['Message', `${key}Message`],
        ['header', `${key}header`],
        ['parameter', `${key}parameter`],
        ['paramName', `${key}paramName`],
        ['uriParameter', `${key}uriParameter`],
        ['variable', `${key}variable`],
        ['payload', `${key}payload`],
        ['path', `${key}path`],
        ['url', `${key}url`],
        ['scheme', `${key}scheme`],
        ['endpoint', `${key}endpoint`],
        ['queryString', `${key}queryString`],
        // ['mediaType', key + 'mediaType'],
        ['accepts', `${key}accepts`],
        ['guiSummary', `${key}guiSummary`],
        ['binding', `${key}binding`],
        ['response', `${key}response`],
        ['returns', `${key}returns`],
        ['expects', `${key}expects`],
        ['examples', `${key}examples`],
        ['supportedOperation', `${key}supportedOperation`],
        ['statusCode', `${key}statusCode`],
        ['method', `${key}method`],
        ['required', `${key}required`],
        ['callback', `${key}callback`],
        ['expression', `${key}expression`],
        ['link', `${key}link`],
        ['linkExpression', `${key}linkExpression`],
        ['templateVariable', `${key}templateVariable`],
        ['mapping', `${key}mapping`],
        ['operationId', `${key}operationId`],
        ['protocol', `${key}protocol`],
        ['protocolVersion', `${key}protocolVersion`],
        ['contentType', `${key}contentType`],
      ].forEach(([property, value]) => {
        it(`has value for ${property}`, () => {
          assert.equal(ns.aml.vocabularies.apiContract[property], value);
        });
      });
    });

    describe('ns.vocabularies.shapes', () => {
      const key = 'http://a.ml/vocabularies/shapes#';
      it('is read only', () => {
        assert.throws(() => {
          // @ts-ignore
          ns.aml.vocabularies.shapes = 'test';
        });
      });

      [
        ['ScalarShape', `${key}ScalarShape`],
        ['ArrayShape', `${key}ArrayShape`],
        ['UnionShape', `${key}UnionShape`],
        ['NilShape', `${key}NilShape`],
        ['FileShape', `${key}FileShape`],
        ['AnyShape', `${key}AnyShape`],
        ['SchemaShape', `${key}SchemaShape`],
        ['MatrixShape', `${key}MatrixShape`],
        ['TupleShape', `${key}TupleShape`],
        ['DataTypeFragment', `${key}DataTypeFragment`],
        ['RecursiveShape', `${key}RecursiveShape`],
        ['range', `${key}range`],
        ['items', `${key}items`],
        ['anyOf', `${key}anyOf`],
        ['fileType', `${key}fileType`],
        ['number', `${key}number`],
        ['integer', `${key}integer`],
        ['long', `${key}long`],
        ['double', `${key}double`],
        ['boolean', `${key}boolean`],
        ['float', `${key}float`],
        ['nil', `${key}nil`],
        ['dateTimeOnly', `${key}dateTimeOnly`],
        ['password', `${key}password`],
        ['schema', `${key}schema`],
        ['xmlSerialization', `${key}xmlSerialization`],
        ['xmlName', `${key}xmlName`],
        ['xmlAttribute', `${key}xmlAttribute`],
        ['xmlWrapped', `${key}xmlWrapped`],
        ['readOnly', `${key}readOnly`],
      ].forEach(([property, value]) => {
        it(`has value for ${property}`, () => {
          assert.equal(ns.aml.vocabularies.shapes[property], value);
        });
      });
    });

    describe('ns.vocabularies.data', () => {
      const key = 'http://a.ml/vocabularies/data#';
      it('is read only', () => {
        assert.throws(() => {
          // @ts-ignore
          ns.aml.vocabularies.data = 'test';
        });
      });

      [
        ['Scalar', `${key}Scalar`],
        ['Object', `${key}Object`],
        ['Array', `${key}Array`],
        ['value', `${key}value`],
        ['description', `${key}description`],
        ['required', `${key}required`],
        ['displayName', `${key}displayName`],
        ['minLength', `${key}minLength`],
        ['maxLength', `${key}maxLength`],
        ['default', `${key}default`],
        ['multipleOf', `${key}multipleOf`],
        ['minimum', `${key}minimum`],
        ['maximum', `${key}maximum`],
        ['enum', `${key}enum`],
        ['pattern', `${key}pattern`],
        ['items', `${key}items`],
        ['format', `${key}format`],
        ['example', `${key}example`],
        ['examples', `${key}examples`],
      ].forEach(([property, value]) => {
        it(`has value for ${property}`, () => {
          assert.equal(ns.aml.vocabularies.data[property], value);
        });
      });
    });

    describe('ns.vocabularies.docSourceMaps', () => {
      const key = 'http://a.ml/vocabularies/document-source-maps#';
      it('is read only', () => {
        assert.throws(() => {
          // @ts-ignore
          ns.aml.vocabularies.docSourceMaps = 'test';
        });
      });

      [
        ['sources', `${key}sources`],
        ['element', `${key}element`],
        ['value', `${key}value`],
        ['declaredElement', `${key}declared-element`],
        ['trackedElement', `${key}tracked-element`],
        ['parsedJsonSchema', `${key}parsed-json-schema`],
        ['lexical', `${key}lexical`],
      ].forEach(([property, value]) => {
        it(`has value for ${property}`, () => {
          assert.equal(ns.aml.vocabularies.docSourceMaps[property], value);
        });
      });
    });

    
  });
});
