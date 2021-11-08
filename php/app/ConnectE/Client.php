<?php

namespace App\ConnectE;

use GuzzleHttp\Client as HttpClient;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\RequestOptions;
use Psr\Http\Message\ResponseInterface;

class Client
{
    private const HEADER_AUTHORIZATION = 'Authorization';

    private const ENDPOINT_ACCESS_TOKEN = '/v1/access-tokens';
    private const ENDPOINT_CROSS_REFERENCE_PAYMENTS = '/v1/cross-reference-payments';
    private const ENDPOINT_PAYMENTS = '/v1/payments';

    /**
     * @var HttpClient
     */
    private $httpClient;

    /**
     * @var string
     */
    private $apiBaseUrl;

    /**
     * @var string
     */
    private $apiToken;

    /**
     * @param HttpClient $httpClient
     * @param string $apiBaseUrl
     * @param string $apiToken
     */
    public function __construct(
        HttpClient $httpClient,
        string $apiBaseUrl,
        string $apiToken
    ) {
        $this->httpClient = $httpClient;
        $this->apiBaseUrl = $apiBaseUrl;
        $this->apiToken = $apiToken;
    }

    /**
     * @param array $payload
     * @return ResponseInterface
     * @throws GuzzleException
     */
    public function getAccessToken(array $payload): ResponseInterface
    {
        $apiUrl = rtrim($this->apiBaseUrl, '/') . self::ENDPOINT_ACCESS_TOKEN;

        return $this->httpClient->post($apiUrl, [
            RequestOptions::HEADERS => [
                self::HEADER_AUTHORIZATION => $this->apiToken,
            ],
            RequestOptions::JSON => $payload,
        ]);
    }

    /**
     * @param string $id
     * @return ResponseInterface
     * @throws GuzzleException
     */
    public function getPayment(string $id): ResponseInterface
    {
        $apiUrl = rtrim($this->apiBaseUrl, '/') . self::ENDPOINT_PAYMENTS . '/' . $id;

        return $this->httpClient->get($apiUrl, [
            RequestOptions::HEADERS => [
                self::HEADER_AUTHORIZATION => $this->apiToken,
            ],
        ]);
    }

    /**
     * @param string $id
     * @param array $payload
     * @return ResponseInterface
     * @throws GuzzleException
     */
    public function getCrossReferencePayment(string $id, array $payload = []): ResponseInterface
    {
        $apiUrl = rtrim($this->apiBaseUrl, '/') . self::ENDPOINT_CROSS_REFERENCE_PAYMENTS . '/' . $id;

        return $this->httpClient->post($apiUrl, [
            RequestOptions::HEADERS => [
                self::HEADER_AUTHORIZATION => $this->apiToken,
            ],
            RequestOptions::JSON => $payload,
        ]);
    }
}
