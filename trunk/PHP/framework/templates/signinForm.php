<?php if ($userProfile): ?>
	<div class="Welcome">
		Welcome <b><?php echo $userProfile['name']; ?></b>
		<a href="account.php"><img src="./images/myaccount.png" alt="My account" />My account</a>
		<a href="signout.php"><img src="./images/signout.png" alt="Sign out" />Sign out</a>
	</div>
<?php else: ?>
	<form class="SigninForm" method="post" action="./">
		<fieldset>
			<div>
				<label for="user">User</label>
				<input type="text" id="user" name="user" value="<?php echo isset($_POST['user']) ? strip_tags($_POST['user']) : '' ?>" />
			</div>
			<div>
				<label for="password">Password</label>
				<input type="password" id="password" name="password" />
			</div>
		</fieldset>
		<p>
			<input type="submit" name="signIn" value="Sign in" />
			<a class="CreateAccount" href="createaccount.php">Create account</a>
		</p>
		
		<?php if (isset($_POST['user']) || isset($_POST['password'])): ?>
			<p class="Error">Wrong username or password</p>
		<?php endif ?>
	</form>
<?php endif ?>