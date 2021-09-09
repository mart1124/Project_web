
export const Nevbar = props => {
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/"><h2 class="text-warning">HelmetDetection</h2></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/" aria-label="Toggle">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mob-navbar">
                    <ul class="navbar-nav nav-tab mb-2 mb-lg-0 mx-2" role="presentation">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" aria-current="page" href="/admin/register">Add Users</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-toggle="tab" aria-current="page" href="/api/filter">Search Data</a>
                        </li>
                    </ul>
                    
                </div>
                <div class="d-flex text-light me-4"><a class="d-flex text-light me-4" href="/admin/login">Login</a></div>
            </div>
        </nav>
        )
};