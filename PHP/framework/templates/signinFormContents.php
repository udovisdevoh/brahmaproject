<?php if ($userProfile): ?>
	<p>Welcome <b><?php echo $userProfile['name']; ?></b></p>
	<p><a href="account.php"><img src="./images/myaccount.png" alt="My account" />My account</a></p>
	<p><span class="Link" onClick="signOutAjax(<?php echo $userProfile['id'] ?>, 'signinForm')"><img src="./images/signout.png" alt="Sign out" />Sign out</span></p>
<?php elseif (!isset($isCreateUserProfile)): ?>
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
		<input type="submit" name="signIn" value="Sign in" onclick="signInAjax(document.getElementById('user').value + '', document.getElementById('password').value + '', 'signinForm');return false;" />
		<a class="CreateAccount" href="createaccount.php">Create account</a>
	</p>
	
	<?php if (isset($_POST['user']) || isset($_POST['password'])): ?>
		<p class="Error">Wrong username or password</p>
	<?php endif ?>
<?php endif ?>
