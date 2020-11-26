const chai = require('chai');
const chaiHttp = require('chai-http');

//Assertion style
var should = chai.should();
chai.use(chaiHttp);

describe ('bookings',()=>{

    /**
     * Test the GET Server Heartbeat route
     */
    describe("GET /api/booking/heartbeat", ()=>{
        it('should check server health',(done)=>{
            chai.request('http://localhost:8000')
                .get('/api/booking/heartbeat')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.should.be.json;                                    
                    res.body[0].should.have.property('message');                  
                    done();
            });
        });
    });

    /**
     * Test the GET Server Bookings
     */
    describe("GET /api/booking", ()=>{
        it('should search bookings based on event id',(done)=>{
            chai.request('http://localhost:8000')
                .get('/api/booking')
                .end((err,res)=>{
                    res.should.have.status(200);                                
                    res.should.be.json;
                    res.body.should.a('array');                
                    res.body[0].should.have.property('eventId');
                    res.body[0].should.have.property('quantity');
                    res.body[0].should.have.property('proposedPrice');
                    res.body[0].should.have.property('id');
                    done();
            });
        });
        it('should give invalid booking id',(done)=>{
            chai.request('http://localhost:8000')
                .get('/api/booking?eventId=Invalid')
                .end((err,res)=>{
                    res.should.have.status(404);
                    done();
            });
        });
    });

    /**
     * Test the GET Server Bookings based on searching event ID
     */
    describe("GET /api/booking", ()=>{
        it('should search bookings based on event id',(done)=>{
            chai.request('http://localhost:8000')
                .get('/api/booking')
                .end((err,res)=>{
                    res.should.have.status(200);                                
                    res.should.be.json;
                    res.body.should.a('array');                
                    res.body[0].should.have.property('eventId');
                    res.body[0].should.have.property('quantity');
                    res.body[0].should.have.property('proposedPrice');
                    res.body[0].should.have.property('id');
                    done();
            });
        });
        it('should give invalid booking id',(done)=>{
            chai.request('http://localhost:8000')
                .get('/api/booking?eventId=Invalid')
                .end((err,res)=>{
                    res.should.have.status(404);
                    done();
            });
        });
    });

    /**
     * Test the GET Server Bookings based on Booking ID
     */
    describe("GET /api/booking/${id}", ()=>{
        it('should search bookings based on event id',(done)=>{
            chai.request('http://localhost:8000')
                .get('/api/booking/${id}')
                .end((err,res)=>{
                    res.should.have.status(200);                                
                    res.should.be.json;
                    done();
            });
        });
        it('should give invalid booking id',(done)=>{
            chai.request('http://localhost:8000')
                .get('/api/booking/3333333333')
                .end((err,res)=>{
                    res.should.have.status(404);
                    done();
            });
        });
    });

    /**
     * Test the POST new bookings route
     */
    describe("POST /api/booking", ()=>{
        it('should create a new booking',(done)=>{
            chai.request('http://localhost:8000')                
                .post('/api/booking')
                .send({
                    "eventId":"XXXXXX",
                    "Quantity":5
                })
                .end((err,res)=>{
                    res.should.have.status(201);               
                    done();
            });
        });

        it('should not create a new booking - Bad request',(done)=>{
            chai.request('http://localhost:8000')
                .post('/api/booking')
                .end((err,res)=>{
                    res.should.have.status(400);                
                    done();
            });
        });
    });
});