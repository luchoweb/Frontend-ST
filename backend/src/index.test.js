const assert = require('node:assert/strict');
const test = require('node:test');
const app = require('./index.js');

test('bootstrap seeds content and enables public permissions', async () => {
  const createCalls = [];
  const updateCalls = [];
  const permissionUpdateCalls = [];

  const strapi = {
    entityService: {
      async findMany(uid, params) {
        if (params && params.limit === 1) {
          return [];
        }

        return null;
      },
      async update(uid, id, payload) {
        updateCalls.push({ uid, id, payload });
      },
      async create(uid, payload) {
        createCalls.push({ uid, payload });
      },
    },
    query(uid) {
      if (uid === 'plugin::users-permissions.role') {
        return {
          async findOne() {
            return { id: 7, type: 'public' };
          },
        };
      }

      if (uid === 'plugin::users-permissions.permission') {
        return {
          async update(args) {
            permissionUpdateCalls.push(args);
          },
        };
      }

      throw new Error(`Unexpected query uid: ${uid}`);
    },
  };

  await app.bootstrap({ strapi });

  assert.equal(updateCalls.length, 0);
  assert.equal(createCalls.length, 12);
  assert.equal(permissionUpdateCalls.length, 8);

  const createdUids = new Set(createCalls.map((call) => call.uid));
  assert.ok(createdUids.has('api::hero.hero'));
  assert.ok(createdUids.has('api::about.about'));
  assert.ok(createdUids.has('api::contact.contact'));
  assert.ok(createdUids.has('api::products-page.products-page'));
  assert.ok(createdUids.has('api::skill.skill'));
  assert.ok(createdUids.has('api::project.project'));

  assert.ok(
    permissionUpdateCalls.some(
      (call) => call.where.action === 'api::products-page.products-page.find' && call.data.enabled
    )
  );
});