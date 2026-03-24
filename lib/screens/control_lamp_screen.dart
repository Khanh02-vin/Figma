import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ControlLampScreen extends StatefulWidget {
  final VoidCallback onBack;

  const ControlLampScreen({super.key, required this.onBack});

  @override
  State<ControlLampScreen> createState() => _ControlLampScreenState();
}

class _ControlLampScreenState extends State<ControlLampScreen> {
  bool _isOn = true;
  int _mode = 0;
  double _brightness = 85;
  double _saturation = 64;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(),
            _buildDeviceBar(),
            _buildModeTabs(),
            const SizedBox(height: 24),
            Expanded(child: Center(child: _buildControlArea())),
            _buildSliders(),
            _buildScheduleButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          IconButton(
            onPressed: widget.onBack,
            icon: const Icon(Icons.arrow_back, size: 24),
          ),
          const Expanded(
            child: Text(
              'Control Device',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 17, fontWeight: FontWeight.w600),
            ),
          ),
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.more_vert, color: AppColors.mutedForeground),
          ),
        ],
      ),
    );
  }

  Widget _buildDeviceBar() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.muted.withValues(alpha: 0.3),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          SizedBox(
            width: 40,
            height: 40,
            child: CustomPaint(painter: _LampMiniPainter()),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Smart Lamp', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600)),
                Text('Living Room', style: TextStyle(fontSize: 12, color: AppColors.mutedForeground)),
              ],
            ),
          ),
          _ToggleSw(isOn: _isOn, onTap: () => setState(() => _isOn = !_isOn)),
        ],
      ),
    );
  }

  Widget _buildModeTabs() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Container(
        padding: const EdgeInsets.all(4),
        decoration: BoxDecoration(
          color: AppColors.muted.withValues(alpha: 0.3),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: ['White', 'Color', 'Scene'].asMap().entries.map((e) {
            return Expanded(
              child: GestureDetector(
                onTap: () => setState(() => _mode = e.key),
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  decoration: BoxDecoration(
                    color: _mode == e.key ? AppColors.primary : Colors.transparent,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    e.value,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                      color: _mode == e.key ? Colors.white : AppColors.mutedForeground,
                    ),
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildControlArea() {
    return SizedBox(
      width: 256,
      height: 256,
      child: _mode == 0
          ? CustomPaint(
              painter: _WhiteArcPainter(brightness: _brightness / 100),
              child: Center(child: SizedBox(width: 64, height: 64, child: CustomPaint(painter: _LampMiniPainter()))),
            )
          : _mode == 1
              ? CustomPaint(
                  painter: _ColorWheelPainter(),
                  child: Center(child: SizedBox(width: 64, height: 64, child: CustomPaint(painter: _LampMiniPainter()))),
                )
              : const Center(child: Text('Scene presets coming soon', style: TextStyle(color: AppColors.mutedForeground))),
    );
  }

  Widget _buildSliders() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        children: [
          _SliderRow(
            icon: Icons.wb_sunny_outlined,
            label: '${_brightness.round()}',
            value: _brightness / 100,
            onChanged: (v) => setState(() => _brightness = v * 100),
          ),
          if (_mode == 1)
            _SliderRow(
              icon: Icons.palette_outlined,
              label: '${_saturation.round()}',
              value: _saturation / 100,
              onChanged: (v) => setState(() => _saturation = v * 100),
            ),
        ],
      ),
    );
  }

  Widget _buildScheduleButton() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 16),
      child: SizedBox(
        width: double.infinity,
        child: ElevatedButton(
          onPressed: () {},
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary.withValues(alpha: 0.1),
            foregroundColor: AppColors.primary,
            elevation: 0,
            padding: const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          ),
          child: const Text('Schedule Automatic ON/OFF', style: TextStyle(fontWeight: FontWeight.w600)),
        ),
      ),
    );
  }
}

class _ToggleSw extends StatelessWidget {
  final bool isOn;
  final VoidCallback onTap;
  const _ToggleSw({required this.isOn, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 48,
        height: 28,
        padding: const EdgeInsets.all(2),
        decoration: BoxDecoration(
          color: isOn ? AppColors.primary : AppColors.muted,
          borderRadius: BorderRadius.circular(14),
        ),
        child: AnimatedAlign(
          alignment: isOn ? Alignment.centerRight : Alignment.centerLeft,
          duration: const Duration(milliseconds: 200),
          child: Container(
            width: 24,
            height: 24,
            decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
          ),
        ),
      ),
    );
  }
}

class _SliderRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final double value;
  final ValueChanged<double> onChanged;

  const _SliderRow({
    required this.icon,
    required this.label,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Icon(icon, size: 20, color: AppColors.mutedForeground),
          const SizedBox(width: 12),
          Expanded(
            child: SliderTheme(
              data: SliderTheme.of(context).copyWith(
                trackHeight: 6,
                thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 8),
                overlayShape: const RoundSliderOverlayShape(overlayRadius: 16),
                activeTrackColor: AppColors.primary,
                inactiveTrackColor: AppColors.muted,
                thumbColor: Colors.white,
                overlayColor: AppColors.primary.withValues(alpha: 0.1),
              ),
              child: Slider(value: value, onChanged: onChanged),
            ),
          ),
          SizedBox(
            width: 40,
            child: Text(label, textAlign: TextAlign.center, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500)),
          ),
        ],
      ),
    );
  }
}

class _LampMiniPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width, h = size.height;
    canvas.drawRect(Rect.fromLTWH(w * 0.35, h * 0.7, w * 0.3, h * 0.15), Paint()..color = const Color(0xFF9CA3AF));
    canvas.drawRect(Rect.fromLTWH(w * 0.3, h * 0.82, w * 0.4, h * 0.1), Paint()..color = const Color(0xFF9CA3AF));
    final p = Path()
      ..moveTo(w * 0.2, h * 0.2)
      ..quadraticBezierTo(w * 0.1, h * 0.5, w * 0.35, h * 0.7)
      ..lineTo(w * 0.65, h * 0.7)
      ..quadraticBezierTo(w * 0.9, h * 0.5, w * 0.8, h * 0.2)
      ..close();
    canvas.drawPath(p, Paint()..color = const Color(0xFFF3F4F6));
    canvas.drawPath(p, Paint()..color = const Color(0xFFE5E7EB)..style = PaintingStyle.stroke..strokeWidth = 1.5);
    canvas.drawOval(Rect.fromLTWH(w * 0.2, h * 0.12, w * 0.6, h * 0.12), Paint()..color = const Color(0xFFE5E7EB));
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _WhiteArcPainter extends CustomPainter {
  final double brightness;
  _WhiteArcPainter({required this.brightness});

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2, cy = size.height / 2;
    final r = size.width * 0.42;
    final arcPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 16
      ..strokeCap = StrokeCap.round;

    arcPaint.color = AppColors.muted;
    canvas.drawArc(Rect.fromCircle(center: Offset(cx, cy), radius: r), math.pi * 0.8, math.pi * 1.4, false, arcPaint);

    arcPaint.shader = const LinearGradient(colors: [Color(0xFFFCD34D), Color(0xFFC7D2FE)])
        .createShader(Rect.fromCircle(center: Offset(cx, cy), radius: r));
    canvas.drawArc(Rect.fromCircle(center: Offset(cx, cy), radius: r), math.pi * 0.8, math.pi * 1.4 * brightness, false, arcPaint);
  }

  @override
  bool shouldRepaint(covariant _WhiteArcPainter old) => old.brightness != brightness;
}

class _ColorWheelPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2, cy = size.height / 2;
    final outerR = size.width * 0.42;
    final innerR = outerR * 0.6;
    final colors = [Colors.red, Colors.orange, Colors.yellow, Colors.green, Colors.cyan, Colors.blue, Colors.purple, Colors.pink, Colors.red];

    for (var i = 0; i < 360; i++) {
      final angle = i * math.pi / 180;
      canvas.drawLine(
        Offset(cx + innerR * math.cos(angle), cy + innerR * math.sin(angle)),
        Offset(cx + outerR * math.cos(angle), cy + outerR * math.sin(angle)),
        Paint()
          ..color = colors[(i / 45).floor() % colors.length]
          ..style = PaintingStyle.stroke
          ..strokeWidth = (outerR - innerR) * 0.8,
      );
    }
    canvas.drawCircle(Offset(cx, cy), innerR * 0.85, Paint()..color = Colors.white);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
