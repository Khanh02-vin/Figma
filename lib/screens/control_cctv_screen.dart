import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ControlCCTCScreen extends StatefulWidget {
  final VoidCallback onBack;

  const ControlCCTCScreen({super.key, required this.onBack});

  @override
  State<ControlCCTCScreen> createState() => _ControlCCTCScreenState();
}

class _ControlCCTCScreenState extends State<ControlCCTCScreen> {
  bool _isOn = true;
  bool _isPlaying = true;

  final _controls = [
    {'icon': Icons.play_arrow, 'label': 'Playback'},
    {'icon': Icons.camera_alt_outlined, 'label': 'Snapshot'},
    {'icon': Icons.mic_outlined, 'label': 'Speak'},
    {'icon': Icons.videocam_outlined, 'label': 'Record'},
    {'icon': Icons.photo_library_outlined, 'label': 'Gallery'},
    {'icon': Icons.lock_outlined, 'label': 'Private'},
    {'icon': Icons.nightlight_outlined, 'label': 'Night Mode'},
    {'icon': Icons.more_horiz, 'label': 'More'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(),
            _buildDeviceBar(),
            const SizedBox(height: 16),
            _buildLiveFeed(),
            const SizedBox(height: 16),
            _buildControlsGrid(),
            const Spacer(),
            _buildPlaybackControls(),
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
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: AppColors.muted.withValues(alpha: 0.5),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.videocam_outlined, color: AppColors.mutedForeground),
          ),
          const SizedBox(width: 12),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Smart V1 CCTV', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600)),
                Text('Living Room', style: TextStyle(fontSize: 12, color: AppColors.mutedForeground)),
              ],
            ),
          ),
          _ToggleSw(isOn: _isOn, onTap: () => setState(() => _isOn = !_isOn)),
        ],
      ),
    );
  }

  Widget _buildLiveFeed() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: AspectRatio(
        aspectRatio: 16 / 9,
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xFFFDE68A), Color(0xFFFEF3C7)],
            ),
          ),
          child: Stack(
            children: [
              // Live badge
              Positioned(
                top: 12,
                left: 12,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.black38,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      _LiveDot(),
                      SizedBox(width: 6),
                      Text('Live', style: TextStyle(fontSize: 12, color: Colors.white, fontWeight: FontWeight.w500)),
                    ],
                  ),
                ),
              ),
              // Top-right controls
              Positioned(
                top: 12,
                right: 12,
                child: Row(
                  children: [
                    _FeedBtn(label: 'HD'),
                    const SizedBox(width: 4),
                    _FeedBtn(icon: Icons.volume_up),
                    const SizedBox(width: 4),
                    _FeedBtn(icon: Icons.fullscreen),
                  ],
                ),
              ),
              // Placeholder
              const Center(
                child: Text('Live Feed Preview', style: TextStyle(color: AppColors.mutedForeground, fontSize: 13)),
              ),
            ],
          ),
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

  Widget _buildPlaybackControls() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          _CircleBtn(icon: Icons.chevron_left, onTap: () {}),
          const SizedBox(width: 20),
          GestureDetector(
            onTap: () => setState(() => _isPlaying = !_isPlaying),
            child: Container(
              width: 64,
              height: 64,
              decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
              child: Icon(_isPlaying ? Icons.pause : Icons.play_arrow, color: Colors.white, size: 28),
            ),
          ),
          const SizedBox(width: 20),
          _CircleBtn(icon: Icons.chevron_right, onTap: () {}),
        ],
      ),
    );
  }
}

class _LiveDot extends StatelessWidget {
  const _LiveDot();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 8,
      height: 8,
      decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle),
    );
  }
}

class _FeedBtn extends StatelessWidget {
  final IconData? icon;
  final String? label;
  const _FeedBtn({this.icon, this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(
        color: Colors.black38,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Center(
        child: label != null
            ? Text(label!, style: const TextStyle(fontSize: 11, color: Colors.white))
            : Icon(icon, size: 16, color: Colors.white),
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
        width: 48,
        height: 48,
        decoration: BoxDecoration(
          color: AppColors.muted.withValues(alpha: 0.5),
          shape: BoxShape.circle,
        ),
        child: Icon(icon, color: AppColors.mutedForeground, size: 24),
      ),
    );
  }
}
