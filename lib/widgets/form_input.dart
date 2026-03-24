import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class FormInput extends StatefulWidget {
  final String? label;
  final String? hint;
  final String value;
  final ValueChanged<String> onChanged;
  final bool isPassword;
  final bool showClear;
  final VoidCallback? onClear;
  final TextInputType? keyboardType;
  final IconData icon;

  const FormInput({
    super.key,
    this.label,
    this.hint,
    required this.value,
    required this.onChanged,
    this.isPassword = false,
    this.showClear = false,
    this.onClear,
    this.keyboardType,
    this.icon = Icons.email_outlined,
  });

  @override
  State<FormInput> createState() => _FormInputState();
}

class _FormInputState extends State<FormInput> {
  late TextEditingController _controller;
  bool _obscure = true;
  final _focusNode = FocusNode();
  bool _isFocused = false;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.value);
    _focusNode.addListener(() {
      setState(() => _isFocused = _focusNode.hasFocus);
    });
  }

  @override
  void didUpdateWidget(FormInput oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.value != _controller.text) {
      _controller.text = widget.value;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.label != null) ...[
          Text(
            widget.label!,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: AppColors.foreground,
            ),
          ),
          const SizedBox(height: 8),
        ],
        AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          decoration: BoxDecoration(
            color: AppColors.input,
            borderRadius: BorderRadius.circular(20),
            border: _isFocused
                ? Border.all(color: AppColors.primary.withValues(alpha: 0.3), width: 2)
                : null,
          ),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          child: Row(
            children: [
              Icon(
                widget.icon,
                size: 22,
                color: AppColors.mutedForeground,
              ),
              const SizedBox(width: 12),
              Expanded(
                child: TextField(
                  controller: _controller,
                  focusNode: _focusNode,
                  onChanged: widget.onChanged,
                  obscureText: widget.isPassword && _obscure,
                  keyboardType: widget.keyboardType,
                  style: const TextStyle(fontSize: 15, color: AppColors.foreground),
                  decoration: InputDecoration(
                    hintText: widget.hint ?? widget.label,
                    hintStyle: const TextStyle(color: AppColors.mutedForeground),
                    border: InputBorder.none,
                    isDense: true,
                    contentPadding: const EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
              ),
              if (widget.isPassword)
                GestureDetector(
                  onTap: () => setState(() => _obscure = !_obscure),
                  child: Icon(
                    _obscure ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                    size: 22,
                    color: AppColors.mutedForeground,
                  ),
                ),
              if (widget.showClear && widget.value.isNotEmpty)
                GestureDetector(
                  onTap: widget.onClear,
                  child: const Icon(
                    Icons.close,
                    size: 22,
                    color: AppColors.mutedForeground,
                  ),
                ),
            ],
          ),
        ),
      ],
    );
  }
}
