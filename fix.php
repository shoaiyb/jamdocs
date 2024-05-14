<?php

function apply_all( string $dir, ?string $root = null ): void {
  $paths = scandir( $dir );
  foreach ( $paths as $path ) {
    if ( '.' == $path || '..' == $path ) {
      continue;
    }

    $dir = $dir . '/' . $path;
    if ( is_dir( $dir ) ) {
      apply_all( $dir, $path );
    } else {

      $dir = $path;
      $iroot = $root ?? $dir;
      $date = date( 'Y-m-d H:m:s' );
      $slug = str_replace( $iroot . '/', '', $path );
      $slug = substr( $slug, 0, strlen( $slug ) - 3 );
      $slug = str_replace( '/', '.', $slug );
      $slug = strtolower( $slug );
      $yaml = file_get_contents( $path );
      $text = <<<EOL
      ---
      title:
      date: {$date}
      slug: {$slug}
      ---

      {$yaml}
      EOL;

      var_dump($root==$dir, $dir);
      $file = __DIR__ . '/docs/' . $slug . '.md';
      if ( ! is_file( $file ) ) {
        echo 'Writing... ' . $file . PHP_EOL;
        file_put_contents( $file, $text, LOCK_EX );
      }

    }
  }
}

apply_all( __DIR__ . '/mydocs' );

/*, function ( $path, $root ) {
  $root = $root . '/';
  $base = str_replace( $root, '', $path );
  $base = str_replace( '/', '.', $base );
  $base = strtolower( $base );
  $base = str_replace( '.md', '', $base );
  $file = $root . $base;

  $date = date( 'Y-m-d H:m:s' );
  $yaml = file_get_contents( $path );
  $text = <<<EOL
  ---
  date: {$date}
  slug: {$base}
  ---

  {$yaml}
  EOL;

  $file .= '.md';
  #echo file_put_contents( $file, $text );
  echo str_repeat(PHP_EOL, 10) . $text . str_repeat(PHP_EOL,10);
});*/
