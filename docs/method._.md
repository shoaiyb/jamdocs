---
title:
date: 2024-05-14 07:05:00
slug: method._
---

# `App::_()` Method
Modify value.       
If there is no modification, the original value is returned.

<!--Source: [app/app.php](https://github.com/BoidCMS/BoidCMS/blob/master/app/app.php)-->
```php
/**
 * Filter or modify value
 * @param mixed $value
 * @param string $callback
 * @return mixed
 */
public function _( mixed $value, string $callback, mixed ...$args ): mixed
```

## Parameters

### `$value`
Value to modify.     

**Type**: `mixed ( required )`

### `$callback`
Unique callback for retrieving modification.       

**Type**: `string ( optional )`

### `$args`
Additional arguments.     

**Type**: `<mixed> array ( optional )`

## Related

#### [`App::get_filter()`](/developer/method/get_action)
