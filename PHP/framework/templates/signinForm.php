<form class="SigninForm" method="post" action="./">
	<fieldset>
		<div>
			<label for="user">User</label>
			<input type="text" name="user" value="<?php echo isset($_POST['user']) ? strip_tags($_POST['user']) : '' ?>" />
		</div>
		<div>
			<label for="password">Password</label>
			<input type="password" name="password" />
		</div>
	</fieldset>
	<input type="submit" name="submit" value="Sign in" />
</form>