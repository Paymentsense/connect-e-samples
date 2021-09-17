<?php

namespace App\Http\Controllers;

use App\ConnectE\Client;
use Exception;
use GuzzleHttp\Client as HttpClient;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Laravel\Lumen\Routing\Controller as BaseController;

class ApiController extends BaseController
{
    public function accessTokens(Request $request)
    {
        $amount = $request->input('amount');
        if (empty($amount)) {
            throw new InvalidArgumentException('amount cannot be empty');
        }

        $transactionType = $request->input('transactionType');
        if (empty($transactionType)) {
            throw new InvalidArgumentException('transactionType cannot be empty');
        }

        $orderId = $request->input('orderId');
        $orderDescription = $request->input('orderDescription');
        $crossReference = $request->input('crossReference');

        $connectEClient = $this->getConnectEClient();
        $response = $connectEClient->getAccessToken([
            'merchantUrl' => env('CONNECT_E_MERCHANT_URL'),
            'currencyCode' => env('CONNECT_E_CURRENCY_CODE'),
            'amount' => $amount,
            'transactionType' => $transactionType,
            'orderId' => $orderId,
            'orderDescription' => $orderDescription,
            'crossReference' => $crossReference,
        ]);

        if ($response->getStatusCode() !== 200) {
            throw new Exception('invalid response from connect-e api');
        }

        $responseBody = $response->getBody()->getContents();
        $responseData = json_decode($responseBody, true);

        return response()->json($responseData, 201);
    }

    public function payments(string $id)
    {
        $connectEClient = $this->getConnectEClient();
        $response = $connectEClient->getPayment($id);

        if ($response->getStatusCode() !== 200) {
            throw new Exception('invalid response from connect-e api');
        }

        $responseBody = $response->getBody()->getContents();
        $responseData = json_decode($responseBody, true);

        return response()->json($responseData);
    }

    public function crossReferencePayments(Request $request, string $id)
    {
        $crossReference = $request->input('crossReference');
        if (empty($crossReference)) {
            throw new InvalidArgumentException('crossReference cannot be empty');
        }

        $connectEClient = $this->getConnectEClient();
        $response = $connectEClient->getCrossReferencePayment($id, [
            'crossReference' => $crossReference,
        ]);

        if ($response->getStatusCode() !== 200) {
            throw new Exception('invalid response from connect-e api');
        }

        $responseBody = $response->getBody()->getContents();
        $responseData = json_decode($responseBody, true);

        return response()->json($responseData);
    }

    private function getConnectEClient(): Client
    {
        $httpClient = new HttpClient();
        $baseApiUrl = env('CONNECT_E_BASE_API_URL');
        $apiToken = env('CONNECT_E_API_TOKEN');

        return new Client($httpClient, $baseApiUrl, $apiToken);
    }
}
