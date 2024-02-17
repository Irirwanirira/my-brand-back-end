import supertest from 'supertest';

var server = supertest.agent("http://localhost:3000");

describe('GET /', function() {
    it('respond with json', function(done) {
        server
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .end(function(err, res) {
            if (err) return done(err);
            done();
        });
    });
})