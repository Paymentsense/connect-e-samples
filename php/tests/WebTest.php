<?php

class WebTest extends TestCase
{
    public function testCollection()
    {
        $this->get('/collection');
        $this->assertResponseOk();

        $expectedView = view('collection');
        $this->assertEquals($expectedView->render(), $this->response->getContent());
    }

    public function testHome()
    {
        $this->get('/');
        $this->assertResponseOk();

        $expectedView = view('home');
        $this->assertEquals($expectedView->render(), $this->response->getContent());
    }

    public function testPreAuth()
    {
        $this->get('/pre-auth');
        $this->assertResponseOk();

        $expectedView = view('pre-auth');
        $this->assertEquals($expectedView->render(), $this->response->getContent());
    }

    public function testRefund()
    {
        $this->get('/refund');
        $this->assertResponseOk();

        $expectedView = view('refund');
        $this->assertEquals($expectedView->render(), $this->response->getContent());
    }

    public function testSale()
    {
        $this->get('/sale');
        $this->assertResponseOk();

        $expectedView = view('sale');
        $this->assertEquals($expectedView->render(), $this->response->getContent());
    }

    public function testSubscription()
    {
        $this->get('/subscription');
        $this->assertResponseOk();

        $expectedView = view('subscription');
        $this->assertEquals($expectedView->render(), $this->response->getContent());
    }

    public function testVoid()
    {
        $this->get('/void');
        $this->assertResponseOk();

        $expectedView = view('void');
        $this->assertEquals($expectedView->render(), $this->response->getContent());
    }

    public function testWallet()
    {
        $this->get('/wallet');
        $this->assertResponseOk();

        $expectedView = view('wallet');
        $this->assertEquals($expectedView->render(), $this->response->getContent());
    }
}
