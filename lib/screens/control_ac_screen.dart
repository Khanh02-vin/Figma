import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ControlACScreen extends StatefulWidget {
  final VoidCallback onBack;

  const ControlACScreen({super.key, required this.onBack});

  @override
  State<ControlACScreen> createState() => _ControlACScreenState();
}

class _ControlACScreenState extends State<ControlACScreen> {
  bool _isOn = true;
  int _modeIdx = 0;
  int _temp = 20;
  final _minTemp = 16, _maxTemp = 30;

  final _modes = ['Cooling', 'Heating', 'Purifying'];
  final _controls = [
    {'icon': Icons.settings_outlined, 'label': 'Mode'},
    {'icon': Icons.air, 'label': 'Wind Speed'},
    {'icon': Icons.swap_vert, 'label': 'Direction'},
    {'icon': Icons.precision_manufacturing_outlined, 'label': 'Precision'},
    {'icon': Icons.eco_outlined, 'label': 'Eco'},
    {'icon': Icons.nightlight_outlined, 'label': 'Sleep'},
    {'icon': Icons.timer_outlined, 'label': 'Timer'},
    {'icon': Icons.more_horiz, 'label': 'More'},
  ];

  @override
  Widget build(BuildContext context) {
    final progress = (_temp - _minTemp) / (_maxTemp - _minTemp);
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(),
            _buildDeviceBar(),
            _buildModeTabs(),
            Expanded(child: _buildTempDial(progress)),
            _buildControlsGrid(),
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
          IconButton(onPressed: widget.onBack, icon: const Icon(Icons.arrow_back, size: 24)),
          const Expanded(child: Text('Control Device', textAlign: TextAlign.center, style: TextStyle(fontSize: 17, fontWeight: FontWeight.w600))),
          IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert, color: AppColors.mutedForeground)),
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
            height: 28,
            child: CustomPaint(painter: _ACMiniPainter()),
          ),
          const SizedBox(width: 12),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Air Conditioner', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600)),
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
          children: _modes.asMap().entries.map((e) {
            return Expanded(
              child: GestureDetector(
                onTap: () => setState(() => _modeIdx = e.key),
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  decoration: BoxDecoration(
                    color: _modeIdx == e.key ? AppColors.primary : Colors.transparent,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(e.value,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                        color: _modeIdx == e.key ? Colors.white : AppColors.mutedForeground,
                      )),
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildTempDial(double progress) {
    return Center(
      child: SizedBox(
        width: 256,
        height: 256,
        child: Stack(
          alignment: Alignment.center,
          children: [
            CustomPaint(size: const Size(256, 256), painter: _TempArcPainter(progress: progress)),
            Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('$_temp', style: const TextStyle(fontSize: 56, fontWeight: FontWeight.w300)),
                    const Padding(padding: EdgeInsets.only(top: 8), child: Text('°C', style: TextStyle(fontSize: 20))),
                  ],
                ),
                const Text('Temperature', style: TextStyle(fontSize: 13, color: AppColors.mutedForeground)),
              ],
            ),
            Positioned(
              left: 0,
              top: 112,
              child: IconButton(
                onPressed: () => setState(() => _temp = math.max(_minTemp, _temp - 1)),
                icon: const Icon(Icons.remove, color: AppColors.mutedForeground, size: 28),
              ),
            ),
            Positioned(
              right: 0,
              top: 112,
              child: IconButton(
                onPressed: () => setState(() => _temp = math.min(_maxTemp, _temp + 1)),
                icon: const Icon(Icons.add, color: AppColors.mutedForeground, size: 28),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildControlsGrid() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 4,
          mainAxisSpacing: 4,
          crossAxisSpacing: 4,
        ),
        itemCount: _controls.length,
        itemBuilder: (ctx, i) {
          final ctrl = _controls[i];
          return GestureDetector(
            onTap: () {},
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(ctrl['icon'] as IconData, size: 24, color: AppColors.mutedForeground),
                const SizedBox(height: 4),
                Text(ctrl['label'] as String,
                    style: const TextStyle(fontSize: 10, color: AppColors.mutedForeground),
                    textAlign: TextAlign.center),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildScheduleButton() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
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
          child: const Text('Schedule Automatic ON/OFF & Smart Scene',
              style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
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
        width: 48, height: 28,
        padding: const EdgeInsets.all(2),
        decoration: BoxDecoration(
          color: isOn ? AppColors.primary : AppColors.muted,
          borderRadius: BorderRadius.circular(14),
        ),
        child: AnimatedAlign(
          alignment: isOn ? Alignment.centerRight : Alignment.centerLeft,
          duration: const Duration(milliseconds: 200),
          child: Container(
            width: 24, height: 24,
            decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
          ),
        ),
      ),
    );
  }
}

class _ACMiniPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final rrect = RRect.fromRectAndRadius(
      Rect.fromLTWH(4, 6, size.width - 8, size.height - 12),
      const Radius.circular(4),
    );
    canvas.drawRRect(rrect, Paint()..color = const Color(0xFFF3F4F6));
    final vent = Paint()..color = const Color(0xFFD1D5DB)..strokeWidth = 1;
    for (var i = 0; i < 3; i++) {
      canvas.drawLine(Offset(8, 14 + i * 4), Offset(size.width - 8, 14 + i * 4), vent);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _TempArcPainter extends CustomPainter {
  final double progress;
  _TempArcPainter({required this.progress});

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2, cy = size.height / 2;
    final r = size.width * 0.42;
    const strokeW = 12.0;

    final bg = Paint()
      ..color = AppColors.muted
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeW
      ..strokeCap = StrokeCap.round;

    canvas.drawArc(Rect.fromCircle(center: Offset(cx, cy), radius: r), math.pi * 0.75, math.pi * 1.5, false, bg);

    final fg = Paint()
      ..color = AppColors.primary
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeW
      ..strokeCap = StrokeCap.round;

    canvas.drawArc(Rect.fromCircle(center: Offset(cx, cy), radius: r), math.pi * 0.75, math.pi * 1.5 * progress, false, fg);
  }

  @override
  bool shouldRepaint(covariant _TempArcPainter old) => old.progress != progress;
}
