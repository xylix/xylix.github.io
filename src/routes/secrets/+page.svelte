<svelte:head>
	<title>Secrets</title>
	<meta name="description" content="Public GPG key for confidential communication" />
</svelte:head>

<section>
	<h1>Secrets</h1>
	<p>
		For confidential communication, email me at <strong>xylix at iki.fi</strong> and encrypt your
		message to my public GPG key below.
	</p>

	<p>
		Fingerprint:
		<code class="inline"><!-- GPG_FINGERPRINT_PLACEHOLDER -->(fingerprint not yet added)</code>
	</p>

	<p>You can import the key directly:</p>
	<pre><code>curl https://xylix.fi/xylix-iki-fi.asc | gpg --import</code></pre>

	<p>Or copy the armored key:</p>

	<pre><code><!-- GPG_PUBLIC_KEY_PLACEHOLDER -->-----BEGIN PGP PUBLIC KEY BLOCK-----

(public key not yet added — paste the output of `gpg --armor --export xylix@iki.fi` here)

-----END PGP PUBLIC KEY BLOCK-----</code></pre>
</section>

<style>
	pre {
		max-width: 100%;
		overflow-x: auto;
		background: var(--color-bg-highlight);
		border: 1px solid var(--color-rule);
		border-radius: 4px;
		padding: 0.75rem 1rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.4;
		align-self: stretch;
	}

	code {
		font-family: var(--font-mono);
		white-space: pre-wrap;
		word-break: break-all;
	}

	code.inline {
		font-size: 0.8rem;
		word-break: break-all;
	}
</style>
