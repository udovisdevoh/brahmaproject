<ul class="Menu">
	<li>
		<a href="chat.php">Chat with Brahma</a>
	</li>
	<li>
		<a href="bot.php">Chat with a bot</a>
	</li>
	<li>
		<a href="create.php">Create your bot</a>
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
	<li>
		<a href="howto.php">How to</a>
	</li>
</ul>