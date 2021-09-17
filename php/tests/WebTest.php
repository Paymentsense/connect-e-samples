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

    public function testSale()
    {
        $this->get('/sale');
        $this->assertResponseOk();

        $expectedView = view('sale');
        $this->assertEquals($expectedView->render(), $this->response->getContent());
    }
}
