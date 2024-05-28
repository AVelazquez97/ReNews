<?php

use App\Config\Services;
use CodeIgniter\Test\CIUnitTestCase;

/**
 * @internal
 */
final class ExampleSessionTest extends CIUnitTestCase
{
    public function testSessionSimple(): void
    {
        $session = Services::session();

        $session->set('logged_in', 123);
        $this->assertSame(123, $session->get('logged_in'));
    }
}
