import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/form_input.dart';
import '../widgets/social_button.dart';
import '../widgets/primary_button.dart';
import '../widgets/loading_modal.dart';

class SignUpScreen extends StatefulWidget {
  final VoidCallback onBack;
  final VoidCallback onSignUp;
  final VoidCallback onSignIn;
  final VoidCallback onSocialLogin;

  const SignUpScreen({
    super.key,
    required this.onBack,
    required this.onSignUp,
    required this.onSignIn,
    required this.onSocialLogin,
  });

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  String _email = '';
  String _password = '';
  bool _agreedToTerms = false;
  bool _isLoading = false;

  void _handleSubmit() {
    if (_email.isEmpty || _password.isEmpty || !_agreedToTerms) return;
    setState(() => _isLoading = true);
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() => _isLoading = false);
        widget.onSignUp();
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
                      const Spacer(),
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
                        Row(
                          children: [
                            const Text(
                              'Join Smartify Today',
                              style: TextStyle(
                                fontSize: 28,
                                fontWeight: FontWeight.bold,
                                color: AppColors.foreground,
                              ),
                            ),
                            const SizedBox(width: 8),
                            Icon(Icons.person, size: 32, color: AppColors.primary),
                          ],
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Join Smartify, Your Gateway to Smart Living.',
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
                        const SizedBox(height: 20),
                        // Terms checkbox
                        GestureDetector(
                          onTap: () => setState(() => _agreedToTerms = !_agreedToTerms),
                          child: Row(
                            children: [
                              Container(
                                width: 24,
                                height: 24,
                                decoration: BoxDecoration(
                                  color: _agreedToTerms ? AppColors.primary : Colors.transparent,
                                  border: Border.all(
                                    color: AppColors.primary,
                                    width: 2,
                                  ),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: _agreedToTerms
                                    ? const Icon(Icons.check, size: 16, color: Colors.white)
                                    : null,
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Text.rich(
                                  TextSpan(
                                    children: [
                                      const TextSpan(
                                        text: 'I agree to Smartify ',
                                        style: TextStyle(fontSize: 13, color: AppColors.mutedForeground),
                                      ),
                                      TextSpan(
                                        text: 'Terms & Conditions',
                                        style: TextStyle(
                                          fontSize: 13,
                                          fontWeight: FontWeight.w500,
                                          color: AppColors.primary,
                                        ),
                                      ),
                                      const TextSpan(
                                        text: '.',
                                        style: TextStyle(fontSize: 13, color: AppColors.mutedForeground),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),
                        // Already have account
                        Center(
                          child: GestureDetector(
                            onTap: widget.onSignIn,
                            child: Text.rich(
                              TextSpan(
                                children: const [
                                  TextSpan(
                                    text: 'Already have an account? ',
                                    style: TextStyle(fontSize: 13, color: AppColors.mutedForeground),
                                  ),
                                  TextSpan(
                                    text: 'Sign in',
                                    style: TextStyle(
                                      fontSize: 13,
                                      fontWeight: FontWeight.w500,
                                      color: AppColors.primary,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
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
                      ],
                    ),
                  ),
                ),
                // Footer
                Padding(
                  padding: const EdgeInsets.all(24),
                  child: PrimaryButton(
                    label: 'Sign up',
                    disabled: _email.isEmpty || _password.isEmpty || !_agreedToTerms,
                    onTap: _handleSubmit,
                  ),
                ),
              ],
            ),
          ),
        ),
        LoadingModal(isOpen: _isLoading, message: 'Sign up...'),
      ],
    );
  }
}
