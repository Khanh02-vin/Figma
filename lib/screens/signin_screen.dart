import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/form_input.dart';
import '../widgets/social_button.dart';
import '../widgets/primary_button.dart';
import '../widgets/loading_modal.dart';

class SignInScreen extends StatefulWidget {
  final VoidCallback onBack;
  final VoidCallback onSignIn;
  final VoidCallback onForgotPassword;
  final VoidCallback onSocialLogin;

  const SignInScreen({
    super.key,
    required this.onBack,
    required this.onSignIn,
    required this.onForgotPassword,
    required this.onSocialLogin,
  });

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  String _email = '';
  String _password = '';
  bool _rememberMe = false;
  bool _isLoading = false;

  void _handleSubmit() {
    if (_email.isEmpty || _password.isEmpty) return;
    setState(() => _isLoading = true);
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() => _isLoading = false);
        widget.onSignIn();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Scaffold(
          backgroundColor: AppColors.background,
          body: SafeArea(
            child: Column(
              children: [
                // Header
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      IconButton(
                        onPressed: widget.onBack,
                        icon: const Icon(Icons.arrow_back, size: 28),
                      ),
                    ],
                  ),
                ),
                // Content
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Welcome Back! 👋',
                          style: TextStyle(
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                            color: AppColors.foreground,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Your Smart Home, Your Rules.',
                          style: TextStyle(fontSize: 14, color: AppColors.mutedForeground),
                        ),
                        const SizedBox(height: 32),
                        FormInput(
                          label: 'Email',
                          hint: 'Email',
                          value: _email,
                          onChanged: (v) => setState(() => _email = v),
                          icon: Icons.email_outlined,
                          keyboardType: TextInputType.emailAddress,
                        ),
                        const SizedBox(height: 20),
                        FormInput(
                          label: 'Password',
                          hint: 'Password',
                          value: _password,
                          onChanged: (v) => setState(() => _password = v),
                          icon: Icons.lock_outlined,
                          isPassword: true,
                        ),
                        const SizedBox(height: 16),
                        // Remember me & Forgot
                        Row(
                          children: [
                            GestureDetector(
                              onTap: () => setState(() => _rememberMe = !_rememberMe),
                              child: Row(
                                children: [
                                  Container(
                                    width: 22,
                                    height: 22,
                                    decoration: BoxDecoration(
                                      color: _rememberMe ? AppColors.primary : Colors.transparent,
                                      border: Border.all(color: AppColors.primary, width: 2),
                                      borderRadius: BorderRadius.circular(6),
                                    ),
                                    child: _rememberMe
                                        ? const Icon(Icons.check, size: 14, color: Colors.white)
                                        : null,
                                  ),
                                  const SizedBox(width: 8),
                                  const Text('Remember me', style: TextStyle(fontSize: 13)),
                                ],
                              ),
                            ),
                            const Spacer(),
                            GestureDetector(
                              onTap: widget.onForgotPassword,
                              child: const Text(
                                'Forgot Password?',
                                style: TextStyle(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w500,
                                  color: AppColors.primary,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 24),
                        // Divider
                        Row(
                          children: const [
                            Expanded(child: Divider()),
                            Padding(
                              padding: EdgeInsets.symmetric(horizontal: 16),
                              child: Text('or', style: TextStyle(color: AppColors.mutedForeground, fontSize: 13)),
                            ),
                            Expanded(child: Divider()),
                          ],
                        ),
                        const SizedBox(height: 24),
                        SocialButton(provider: 'google', onTap: widget.onSocialLogin),
                        const SizedBox(height: 12),
                        SocialButton(provider: 'apple', onTap: widget.onSocialLogin),
                        const SizedBox(height: 12),
                        SocialButton(provider: 'facebook', onTap: widget.onSocialLogin),
                      ],
                    ),
                  ),
                ),
                // Footer
                Padding(
                  padding: const EdgeInsets.all(24),
                  child: PrimaryButton(
                    label: 'Sign in',
                    disabled: _email.isEmpty || _password.isEmpty,
                    onTap: _handleSubmit,
                  ),
                ),
              ],
            ),
          ),
        ),
        LoadingModal(isOpen: _isLoading, message: 'Sign in...'),
      ],
    );
  }
}
