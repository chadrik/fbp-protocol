const chai = require('chai');
const tv4 = require('tv4');
const uuid = require('uuid').v4;
const schemas = require('../../schema/schemas.js');
const format = require('../../schema/format');

describe('Test network protocol schema on events', () => {
  before(() => {
    const sharedSchema = schemas.shared;
    const networkSchema = schemas.network;
    tv4.addSchema('/shared/', sharedSchema);
    tv4.addSchema('/network/', networkSchema);
    format(tv4);
  });

  describe('output', () => {
    describe('stopped', () => {
      const schema = '/network/output/stopped';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'stopped',
          payload: {
            time: '2016-05-29T13:26:01.000Z',
            uptime: 1000,
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });

      it('should invalidate event with invalid date', () => {
        const event = {
          protocol: 'network',
          command: 'stopped',
          payload: {
            time: '5a.m.',
            uptime: 1000,
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.not.equal([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(false);
      });

      it('should invalidate event with extra fields', () => {
        // Tests that /shared/message $ref is added properly
        const event = {
          hello: true,
          protocol: 'network',
          command: 'stopped',
          payload: {
            time: '2016-05-29T13:26:01.000Z',
            uptime: 1000,
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.not.equal([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(false);
      });
    });

    describe('started', () => {
      const schema = '/network/output/started';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'started',
          payload: {
            time: '2016-05-29T13:26:01.000Z',
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('status', () => {
      const schema = '/network/output/status';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'status',
          payload: {
            running: true,
            uptime: 1000,
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('output', () => {
      const schema = '/network/output/output';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'output',
          payload: {
            message: 'hello',
            type: 'message',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });

      it('should invalidate event with invalid type', () => {
        const event = {
          protocol: 'network',
          command: 'output',
          payload: {
            message: 'hello',
            type: 'hello',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.not.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(false);
      });
    });

    describe('error', () => {
      const schema = '/network/output/error';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'error',
          payload: {
            message: 'oops',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('processerror', () => {
      const schema = '/network/output/processerror';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'processerror',
          payload: {
            id: 'node1',
            error: 'BigError',
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('icon', () => {
      const schema = '/network/output/icon';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'icon',
          payload: {
            id: 'node1',
            icon: 'amazingicon',
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('connect', () => {
      const schema = '/network/output/connect';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'connect',
          payload: {
            id: 'node1 OUT -> IN node2',
            src: {
              node: 'node1',
              port: 'out',
            },
            tgt: {
              node: 'node2',
              port: 'in',
            },
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('begingroup', () => {
      const schema = '/network/output/begingroup';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'begingroup',
          payload: {
            id: 'node1 OUT -> IN node2',
            src: {
              node: 'node1',
              port: 'out',
            },
            tgt: {
              node: 'node2',
              port: 'in',
            },
            group: 'group1',
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });

      it('should invalidate event without required fields', () => {
        const event = {
          protocol: 'network',
          command: 'begingroup',
          payload: {
            id: 'node1 OUT -> IN node2',
            src: {
              node: 'node1',
              port: 'out',
            },
            tgt: {
              node: 'node2',
              port: 'in',
            },
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).not.to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(false);
      });

      it('should invalidate event with extra fields', () => {
        const event = {
          protocol: 'network',
          command: 'begingroup',
          payload: {
            id: 'node1 OUT -> IN node2',
            src: {
              node: 'node1',
              port: 'out',
            },
            tgt: {
              node: 'node2',
              port: 'in',
            },
            group: 'group1',
            graph: 'mygraph',
            extra: 'test',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).not.to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(false);
      });
    });

    describe('data', () => {
      const schema = '/network/output/data';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'data',
          payload: {
            id: 'node1 OUT -> IN node2',
            src: {
              node: 'node1',
              port: 'out',
            },
            tgt: {
              node: 'node2',
              port: 'in',
            },
            data: 5,
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('endgroup', () => {
      const schema = '/network/output/endgroup';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'endgroup',
          payload: {
            id: 'node1 OUT -> IN node2',
            src: {
              node: 'node1',
              port: 'out',
            },
            tgt: {
              node: 'node2',
              port: 'in',
            },
            group: 'group1',
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('disconnect', () => {
      const schema = '/network/output/disconnect';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'disconnect',
          payload: {
            id: 'node1 OUT -> IN node2',
            src: {
              node: 'node1',
              port: 'out',
            },
            tgt: {
              node: 'node2',
              port: 'in',
            },
            graph: 'mygraph',
          },
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });
  });

  describe('input', () => {
    describe('start', () => {
      const schema = '/network/input/start';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'start',
          payload: {
            graph: 'start',
          },
          requestId: uuid(),
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('getstatus', () => {
      const schema = '/network/input/getstatus';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'getstatus',
          payload: {
            graph: 'mygraph',
          },
          requestId: uuid(),
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('getstatus', () => {
      const schema = '/network/input/getstatus';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'getstatus',
          payload: {
            graph: 'mygraph',
          },
          requestId: uuid(),
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('stop', () => {
      const schema = '/network/input/stop';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'stop',
          payload: {
            graph: 'mygraph',
          },
          requestId: uuid(),
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('persist', () => {
      const schema = '/network/input/persist';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'persist',
          payload: {},
          requestId: uuid(),
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('debug', () => {
      const schema = '/network/input/debug';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'debug',
          payload: {
            enable: true,
            graph: 'mygraph',
          },
          requestId: uuid(),
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });

    describe('edges', () => {
      const schema = '/network/input/edges';

      it('should have schema', () => chai.expect(tv4.getSchema(schema)).to.exist);

      it('should validate event with required fields', () => {
        const event = {
          protocol: 'network',
          command: 'edges',
          payload: {
            graph: 'mygraph',
            edges: [{
              src: {
                node: 'node1',
                port: 'OUT',
              },
              tgt: {
                node: 'node2',
                port: 'IN',
                index: 0,
              },
            },
            ],
          },
          requestId: uuid(),
        };

        const res = tv4.validateMultiple(event, schema);
        chai.expect(res.errors).to.eql([]);
        chai.expect(res.missing).to.eql([]);
        chai.expect(res.valid).to.equal(true);
      });
    });
  });
});
