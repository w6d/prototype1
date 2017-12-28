import RxDB from 'rxdb';

run();

async function run() {
    RxDB.plugin(require('pouchdb-adapter-websql'));

    const db = await RxDB.create({
        name: 'heroesdb',           // <- name
        adapter: 'websql',          // <- storage-adapter
        password: 'myPassword',     // <- password (optional)
        multiInstance: true         // <- multiInstance (default: true)
    });
    console.dir(db);

    let myHeroSchema = {
        "title": "hero schema",
        "version": 0,
        "description": "describes a simple hero",
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "primary": true
            },
            "color": {
                "type": "string"
            },
            "healthpoints": {
                "type": "number",
                "min": 0,
                "max": 100
            },
            "secret": {
                "type": "string",
                "encrypted": true
            },
            "birthyear": {
                "type": "number",
                "final": true,
                "min": 1900,
                "max": 2050
            },
            "skills": {
                "type": "array",
                "maxItems": 5,
                "uniqueItems": true,
                "item": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "damage": {
                            "type": "number"
                        }
                    }
                }
            }
        },
        "required": ["color"]
    }

    await db.collection({
        name: 'heroes',
        schema: myHeroSchema
    });
    console.dir(db.heroes.name);
    const doc = await db.heroes.insert({
        name: 'Baymax',
        color: '#FFFFFF',
        birthyear: 2014
    });

}