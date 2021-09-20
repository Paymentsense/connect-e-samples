<?php

class WebTest extends TestCase
{
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
}