<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    @noPeraFileUploadCss
    <link rel="stylesheet" href="{{ asset('no-pera-file-upload.css') }}">
</head>

<body class="antialiased">
    <div class="p_flex">
        <input type="text" class="no-pera-file-upload" data-no-pera-file-upload="multiple">
        <input type="text" class="no-pera-file-upload" data-no-pera-file-upload="single">

    </div>
    @noPeraFileUploadJs
    <script src="{{ asset('no-pera-file-upload.js') }}"></script>

</body>

</html>
