<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">Home</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item {{ app('request')->get('path') ==  '/sale' ? 'active' : ''  }}">
                <a class="nav-link" href="/sale">Sale</a>
            </li>
            <li class="nav-item {{ app('request')->get('path') ==  '/refund' ? 'active' : ''  }}">
                <a class="nav-link" href="/refund">Refund</a>
            </li>
            <li class="nav-item {{ app('request')->get('path') ==  '/subscription' ? 'active' : ''  }}">
                <a class="nav-link" href="/subscription">Subscription</a>
            </li>
            <li class="nav-item {{ app('request')->get('path') ==  '/pre-auth' ? 'active' : ''  }}">
                <a class="nav-link" href="/pre-auth">PreAuth</a>
            </li>
            <li class="nav-item {{ app('request')->get('path') ==  '/wallet' ? 'active' : ''  }}">
                <a class="nav-link" href="/wallet">Wallet</a>
            </li>
        </ul>
    </div>
</nav>