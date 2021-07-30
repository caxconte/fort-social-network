import { signInEmailPassword, signInGoogle, keepLogged } from "../../services/index.js"; 
// import { navigation, routeRender } from "../../routes.js";

export const Login = () => {
  const rootElement = document.createElement("div");
  const container = `
    <div>
      <img id="background" src="./pages/login/img/paleta3.jpg" alt="">
      <div class="esmaeceHeader logotipo-text">
        <section>
          <h2>FORT</h2>
        </section>
      </div>
      <h4>Nova por aqui? <span><a href="/signup" id="signup">Cadastre-se</a></span></h4>
      <div class="inputAndReset">
        <input type="text" id="email" class="input" placeholder="Email">
        <input type="password" id="password" class="input" placeholder="Senha">
        <a class="reset-password" id="reset" href="/reset">Esqueceu a senha?</a><br>
      </div>
      <div class="google">
        <button id="btn-login" class="login btn">LOGIN</button>
        <img id="icon-google" src="./pages/login/img/icon-google-white.png">
      </div>
      <form>
        <input type="checkbox" class="checkbox" name="remember"><label for="remember">Lembrar meus dados</label>
      </form>
      
    </div> 
  `;
  
  rootElement.innerHTML = container;

  const btnLogin = rootElement.querySelector("#btn-login");
  const btnGoogle = rootElement.querySelector("#icon-google");
  const email = rootElement.querySelector('#email');
  const password = rootElement.querySelector('#password');
  const checkbox = rootElement.querySelector('.checkbox');
  const signUpBtn = rootElement.querySelector('#signup');

  signUpBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.history.pushState({}, null, '/signup')
  
    const popStateEvent = new PopStateEvent("popstate", {state:{}})
    dispatchEvent(popStateEvent)
  });

  const loginWithEmail = btnLogin.addEventListener("click", () => {
    signInEmailPassword(email.value, password.value);
    window.history.pushState({}, null, '/feed')
  });

  const loginWithGoogle = btnGoogle.addEventListener("click", () => {
    signInGoogle();
  });

  checkbox.addEventListener("change", () => {
    const none = firebase.auth.Auth.Persistence.NONE
    const local = firebase.auth.Auth.Persistence.LOCAL

      if (checkbox.checked === true && loginWithGoogle) {
        keepLogged(local)
      } else if (checkbox.checked === true && loginWithEmail) {
        keepLogged(local)
      }
      keepLogged(none)
  });

  const resetLink = rootElement.querySelector('#reset');
  resetLink.addEventListener("click", (event) => {
    event.preventDefault();

    window.history.pushState({}, null, '/reset')
    const popStateEvent = new PopStateEvent("popstate", {state:{}})
    dispatchEvent(popStateEvent)
  })

  return rootElement;  
};
