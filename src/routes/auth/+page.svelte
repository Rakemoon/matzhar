<script lang="ts">
    import AuthBanner from "$components/AuthBanner.svelte";
    import Logo from "$components/Logo.svelte";
    import IconEmail from "~icons/ion/mail";
    import IconPerson from "~icons/ion/person";
    import IconEye from "~icons/ion/eye";
    import IconEyeOff from "~icons/ion/eye-off";
    import { pushToast } from "$lib/states/toast";
    import { loginInfo } from "$lib/states/index.svelte";
    import { goto } from "$app/navigation";

    let isLogin = $state.raw(true);

    let email = $state.raw("");
    let name = $state.raw("");
    let password = $state.raw("");
    let displayPassword = $state(false);
    let isBeingSubmitted = $state(false);

    let nameComplain = $derived(name.length > 0 ? validateName() : "");
    let emailComplain = $derived(email.length > 0 ? validateEmail() : "");
    let passwordComplain = $derived(
        password.length > 0 ? validatePassword() : "",
    );

    function validateEmail() {
        if (email.includes(" ")) return "Email must not contain spaces";
        if (!email.includes("@")) return "Email must contain @";
        if (!email.match(/\.[a-zA-Z]+$/))
            return "Email must contain valid domain";
        return "";
    }

    function validatePassword() {
        if (password.includes(" ")) return "Password must not contain spaces";
        if (!password.match(/[a-z]/)) return "Password must contain lowercases";
        if (!password.match(/[A-Z]/)) return "Password must contain uppercases";
        if (!password.match(/[0-9]/)) return "Password must contain numbers";
        if (!password.match(/[^a-zA-Z0-9]/))
            return "Password must contain special characters";
        if (password.length < 8)
            return "Password must be at least 8 characters";
        return "";
    }

    function validateName() {
        if (name.length < 3) return "Name must be at least 3 characters";
        return "";
    }

    async function onsubmit() {
        isBeingSubmitted = true;
        if (isLogin) {
            pushToast("Login....", "info");
            const { success, message, result } = await fetch("/api/users", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            }).then((x) => x.json());
            if (success) {
                email = "";
                password = "";
                pushToast("Login success!", "success");
                loginInfo.isLoggedIn = true;
                loginInfo.user.name = result;
            } else pushToast(message, "error");
        } else {
            pushToast("Register...", "info");
            const { success, message } = await fetch("/api/users", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
            }).then((x) => x.json());
            if (success) {
                loginInfo.user.name = name;
                email = "";
                name = "";
                password = "";
                pushToast("Register success!", "success");
                loginInfo.isLoggedIn = true;
            } else pushToast(message, "error");
        }

        isBeingSubmitted = false;
    }

    $effect(() => {
        if (loginInfo.isLoggedIn) setTimeout(() => goto("/"), 0);
    });
</script>

<div class="h-screen w-full py-10 max-sm:py-2.5">
    <div
        class="w-full h-full rounded-box shadow-md flex overflow-hidden max-md:flex-col-reverse"
    >
        <div class="w-max min-w-96 p-5 bg-base-200 max-md:min-w-full">
            <form class="flex flex-col gap-2 justify-center h-full" {onsubmit}>
                {#if isLogin}
                    <h1 class="text-3xl text-center">Welcome Back!</h1>
                    <div class="divider"></div>
                {:else}
                    <h1 class="text-3xl text-center">Create an Account!</h1>
                    <div class="divider"></div>
                    <label
                        class="input input-bordered inline-flex gap-2.5 items-center"
                        class:input-error={!!nameComplain.length}
                        class:input-success={!nameComplain.length &&
                            !!name.length}
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            class="grow"
                            bind:value={name}
                        />
                        <IconPerson class="text-xl" />
                    </label>
                    <div class="collapse">
                        <input
                            type="checkbox"
                            checked={!!nameComplain.length}
                            hidden
                        />
                        <div
                            class="collapse-content p-[0_!important] text-error"
                        >
                            {nameComplain}
                        </div>
                    </div>
                {/if}
                <label
                    class="input input-bordered inline-flex gap-2.5 items-center"
                    class:input-error={!!emailComplain.length}
                    class:input-success={!emailComplain.length &&
                        !!email.length}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        class="grow"
                        bind:value={email}
                    />
                    <IconEmail class="text-xl" />
                </label>
                <div class="collapse">
                    <input
                        type="checkbox"
                        checked={!!emailComplain.length}
                        hidden
                    />
                    <div class="collapse-content p-[0_!important] text-error">
                        {emailComplain}
                    </div>
                </div>
                <label
                    class="input input-bordered inline-flex gap-2.5 items-center"
                    class:input-error={!!passwordComplain.length}
                    class:input-success={!passwordComplain.length &&
                        !!password.length}
                >
                    <input
                        type={displayPassword ? "text" : "password"}
                        placeholder="Password"
                        class="grow"
                        bind:value={password}
                    />
                    <label class="swap swap-rotate">
                        <input type="checkbox" bind:checked={displayPassword} />
                        <div class="swap-on">
                            <IconEyeOff class="text-xl" />
                        </div>
                        <div class="swap-off">
                            <IconEye class="text-xl" />
                        </div>
                    </label>
                </label>
                <div class="collapse">
                    <input
                        type="checkbox"
                        checked={!!passwordComplain.length}
                        hidden
                    />
                    <div class="collapse-content p-[0_!important] text-error">
                        {passwordComplain}
                    </div>
                </div>
                {#if isLogin}
                    <button
                        class="btn btn-accent block"
                        disabled={!!passwordComplain.length ||
                            !password.length ||
                            !!emailComplain.length ||
                            !email.length ||
                            isBeingSubmitted}>Log In</button
                    >
                    <div class="divider"></div>
                    <p class="text-center justify-self-end">
                        Don't have an account ? <button
                            onclick={() => (isLogin = false)}
                            class="btn btn-link p-0"
                            disabled={isBeingSubmitted}>Register</button
                        >
                    </p>
                {:else}
                    <button
                        class="btn btn-primary block"
                        disabled={!!passwordComplain.length ||
                            !password.length ||
                            !!emailComplain.length ||
                            !email.length ||
                            !!nameComplain.length ||
                            !name.length ||
                            isBeingSubmitted}>Register</button
                    >
                    <div class="divider"></div>
                    <p class="text-center justify-self-end">
                        Already have an account ? <button
                            onclick={() => (isLogin = true)}
                            class="btn btn-link p-0"
                            disabled={isBeingSubmitted}>Login</button
                        >
                    </p>
                {/if}
            </form>
        </div>
        <div class="flex-grow bg-base-300 relative">
            <AuthBanner />
            <div
                class="w-fit h-fit m-auto banner absolute inset-0 flex flex-col gap-2.5 items-center drop-shadow-md group"
            >
                <kbd class="text-6xl text-base-100 select-none">مَتْجَر</kbd>
                <Logo />
                <div
                    class="group-hover:w-1/2 h-0.5 bg-base-100 w-1/3 transition-all"
                ></div>
            </div>
        </div>
    </div>
</div>
