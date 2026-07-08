---
title: Phalcon Framework
tags:
    - php
    - framework
    - phalcon
    - development
---

# Phalcon

## QueryBuilder usage

```php
$qb = $this->modelsManager->createBuilder()
        ->addFrom('CompanySite', 'cs')
        ->columns([
            'cp.id as company_id', 
            'sl.id as site_location_id', 
            'cs.id as company_site_id',
            'cp.name as company_name', 
            'sl.name as site_location_name', 
            'cs.name as company_site_name',
            'cs.city as company_site_city',
            'sp.base_price as base_price', 
            'sp.price as price',
        ])
        ->leftJoin('Company', 'cp.id = cs.company_id', 'cp')
        ->leftJoin('ShippingPrice', 'sp.company_site_id = cs.id', 'sp')
        ->leftJoin('SiteLocation', 'sp.site_location_id = sl.id', 'sl')
        ->where('cs.active = 1 '.
                'AND sl.active = 1 '. // or ->andWhere('condition2')
                'AND sp.active = 1 '.
                'AND cp.active = 1')
        ->orderBy('cp.name, sl.name, cs.name');
$result = $qb->getQuery()->execute()->toArray();
```

## ApiCore

### Constant definitions

APP_PATH and BASE_PATH in the ```index.php``` :

```php
define(BASE_PATH, __DIR__);
define(APP_PATH, BASE_PATH . '/src/');
```

### Configuration

Config like this ```src/config/config.php``` :

```php
return [
    'database' => [
        'adapter'   => 'MySql',
        'host'      => 'localhost',
        'username'  => 'dbuser',
        'password'  => 'dbpass',
        'dbname'    => 'phalcondb',
        'charset'   => 'utf8mb4',
    ],
    'appliation'    => [
        'apiKey'    => 'sdfjaksldjfalksjdfLKJKLJLSJFDLFKJ8878-kldsfkljsdflkj',
        'modelsDir'      => '/Models',
        'controllersDir' => '/Controllers',
        'viewsDir'       => '/Views',
        'servicesDir'    => '/Services',
        'tasksDir'       => '/Tasks',
    ],
];
```

### Routes

Routes in ```src/config/router.php``` :

```php
$collection = new Phalcon\Mvc\Micro\Collection();
$collection->setHandler(SiteController::class, true)
           ->setPrefix('/site')
           ->get('/', 'indexAction');
$app->mount($collection);           
```

### Preflight responses

Add preflight responses in ```src/Controllers/BaseController.php```:

```php
/**
  * Provides a base CORS policy for routes like '/users' that represent a Resource's base url
  * Origin is allowed from all urls.  Setting it here using the Origin header from the request
  * allows multiple Origins to be served.  It is done this way instead of with a wildcard '*'
  * because wildcard requests are not supported when a request needs credentials.
  *
  * @return true
  */
 public function optionsBase(){
  $response = $this->di->get('response');
  $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
  $response->setHeader('Access-Control-Allow-Origin', $this->di->get('request')->header('Origin'));
  $response->setHeader('Access-Control-Allow-Credentials', 'true');
  $response->setHeader('Access-Control-Allow-Headers', "origin, x-requested-with, content-type");
  $response->setHeader('Access-Control-Max-Age', '86400');
  return true;
 }

 /**
  * Provides a CORS policy for routes like '/users/123' that represent a specific resource
  *
  * @return true
  */
 public function optionsOne(){
  $response = $this->di->get('response');
  $response->setHeader('Access-Control-Allow-Methods', 'GET, PUT, PATCH, DELETE, OPTIONS, HEAD');
  $response->setHeader('Access-Control-Allow-Origin', $this->di->get('request')->header('Origin'));
  $response->setHeader('Access-Control-Allow-Credentials', 'true');
  $response->setHeader('Access-Control-Allow-Headers', "origin, x-requested-with, content-type");
  $response->setHeader('Access-Control-Max-Age', '86400');
  return true;
 }
```

### Core class

And finally the ```ApiCore``` class:

```php
<?php

namespace Phalcon\Core\ApplicationFactory;

use Exception;
use Phalcon\Config;
use Phalcon\Loader;
use Phalcon\Mvc\Micro;
use Phalcon\Url as UrlResolver;
use Phalcon\Config\Adapter\Php as PhpConfig;
use Phalcon\Mvc\View\Simple as View;
use Phalcon\Di\FactoryDefault as DefaultDi;
use Phalcon\Events\Manager as EventsManager;
use Phalcon\Mvc\Model\Manager as ModelsManager;

use Phalcon\Di\FactoryDefault\Cli as CliDi;
use Phalcon\Cli\Console as ConsoleApp;

/**
 * CLI and REST API application factory.
 *
 * For CLI use createCLI() and use createMicro() for REST API services.
 *
 * Config files: APP_PATH/config/config.php and APP_PATH/config/router.php
 */
class ApiCore
{
    /**
     * Creates a Phalcon Micro application
     *
     * @return Micro
     * @throws Exception
     */
    static public function createMicro()
    {
        if (!defined('APP_PATH')) {
            throw new Exception("FATAL: APP_PATH is not defined!");
        }
        $di = new DefaultDi();
        self::initServices($di);
        self::initLoader($di);

        $app = new Micro($di);
        self::initDefaultHandlers($app);
        self::initRoutes($app);
        return $app;
    }

    /**
     * Creates the default Di instance with config, url, views, eventsManager, modelsManager and DB connection services.
     *
     * @param $di
     */
    static protected function initServices(&$di)
    {

        $di->setShared('config', function() {
            return new PhpConfig(APP_PATH . "/config/config.php");
        });

        $di->setShared('view', function() {
            $config = $this->getConfig();
            $view = new View();
            $view->setViewsDir(APP_PATH . $config->application->viewsDir);
            return $view;
        });

        $di->setShared('url', function() {
            $config = $this->getConfig();
            $url = new UrlResolver();
            $url->setBaseUri($config->application->baseUri);
            return $url;
        });

        $di->setShared('db', function() {
            $config = $this->getConfig();

            $class = 'Phalcon\Db\Adapter\Pdo\\' . $config->database->adapter;
            $params = [
                'host'     => $config->database->host,
                'username' => $config->database->username,
                'password' => $config->database->password,
                'dbname'   => $config->database->dbname,
                'charset'  => $config->database->charset,
            ];

            if ($config->database->adapter == 'Postgresql') {
                unset($params['charset']);
            }

            return new $class($params);
        });

        $di->setShared('eventsManager', function() {
            return new EventsManager();
        });

        $di->setShared('modelsManager', function() {
            $manager = new ModelsManager();
            $manager->setEventsManager($this->getEventsManager());
            return $manager;
        });

        $di->set('requestBody', function() {
            $in = file_get_contents('php://input');
            $in = json_decode($in, FALSE);

            // JSON body could not be parsed, throw exception
            if($in === null){
                throw new HTTPException(
                    'There was a problem understanding the data sent to the server by the application.',
                    409,
                    array(
                        'dev' => 'The JSON body sent to the server was unable to be parsed.',
                        'internalCode' => 'REQ1000',
                        'more' => ''
                    )
                );
            }

            return $in;
        });

        include_once APP_PATH . '/config/services.php';
    }

    /**
     * Registering the autoloader
     *
     * @param Config $config Configuration object
     */
    static private function initLoader(&$di, $cli = false)
    {
        $config = $di->getConfig();
        $loader = new Loader();

        $dirs = [
            APP_PATH . $config->application->modelsDir,
            APP_PATH . $config->application->controllersDir,
            APP_PATH . $config->application->servicesDir,
            APP_PATH . $config->application->viewsDir,
        ];
        $namespaces = [
            'App\Models'      => APP_PATH . $config->application->modelsDir,
            'App\Controllers' => APP_PATH . $config->application->controllersDir,
            'App\Services'    => APP_PATH . $config->application->servicesDir,
        ];

        if ($cli && isset($config->application['tasksDir'])) {
            $dirs[] = APP_PATH . $config->application->tasksDir;
            $namespaces['App\Tasks'] = APP_PATH . $config->application->tasksDir;
        }

        $loader->registerDirs($dirs);
        $loader->registerNamespaces($namespaces);

        $loader->register();
    }

    /**
     * Initializes the notFound and after handlers
     *
     * @param $app
     */
    static protected function initDefaultHandlers(&$app)
    {
        $app->before(
            function() use ($app) {
                $req = $app->request;
                $confArray = !empty($app->config->application) ? $app->config->application->toArray() : [];
                $hasConfKey = isset($confArray['apiKey']);

                if ($hasConfKey && (!$req->hasHeader('X-API-Key') || ($req->getHeader('X-API-Key') !== $confArray['apiKey']))) {
                    $app->response->setJsonContent([
                        'status'  => 'ERROR',
                        'message' => 'Unauthorized',
                        'code'    => 401,
                    ])->setStatusCode(401)->send();
                    exit(401);
                }

                return true;
            }
        );

        $app->after(
            function() use ($app) {
                $return_value = $app->getReturnedValue();
                $app->response->setJsonContent([
                    'status' => 'OK',
                    'data'   => $return_value,
                ],
                )->setHeader('Access-Control-Allow-Origin', "*")
                              ->send();
            }
        );

        $app->notFound(
            function() use ($app) {
                $app->response->setStatusCode(404, "Not Found")
                              ->sendHeaders()
                              ->setJsonContent(['status' => 'ERROR', 'message' => 'Invalid route'])
                              ->send();
            }
        );

        $app->error(function($ex) use ($app) {
            $app->response
                ->setJsonContent([
                    'code' => 500,
                    'status' => 'ERROR',
                    'message' => $ex->getMessage(),
                    'data' => []])
                ->setStatusCode(500)
                ->send();
            die;
        });
    }

    /**
     * Includes the config/router.php to define routes for the application.
     *
     * @param $app
     */
    static private function initRoutes(&$app)
    {
        if (!file_exists(APP_PATH . '/config/router.php')) {
            throw new \Phalcon\Exception("Router definition not found!", 500);
        }
        require APP_PATH . '/config/router.php';
    }

    /**
     * Creates a CLI application
     *
     * @param string $appPath The APP_PATH constant with app base directory (with /config, /models, /tasks, ect.
     *                        directories)
     * @param array  $argv    The command line parameters passed from the PHP script as is ($argv system variable)
     *
     * @return array
     */
    static public function createCLI($appPath, &$argv)
    {
        $di = new CliDi();
        self::initServices($di);
        self::initLoader($di, true);
        $console = new ConsoleApp($di);
        $arguments = [];

        foreach ($argv as $k => $arg) {
            if ($k == 1) {
                $arguments['task'] = $arg;
            } elseif ($k == 2) {
                $arguments['action'] = $arg;
            } elseif ($k >= 3) {
                $arguments['params'][] = $arg;
            }
        }
        return [
            'app'  => $console,
            'args' => $arguments,
        ];
    }
}

```

## Behavior usage

When you are using Behaviors override the ```initialize()``` method of the models and call ```parent::initialize()``` as a **last statement** of the overrided method. Otherwise the behavior will not be applied.
