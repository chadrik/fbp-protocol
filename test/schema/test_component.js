const chai = require('chai');
const tv4 = require('tv4');
const uuid = require('uuid').v4;
const schemas = require('../../schema/schemas.js');

describe('Test component protocol schema on event', () => {
  before(() => {
    const sharedSchema = schemas.shared;
    const componentSchema = schemas.component;
    tv4.addSchema('/shared/', sharedSchema);
    tv4.addSchema('/component/', componentSchema);
  });

  describe('output', () => {
    describe('error', () => {
      const schema = '/component/output/error';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'component',
          command: 'error',
          payload: {
            message: 'component failed to compile, line fofof:33',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('component', () => {
      const schema = '/component/output/component';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'component',
          command: 'component',
          payload: {
            name: 'mycomponent',
            subgraph: false,
            inPorts: [],
            outPorts: [],
          },
        };

        const res = tv4.validate(event, schema);
        chai.expect(res).to.equal(true);
      });
    });

    describe('source', () => {
      const schema = '/component/output/source';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'component',
          command: 'source',
          payload: {
            name: 'component1',
            language: 'coffeescript',
            code: '-> console.log Array.prototype.slice.call arguments',
          },
        };

        const res = tv4.validate(event, schema);
        chai.expect(res).to.equal(true);
      });
    });
  });

  describe('input', () => {
    describe('list', () => {
      const schema = '/component/input/list';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'component',
          command: 'list',
          payload: {},
          requestId: uuid(),
        };

        const res = tv4.validate(event, schema);
        chai.expect(res).to.equal(true);
      });
    });

    describe('getsource', () => {
      const schema = '/component/input/getsource';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'component',
          command: 'getsource',
          payload: {
            name: 'component1',
          },
          requestId: uuid(),
        };

        const res = tv4.validate(event, schema);
        chai.expect(res).to.equal(true);
      });
    });

    describe('source', () => {
      const schema = '/component/input/source';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'component',
          command: 'source',
          payload: {
            name: 'component1',
            language: 'coffeescript',
            code: '-> console.log Array.prototype.slice.call arguments',
          },
          requestId: uuid(),
        };

        const res = tv4.validate(event, schema);
        chai.expect(res).to.equal(true);
      });
    });
  });
});
