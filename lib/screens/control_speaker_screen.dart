import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ControlSpeakerScreen extends StatefulWidget {
  final VoidCallback onBack;

  const ControlSpeakerScreen({super.key, required this.onBack});

  @override
  State<ControlSpeakerScreen> createState() => _ControlSpeakerScreenState();
}

class _ControlSpeakerScreenState extends State<ControlSpeakerScreen> {
  bool _isOn = true;
  bool _isPlaying = true;
  double _volume = 65;
  int _currentSecs = 168;
  final _totalSecs = 233;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (_isPlaying && _currentSecs < _totalSecs) {
        setState(() => _currentSecs++);
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  String _fmt(int secs) {
    final m = (secs ~/ 60).toString().padLeft(2, '0');
    final s = (secs % 60).toString().padLeft(2, '0');
    return '$m:$s';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            _Header(onBack: widget.onBack, title: 'Control Device'),
            // Device info
            _DeviceInfoBar(
              name: 'Stereo Speaker', room: 'Living Room', isOn: _isOn,
              onToggle: () => setState(() => _isOn = !_isOn),
            ),
            // Now playing
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 32,
                    height: 32,
                    decoration: const BoxDecoration(
                      color: Color(0xFF1DB954),
                      shape: BoxShape.circle,
                    ),
                    child: const Center(
                      child: Icon(Icons.music_note, size: 18, color: Colors.black),
                    ),
                  ),
                  const SizedBox(width: 8),
                  const Text(
                    'Ed Sheeran - Shape of You',
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
                  ),
                ],
              ),
            ),
            // Volume dial
            Expanded(
              child: Center(
                child: SizedBox(
                  width: 256,
                  height: 256,
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      CustomPaint(
                        size: const Size(256, 256),
                        painter: _VolumeArcPainter(volume: _volume / 100),
                      ),
                      Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '${_volume.round()}',
                                style: const TextStyle(
                                  fontSize: 56,
                                  fontWeight: FontWeight.w300,
                                ),
                              ),
                              const Padding(
                                padding: EdgeInsets.only(top: 8),
                                child: Text('%', style: TextStyle(fontSize: 20)),
                              ),
                            ],
                          ),
                          const Text('Volume', style: TextStyle(fontSize: 13, color: AppColors.mutedForeground)),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
            // Playback controls
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _CircleBtn(icon: Icons.skip_previous, onTap: () {}),
                const SizedBox(width: 20),
                GestureDetector(
                  onTap: () => setState(() => _isPlaying = !_isPlaying),
                  child: Container(
                    width: 64,
                    height: 64,
                    decoration: const BoxDecoration(
                      color: AppColors.primary,
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      _isPlaying ? Icons.pause : Icons.play_arrow,
                      color: Colors.white,
                      size: 28,
                    ),
                  ),
                ),
                const SizedBox(width: 20),
                _CircleBtn(icon: Icons.skip_next, onTap: () {}),
              ],
            ),
            const SizedBox(height: 24),
            // Progress bar
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                children: [
                  SliderTheme(
                    data: SliderTheme.of(context).copyWith(
                      trackHeight: 4,
                      thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 6),
                      overlayShape: const RoundSliderOverlayShape(overlayRadius: 14),
                      activeTrackColor: AppColors.primary,
                      inactiveTrackColor: AppColors.muted,
                      thumbColor: Colors.white,
                      overlayColor: AppColors.primary.withValues(alpha: 0.1),
                    ),
                    child: Slider(
                      value: _currentSecs / _totalSecs,
                      onChanged: (v) => setState(() => _currentSecs = (v * _totalSecs).round()),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(_fmt(_currentSecs), style: const TextStyle(fontSize: 12, color: AppColors.mutedForeground)),
                        Text(_fmt(_totalSecs), style: const TextStyle(fontSize: 12, color: AppColors.mutedForeground)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}

class _Header extends StatelessWidget {
  final VoidCallback onBack;
  final String title;
  const _Header({required this.onBack, required this.title});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          IconButton(onPressed: onBack, icon: const Icon(Icons.arrow_back, size: 24)),
          Expanded(child: Text(title, textAlign: TextAlign.center, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w600))),
          IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert, color: AppColors.mutedForeground)),
        ],
      ),
    );
  }
}

class _DeviceInfoBar extends StatelessWidget {
  final String name, room;
  final bool isOn;
  final VoidCallback onToggle;

  const _DeviceInfoBar({
    required this.name, required this.room,
    required this.isOn, required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.muted.withValues(alpha: 0.3),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Container(
            width: 40, height: 40,
            decoration: BoxDecoration(
              color: AppColors.muted.withValues(alpha: 0.5),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.speaker, color: AppColors.mutedForeground),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600)),
                Text(room, style: TextStyle(fontSize: 12, color: AppColors.mutedForeground)),
              ],
            ),
          ),
          _ToggleSw(isOn: isOn, onTap: onToggle),
        ],
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

class _CircleBtn extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;
  const _CircleBtn({required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 48, height: 48,
        decoration: BoxDecoration(
          color: AppColors.muted.withValues(alpha: 0.5),
          shape: BoxShape.circle,
        ),
        child: Icon(icon, color: AppColors.mutedForeground, size: 24),
      ),
    );
  }
}

class _VolumeArcPainter extends CustomPainter {
  final double volume;
  _VolumeArcPainter({required this.volume});

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2, cy = size.height / 2;
    final r = size.width * 0.42;
    const strokeW = 12.0;

    final bgPaint = Paint()
      ..color = AppColors.muted
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeW
      ..strokeCap = StrokeCap.round;

    canvas.drawArc(
      Rect.fromCircle(center: Offset(cx, cy), radius: r),
      math.pi * 0.75,
      math.pi * 1.5,
      false,
      bgPaint,
    );

    final fgPaint = Paint()
      ..color = AppColors.primary
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeW
      ..strokeCap = StrokeCap.round;

    canvas.drawArc(
      Rect.fromCircle(center: Offset(cx, cy), radius: r),
      math.pi * 0.75,
      math.pi * 1.5 * volume,
      false,
      fgPaint,
    );
  }

  @override
  bool shouldRepaint(covariant _VolumeArcPainter old) => old.volume != volume;
}
