<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="{{ asset('images/Angola.png') }}" type="image/x-icon">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
    <title>KIANGOLA-EMPREGOS</title>
</head>
<body>
    <header>
        <div class="logo">
            <img src="{{ asset('images/Angola.png') }}" alt="Bandeira de Angola">
            KIANGOLA-EMPREGOS
        </div>
    </header>
    <main>
        <form action="{{ route('login.post') }}" method="POST">
            @csrf
            <h1>Login</h1>

            <div class="inputs">
            <input
                type="email"
                name="email"
                id="email"
                value="{{ old('email') }}"
                placeholder="E-mail"
                required
                class="{{ $errors->has('email') ? 'is-invalid' : '' }}"
            >

            <input
                type="password"
                name="password"
                id="password"
                placeholder="Senha"
                minlength="6"
                required
                class="{{ $errors->has('password') ? 'is-invalid' : '' }}"
            >

                {{-- Exibe erros de validação --}}
                @if ($errors->has('login'))
                    <label class="error login-error">{{ $errors->first('login') }}</label>
                @endif


                @error('email')
                    <label class="error">{{ $message }}</label>
                @enderror

                @error('password')
                    <label class="error">{{ $message }}</label>
                @enderror
                <button type="submit">Entrar</button>
            </div>

            <div class="senha">
                <a href="#">Esqueceu a senha?</a>
            </div>
        </form>
    </main>
</body>
</html>
