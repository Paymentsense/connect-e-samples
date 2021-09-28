<?php

// Taken from here:
// https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/master/.php_cs.dist

$finder = PhpCsFixer\Finder::create()
    ->exclude(['storage', 'vendor'])
    ->in(__DIR__);

$config = new PhpCsFixer\Config();
$config->setRiskyAllowed(true)
    ->setRules([
        '@PHP56Migration' => true,
        '@Symfony' => true,
        '@Symfony:risky' => true,
        '@PSR2' => true,
        'array_syntax' => ['syntax' => 'short'],
        'binary_operator_spaces' => false,
        'cast_spaces' => false,
        'concat_space' => ['spacing' => 'one'],
        'combine_consecutive_unsets' => true,
        'echo_tag_syntax' => false,
        'general_phpdoc_annotation_remove' => false,
        'heredoc_to_nowdoc' => true,
        'increment_style' => false,
        'native_constant_invocation' => false,
        'native_function_invocation' => false,
        'no_extra_blank_lines' => false,
        'no_superfluous_phpdoc_tags' => false,
        'no_unreachable_default_argument_value' => true,
        'no_useless_else' => true,
        'no_useless_return' => true,
        'ordered_class_elements' => true,
        'ordered_imports' => true,
        'php_unit_fqcn_annotation' => false,
        'php_unit_strict' => false,
        'phpdoc_add_missing_param_annotation' => true,
        'phpdoc_align' => false,
        'phpdoc_separation' => false,
        'phpdoc_summary' => false,
        'semicolon_after_instruction' => true,
        'strict_comparison' => true,
        'strict_param' => true,
        'trailing_comma_in_multiline' => false,
        'yoda_style' => false
    ])
    ->setFinder($finder);

return $config;
