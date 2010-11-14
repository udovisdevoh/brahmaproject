<ul class="Menu">
	<li>
		<a href="chatwithbrahma.php">Chat with Brahma</a>
	</li>
	<li>
		<a href="viewavatars.php">Chat with a bot</a>
	</li>
	<li>
		<a href="viewavatars.php">Create your bot</a>
	</li>
	<?php if (isset($isLogged) && $isLogged):?>
	<li>
		<a href="signout.php">Sign out</a>
	</li>
	<?php else: ?>
	<li>
		<a href="createaccount.php">Create account</a>
	</li>
	<li>
		<a href="signin.php">Sign in</a>
	</li>
	<?php endif ?>
</ul>