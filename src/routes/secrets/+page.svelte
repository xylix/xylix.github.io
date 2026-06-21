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
		<code class="inline">4003 3182 1375 4143 6179&nbsp; A819 876A 0FEA EB51 640A</code>
	</p>

	<p>You can import the key directly:</p>
	<pre><code>curl https://xylix.fi/xylix-iki-fi.asc | gpg --import</code></pre>

	<p>Or copy the armored key:</p>

	<pre><code>-----BEGIN PGP PUBLIC KEY BLOCK-----

mQINBGoonXYBEADDWPesAmsJgK17ILtbJDjNrT75nNEytz2gb7/hQRfYiTYKSp7r
9e1rwc5QprlUIB5I+Asy5bm8UTGJMmq1rdjaMkkJhnjnORVu1KZtSD0tZtwDbJMi
DTnrf0YYhI2Inld0+yaKQ8EKX7jFWqsnX6LMq5x2ei/JTN8K14CeRNwSziUMehPY
qJHkTH0QeHPQTuv9FEQ2MlxIT+kkiX8sbv6zDlEBaQbqY89SzZMZAKQA2YxXWSTq
8+ePCGgK256kL6wSmk214oQ8LmU0OQKfyT+oW03lJpv2tjxX8eCGM9G1kmm/X1Xs
QZIumT8/peZeY1o5DsMlqSaxtrkAm0ZHxRtRSpApU3RuHpAdkMlkzgGjesYR3AKK
w3yGld99zmeCTuCpNUZDXdbo98smD+UhMihRnRficOhf4YVbUytRLDSq5PwwfIil
zlO8uzhTF2aUIoxiN17Rc17MBS1Laalp0PaXJzWVWdFEd/yDg5SczM0wz5spPOSX
yxSTODmdEdi8dsJ4ZEm8YGv1i6C5bgQStO5s/SROmrkmwp8TvfKcMHbVugLkwsrm
Y1zd9XMVzK40OsKVUnRidwOmR0ECm3fFSbQDckcTt0fG/O2a5PkA4HlJ8El6EgVX
7H6r581pC1Vh1Whs5iJKwtDpzcYgumyhcG/WSsS6GvYand0HcKeeZ8DG7QARAQAB
tBRYeWxpeCA8eHlsaXhAaWtpLmZpPokCcwQTAQgAXRYhBEADMYITdUFDYXmoGYdq
D+rrUWQKBQJqKJ12GxSAAAAAAAQADm1hbnUyLDIuNSsxLjEyLDAsMwIbAwUJBaOa
gAULCQgHAgIiAgYVCgkICwIEFgIDAQIeBwIXgAAKCRCHag/q61FkCmk3EACNgTpy
/BvNv33kjNtoIWLnhpDPeEPDOwmJrkesqZRlP0jFqjGYlW9Diz1czSmoSBa08oDW
pfh5OgYhCOwgrYWPtZsGKK16F2+PRwxv2x4dcoa50OM4rFbC0bk8Lydm3i1IosJ4
siDc5QfxVmc7mRmA5zjPOzPoKO5eSZlhdEun9OAmZ6R2631uYApO0p0UUKZVZRlO
YVkBOHHICnlQW9irLXHrEx14k5x59/nHnpWCw3t+fQcAFfrCkyk0PUj29CbY8XHU
jk7K+ZkqfJbdUF6plxO9QggXwQlzxJADZvBe16pXbndzUWjdRfNIk8Wt3dfPFww4
5R329GlV/80dBsZu9uVcBBLgFqO3e9rUyTljW7mu2tyM00FP5d16K9nDCvguN8M6
x7jzXr67AO4rVpJGhHut5CW+Q+QC2LSG9Sw5Ykgba8ho62n3Lxx7UqubCqXklwbD
n29NJCKtC9+I9sccVm+XT2q1ClRIssma7yGLi8iqxGj9ArOzlIiKAHs54aQ51rjF
rLEu9CemTS9lFLlpTEwds0IAyFb87wGZLrdoOJjWIdgwvq32n8G6esHFmHckM6R9
6FV/45oll9YJZ1iUqUzO3EvYKWKUwhWXS3cYbxKR53JOg/Q51/WOa8VkdatymOpx
RGTyEQKmyhEl1Bdym7uOuxdgWLRarQ/881LRjA==
=14Tj
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
