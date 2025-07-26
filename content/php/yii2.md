# Yii2 snippets

## Working datepicker for Yii2 with Kartik's DatePicker

Model variables required:

```php
    ddrStart    : attribute => safe
    ddrEnd      : attribute => safe
```

```php
/** @var string Custom layout for the DatePickers */
$rangepickerLayout =' 
        <span class="input-group-addon"></span>
        {input1}
        <span class="input-group-addon"></span>
        {separator}
        <span class="input-group-addon"></span>
        {input2}
        <span class="input-group-addon kv-date-remove">
                <i class="glyphicon glyphicon-remove"></i>
        </span>';

?>

[ 'class' => '\yii\grid\DataColumn',
            'attribute' => 'duedate',
            'label' => 'Due date',
            'value' => 'duedate',
            'headerOptions' => [ 'class' => 'col-md-2' ],
            'filter' => \kartik\widgets\DatePicker::widget(
                [   
    
                    'id' => 'filterDuedate',
                    'model' => $searchModel,
                    'attribute' => 'ddrStart',
                    'value' => "1970-01-01",
                    'attribute2' => 'ddrEnd',
                    'value2' => "5000-12-31",
                    'size' => 'sm',
                    'separator' => '',
                    'type' => \kartik\widgets\DatePicker::TYPE_RANGE,
                    'convertFormat' => 'true',
                    'layout' => $rangepickerLayout,
                    'pluginOptions' => [
                        'autoclose' => true,                        
                    ],
                    'options' => ['class'=>'drp-container form-group'],
                ]
            ),
        ],
```

## Pre-check and warnings for Yii appliactions in web/index.php

```php
/**
 * Generate a simple message page with predefined colors (info, warning, error)
 *
 * @param string $type info|warning|err different background colors
 * @param string $message The message to display
 * @return string Full HTML page definition
 */
function generateFlashPage($type='info', $message='Please wait...')
{
    $style='<style>'
            .'.err {background-color: lightCoral;}'
            .'.info {background-color: yellowGreen;}'
            .'.warning {background-color: gold;}'
            .'.msg {margin: 20px; text-align: center;}'
            .'h1 {padding:12px; margin: 40px;}'
            .'</style>';
    $htmlpre='<html><head><title>HiSATv2 message</title>'.$style.'</head><body>';
    $htmlsuf='</body></html>';
    $msgtype='info';
    $msgpre='<div class="msg"><h1 class="'.$type.'">';
    $msgsuf='</h1></div>';
    return $htmlpre.$msgpre.$message.$msgsuf.$htmlsuf;
}

$message = null;
try {
    $app = new yii\web\Application($config);
} catch (\yii\db\Exception $ex) {
    $message = MAINT_MSG_DB.'<br/>Additonal info: '.$ex->getMessage();
}
try {
    $app->db->open();
} catch (\yii\db\Exception $ex) {
    $message = $ex->getMessage();
}
if (!$app->db->getIsActive()) {
    $message = MAINT_MSG_DB.'<br/>Connection is not active.';
} else {
    $serverip = $_SERVER['SERVER_ADDR'] ?? null;
    if ($serverip) {
        $rparams = null;
        $query = new yii\db\Query;
        try {
            $rparams = $query->select('ip, mtc_mode')->from('runtime_parameter')
                    ->where(['ip' => $serverip])
                    ->createCommand($app->db)
                    ->queryOne(PDO::FETCH_ASSOC);
        } catch (yii\db\Exception $ex) {
            $message = 'Database exception: '.$ex->getMessage();
        }
        if ($rparams && $rparams['mtc_mode']) {
            if (strtoupper($rparams['mtc_mode']) === 'ON') {
                $message = MAINT_MSG_MM;
            }
        } else {
            $message = MAINT_MSG_ERR;
        }
    } else {
        $message = MAINT_MSG_ERR;
    }
}
unset($app);
if ($message) {
    echo generateFlashPage($message==MAINT_MSG_MM ? 'info':'err', $message);
    exit();
}
```

## Browser language detection

```php
// TBC
```

## AccessRule for custom access control

```php
<?php

namespace frontend\components;

use frontend\models\User;
class AccessRule extends \yii\filters\AccessRule {

    /**
     * @inheritdoc
     */
    protected function matchRole($user)
    {
        if (empty($this->roles)) {
            return true;
        }
        foreach ($this->roles as $role) {
            if ($role == '?') {
                if ($user->getIsGuest()) {
                    return true;
                }
            } elseif ($role == \frontend\controllers\UserController::ROLE_USER) {
                if (!$user->getIsGuest()) {
                    return true;
                }
            // Check if the user is logged in, and the roles match
            } elseif (!$user->getIsGuest() && $role == $user->identity->status) {
                return true;
            }
        }
     
        return false;
    }
}
```

## Using HTTPS inside an HTTP based Yii2 application

* Setup your proxy configuration (if needed) by exporting HTTP_PROXY and HTTPS_PROXY variables

* Self-update your composer

```bash
  composer -vv --ansi selfupdate
  ```

* Install the yii2tech/https Yii2 extension

```bash
  composer -v --ansi require --prefer-dist "yii2tech/https"
  ```

## AccessControl denyCallback snippet

```php
        // Check for VI tool access is authorized
        if ( Yii::$app->user->isGuest || Yii::$app->user->identity->is('admin')) {
            Yii::$app->session->setFlash('danger', 'You are not allowed to do this!');
            return $this->renderContent('<a class="btn btn-primary" href="javascript:history.back()">Back</a>');
        }
```

The flash display code in layouts/main.php

```php
                <?php if (Yii::$app->session->hasFlash('danger')) { ?>
                    <div class="alert alert-danger alert-dismissable">
                        <!-- <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button> -->
                        <?= Yii::$app->session->getFlash('danger') ?>
                    </div>
                <?php } ?>
                <?php if (Yii::$app->session->hasFlash('success')) { ?>
                    <div class="alert alert-success alert-dismissable">
                        <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
                        <?= Yii::$app->session->getFlash('success') ?>
                    </div>
                <?php } ?>
                <?php if (Yii::$app->session->hasFlash('warning')) { ?>
                    <div class="alert alert-warning alert-dismissable">
                        <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
                        <?= Yii::$app->session->getFlash('warning') ?>
                    </div>
                <?php } ?>
```

## AccessControl **access** behavior

Use the AccessControl in the controller:

```php
use \yii\filters\AccessControl;
```

Add a similar snippet to the controller's behaviors() function:

```php
            'access' => [
                'class' => \yii\filters\AccessControl::className(),
                'only' => ['create', 'update', 'delete'],
                'rules' => [
                    [
                        'allow' => true,
                        'actions' => ['create', 'update'],
                        'matchCallback' => function ($rule, $action) {
                            return Yii::$app->user->identity->allowed(null, ['security']);
                        }
                    ],
                    [
                        'allow' => true,
                        'actions' => ['delete'],
                        'matchCallback' => function ($rule, $action) {
                            return Yii::$app->user->identity->allowed(null, ['admin']);
                        }
                    ],
                ],
                'denyCallback' => function ($rule, $action) {
                    Access::showNAPage();
                },
            ],
```

## Raoul's Workflow handler (get the available statuses)

```php
$post = Post::find(['id'=>42]);

if( $post->hasWorkflowStatus()) {

    // let's ask the Status object then
    $transitions = $post
        ->getWorkflowStatus()
        ->getTransitions();

    foreach( $transitions as $transition ) {
        echo $transition->getEndStatus()->getId();
    }
}
```

## User role management

cm, vm: no update
oss : oss, plsc, cm
exportc: exportc
plsc: cm, plsc
sib: sib, vm

name, email: only for admin

## CheckboxList with separators

```php
$form->field($model, 'roles_set')->radioList($checks, [
    'class'=>'checkboxlist', 
    // Custom radiobutton tag generator function
    'item' => function ($index, $label, $name, $checked, $value) {
        // Radiobutton labels after we need a separator
        $users_wsep = ['Normal User', 'Vulnerability Manager', 'Sen in Black'];
        // Generate the standard radiobutton
        $res = "<label><input type='radio' name='User[roles_set]' value=$value> $label</label>";
        // Add the separator where needed
        if ( in_array($label, $users_wsep)) {
            $res .= '<hr>';
        }
        return $res;
    }
    ]);
```

## GridView without pagination

**for the action()**:

```php
    public function actionX($id, $onepage = null) {
        ...
        // setup dataProvider
        ...
        // turn off pagination
        if (!is_null($onepage) && $onepage == '1') {
            $dataProvider->setPagination(false);
        }
```

**for the view**:

```php
    /*** define the layout ***/
    $gridLayout = "<span>" . Html::a('Show all', ['view', 'id' => $model->id, 'onepage' => '1']) . "</span>{summary}{items}{pager}";
    echo \yii\grid\GridView::widget([
        'dataProvider' => $dataProvider,
        ...
        /*** Use the layout in the widget ***/
        'layout' => $gridLayout,***
```

## GridView: ActionColumn - using another controller

```php
                    [
                        'class' => 'yii\grid\ActionColumn',
                        'template' => '{view} {update}',
                        'controller' => 'security-assessment',  // Use another controller
                        'visibleButtons' => [
                            'update' => function ($model, $key, $index) {   // Visible if the user is SEC-CTM and the associated SA is not closed yet
                                return $model->security_assessment_status_id != 2 && isset(Yii::$app->user) && isset(Yii::$app->user->identity) && (Yii::$app->user->identity->is('security'));
                            },
                        ],
                    ],
```

## Working CheckboxColumn

**In the view**:

The CheckboxColumn only usable with POST requests so you need a form. The form begins after Pjax

```php
    <?php
    Pjax::begin(['id' => 'vulnerability-tickets-grid']);
    ActiveForm::begin(
            [
                'action' => ['vulnerability-ticket/commit-product-version', 'pvid' => $model->product_version_id],
            ]
    );
```

In the GridView:

```php
    if ($model->hasDraftVulnerabilityTickets && $user->is('security')) {
        $gridColumns[] = ['class' => '\yii\grid\CheckboxColumn',
            'checkboxOptions' => function ($model, $key, $index, $column) {
                  // do not display the checkbox when not usable
                $disp = (!($model->vt_status == 'vt/Draft' || $model->to_be_deleted)) ? 'none;' : 'block;';
                // setup checkbox options 
                $res = [
                    'style' => 'display:' . $disp,
                    'checked' => true,
                      // Disable when you do not want to POST with the form
                    'disabled' => (!($model->vt_status == 'vt/Draft' || $model->to_be_deleted)),
                ];
                return $res;
            },
            // Header cb is checked
            'header' => '<input type="checkbox" class="select-on-check-all" name="selection_all" value="1" checked>',
        ];
    }
```

**In the controller**:

Store the selection in a session variable:

```php
    public function actionCommitProductVersion($pvid) {
        if (!Yii::$app->session->has('selectedtickets')) {
            Yii::$app->session->set('selectedtickets', Yii::$app->request->post('selection'));
        }
```

Modify the query if has selections:

```php
        if (Yii::$app->session->has('selectedtickets')) {
            $st = Yii::$app->session->get('selectedtickets');
            $vtsDraft->andWhere(['IN', 'vulnerability_ticket_id', $st]);
            $vtsDel->andWhere(['IN', 'vulnerability_ticket_id', $st]);
        }
// use the query as needed and after commiting the transaction
```

Delete the session variable:

```php
                Yii::$app->session->remove('selectedtickets');
```

## Properly call a Controller's action

```php
# Use the runAction()
Yii::$app->runAction('action', ['param1' => param1value]);
# or
$this->redirect();
```

## CKEditor advanced

In the _form.php:

```php
    <?=
    $form->field($model, 'description')->widget(dosamigos\ckeditor\CKEditor::className(), [
        'preset' => 'standard',
        'clientOptions' => ['height' => 400],
    ])
    ?>
```

## Tooltips for ActiveField

```php
$form->field($model, 'property', ['labelOptions' => ['title' => 'tooltip text']]);
```

## Tooltip on a GridView's header

Use the 'headerOptions' attribute with a 'title'. See line 4 below!

```php
    [ 'columns' =>
            [
                'attribute' => 'componentCount',
                'headerOptions' => ['title' => 'Number of affected components'],
                'filterOptions' => ['title' => 'Use the < > <= and >= operators, like >0'],
            ],
     ]
```

## Generate PDF (tcPDF - deprecated)

```php
/**
     * Save as PDF
     * @param integer $id
     * @param string $format The export format. Currently 'pdf' and 'xml' is accepted
     */
    function actionExport($id, $format) {
        $model = $this->findModel($id);
        switch ($format) {
            case "pdf" : {
                    $p = new \TCPDF('P', 'mm', 'A4', true, 'UTF-8');
                    $this->setPDFParams($p, 'Security advisory', $model->name);
                    $p->AddPage();
                    $p->setTextShadow(array('enabled' => true, 'depth_w' => 0.2, 'depth_h' => 0.2, 'color' => array(196, 196, 196), 'opacity' => 1, 'blend_mode' => 'Normal'));
                    $content = $this->render('view', ['model' => $model], true);
                    $p->writeHTMLCell(0, 0, '', '', $content, 0, 1, 0, true, '', true);
                    $p->Output('security_advisory.pdf', 'I');
                    break;
                }
            default : {
                    Yii::$app->session->setFlash('danger', 'Invalid document format requested! Use "pdf" or "xml" as a format string!');
                    return $this->redirect(['view',
                                'id' => $id,
                    ]);
                    break;
                }
        }
        Yii::$app->session->setFlash('warning', 'Not fully implemented yet');
        return $this->redirect(['view',
                    'id' => $id,
        ]);
    }

    function setPDFParams($pdf, $title = '', $subject = '') {
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor('HiSAT v2');
        $pdf->SetTitle('Security advisory');
        $pdf->SetSubject('for ' . $subject);
        $pdf->SetKeywords('advisory, PDF, hisat');

        $pdf->SetHeaderData('/../../../../../web/img/unify_header.png', 60, $pdf->GetHeaderData()['title'], $title . ' for ' . $subject, array(0, 64, 255), array(0, 64, 128));
        $pdf->setFooterData(array(0, 64, 0), array(0, 64, 128));

        $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
        $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

        $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

        $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
        $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
        $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

        $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

        $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
        $pdf->setFontSubsetting(true);

        $pdf->SetFont('dejavusans', '', 14, '', true);
    }
```

## ActiveQuery: overwrite the LIKE %smth% behavior of the Yii framework

```php
$query->andWhere("CONCAT(product_line.major,'.',product_line.minor,'.',product_version.fix,'.',product_version.hotfix) like " . "'" . $this->Version . "%'");
```

## From a SELECT to an ActiveRecord

This is the SELECT on the database what you are able to convert to an ActiveRecord query

```sql
SELECT 
    `product_component`.*
FROM
    `product_component`
        LEFT JOIN
    `product_version` ON `product_component`.`product_version_id` = `product_version`.`product_version_id`
        LEFT JOIN
    `component_version` ON `product_component`.`component_version_id` = `component_version`.`component_version_id`
WHERE
    (`psi_status` IN ('psi/Open' , 'psi/Complete'))
        AND (`component_version`.`component_line_id` = $ID);
```

in this way:

```php
// Search for all product_components
            $pcs = \app\models\ProductComponent::find()
                    ->join('LEFT JOIN', 'product_version', 'product_component.product_version_id = product_version.product_version_id')
                    ->join('LEFT JOIN', 'component_version', 'product_component.component_version_id = component_version.component_version_id')
                    ->where(['psi_status' => ['psi/Open', 'psi/Complete']])
                    ->andWhere(['component_version.component_line_id' => $id])
                    ->all();
```
